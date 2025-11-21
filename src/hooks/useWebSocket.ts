import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import { addMessage, setConnectionStatus, setError } from "@/store/features/messages/message.slice";

interface UseSocketOptions {
    url: string;
    userId?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    path?: string;
    authTokenId?: string | null | undefined;
}

export const useSocket = ({
      url,
      userId,
      onConnect,
      onDisconnect,
      reconnectInterval = 3000,
      maxReconnectAttempts = 5,
      path = '/socket.io',
      authTokenId
  }: UseSocketOptions) => {
const dispatch = useDispatch();
    const socketRef = useRef<Socket | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const [isConnected, setIsConnected] = useState(false); // Track connection state

    const send = useCallback((event: string, data: any) => {
        console.log(data, event, 'send', socketRef?.current?.connected);
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit(event, data);
            return true;
        }
        console.warn("⚠️ Socket.IO is not connected");
        return false;
    }, []);

    useEffect(() => {
        console.log('🔌 Initializing socket connection to:', url, 'Token:', authTokenId);

        const socket = io(url, {
            path: path,
            transports: ["websocket", "polling"],
            reconnectionAttempts: maxReconnectAttempts,
            reconnectionDelay: reconnectInterval,
            autoConnect: true,
            auth: {
                token: authTokenId,
            },
            // Alternative: add to query string instead
            // query: {
            //   token: authTokenId,
            //   userId: userId,
            // },

        });

        socket.on("connect", () => {
            console.log("✅ Socket.IO connected:", socket.id);
            setIsConnected(true); // Update local state
            dispatch(setConnectionStatus(true));
            reconnectAttemptsRef.current = 0;
            onConnect?.();
        });

        socket.on("disconnect", (reason) => {
            console.log("⚠️ Socket.IO disconnected:", reason);
            setIsConnected(false); // Update local state
            dispatch(setConnectionStatus(false));
            onDisconnect?.();
        });

        socket.on("connect_error", (err) => {
            console.error("🚨 Socket.IO connection error:", err.message);
            dispatch(setError(`Socket.IO connection error: ${err.message}`));
        });

        socket.on("message", (data) => {
            console.log("💬 Incoming message:", data);
            dispatch(addMessage(data));
        });

        socket.on("status_update", (status) => {
            console.log("📡 Status update:", status);
        });

        socketRef.current = socket;

        // Cleanup
        return () => {
            console.log('🧹 Cleaning up socket connection');
            socket.removeAllListeners();
            socket.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        };
    }, [url, path, maxReconnectAttempts, reconnectInterval, authTokenId, dispatch, onConnect, onDisconnect]); // Added authTokenId

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        }
    }, []);

    const reconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.connect();
        }
    }, []);

    return {
        send,
        disconnect,
        reconnect,
        isConnected, // Now returns reactive state
        socket: socketRef.current,
    };
};