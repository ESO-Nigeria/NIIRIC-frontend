import { useEffect, useRef, useCallback } from "react";
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
}

export const useSocket = ({
  url,
  userId,
  onConnect,
  onDisconnect,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
  path = '/socket.io'
}: UseSocketOptions) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const send = useCallback((event: string, data: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data);
      return true;
    }
    console.warn("⚠️ Socket.IO is not connected");
    return false;
  }, []);

  useEffect(() => {
    console.log('🔌 Initializing socket connection to:', url);
    
    const socket = io(url, {
      path: path,
      transports: ["websocket", "polling"], // Allow fallback
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: reconnectInterval,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket.IO connected:", socket.id);
      dispatch(setConnectionStatus(true));
      reconnectAttemptsRef.current = 0;
      onConnect?.();
    });

    socket.on("disconnect", (reason) => {
      console.log("⚠️ Socket.IO disconnected:", reason);
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
    };
  }, [url, path, maxReconnectAttempts, reconnectInterval, dispatch, onConnect, onDisconnect]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
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
    isConnected: socketRef.current?.connected ?? false,
    socket: socketRef.current,
  };
};