import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage, setConnectionStatus, setError } from "@/store/features/messages/message.slice";

interface UseSocketOptions {
    url: string;
    userId?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
    path?: string;
    authTokenId?: string | null;
}

export const useSocketNew = ({
                              url,
                              userId,
                              onConnect,
                              onDisconnect,
                              path = "/socket.io",
                              authTokenId,
                          }: UseSocketOptions) => {

    const dispatch = useDispatch();
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    /** ---------------------------
     *  Send (connects only when needed)
     * ---------------------------- */
    const send = useCallback((event: string, data: any) => {
        const socket = socketRef.current;

        if (!socket) {
            console.warn("⚠️ Socket not initialized");
            return false;
        }

        // If socket is NOT connected → connect first
        if (!socket.connected) {
            console.log("🔌 Socket not connected… connecting now");

            socket.connect();

            // After connecting → send event
            socket.once("connect", () => {
                console.log("➡️ Connected. Sending event:", event);
                socket.emit(event, data);
            });

            return true;
        }

        // Already connected → send immediately
        socket.emit(event, data);
        return true;
    }, []);

    /** ---------------------------
     *  Initialize Socket
     * ---------------------------- */
    useEffect(() => {
        console.log("🔌 Creating socket instance:", url);

        const socket = io(url, {
            path,
            transports: ["websocket", "polling"],
            autoConnect: false, // ❗ Lazy connection
            auth: {
                token: authTokenId,
                userId,
            }
        });

        socketRef.current = socket;

        /** ────────────────────────────
         *   Events
         * ──────────────────────────── */

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
            setIsConnected(true);
            dispatch(setConnectionStatus(true));
            onConnect?.();
        });

        socket.on("disconnect", (reason) => {
            console.log("⚠️ Socket disconnected:", reason);
            setIsConnected(false);
            dispatch(setConnectionStatus(false));
            onDisconnect?.();
        });

        socket.on("connect_error", (err) => {
            console.error("🚨 Socket connection error:", err.message);
            dispatch(setError(`Socket.IO connection error: ${err.message}`));
        });

        socket.on("message", (data) => {
            console.log("💬 Incoming message:", data);
            dispatch(addMessage(data));
        });

        return () => {
            console.log("🧹 Cleaning up socket…");

            if (socketRef.current) {
                socketRef.current.removeAllListeners();
                socketRef.current.disconnect();
                socketRef.current = null;
            }

            setIsConnected(false);
        };
    }, [url, path, authTokenId, userId, dispatch, onConnect, onDisconnect]);

    /** ---------------------------
     *  Optional manual disconnect
     * ---------------------------- */
    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            setIsConnected(false);
        }
    }, []);

    /** ---------------------------
     *  Manual reconnect (rarely needed)
     * ---------------------------- */
    const reconnect = useCallback(() => {
        if (socketRef.current && !socketRef.current.connected) {
            socketRef.current.connect();
        }
    }, []);

    return {
        send,
        disconnect,
        reconnect,
        isConnected,
        socket: socketRef.current,
    };
};
