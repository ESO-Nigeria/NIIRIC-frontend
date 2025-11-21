import { useRef, useCallback, useEffect, useState } from 'react';

interface WebSocketConfig {
    url: string;
    token: string;
    autoConnect?: boolean;
    reconnectAttempts?: number;
    reconnectDelay?: number;
    onOpen?: () => void;
    onMessage?: (data: any) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (error: Event) => void;
    path: string;
}

interface WebSocketHook {
    ws: WebSocket | null;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
    connect: () => void;
    disconnect: () => void;
    send: (data: any) => void;
    sendTyped: <T>(type: string, data: T) => void;
}

export const useWebSocket = (config: WebSocketConfig): WebSocketHook => {
    const {
        url,
        path,
        token,
        autoConnect = false,
        reconnectAttempts = 3,
        reconnectDelay = 1000,
        onOpen,
        onMessage,
        onClose,
        onError
    } = config;

    const wsRef = useRef<WebSocket | null>(null);
    // @ts-ignore
    const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
    const reconnectCountRef = useRef(0);

    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /** Save token to cookie */
    const saveTokenToCookie = useCallback(() => {
        if (!token) return;

        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=None; Secure`;
        console.log('🍪 Token saved to cookie');
    }, [token]);

    /** Check if cookie exists */
    const hasCookie = useCallback(() => {
        const cookies = document.cookie;
        return cookies.split(';').some(cookie => cookie.trim().startsWith('token='));
    }, []);

    /** Connect to WebSocket */
    const connect = useCallback(() => {
        // Prevent multiple connections
        if (wsRef.current?.readyState === WebSocket.OPEN ||
            wsRef.current?.readyState === WebSocket.CONNECTING) {
            console.warn('⚠️ WebSocket already connected or connecting');
            return;
        }

        setIsConnecting(true);
        setError(null);

        // Save token to cookie first
        if (token) {
            saveTokenToCookie();

            // Wait for cookie to be set
            if (!hasCookie()) {
                console.warn('⚠️ Cookie not set, waiting...');
                setTimeout(() => {
                    if (hasCookie()) {
                        connect();
                    } else {
                        setError('Failed to set authentication cookie');
                        setIsConnecting(false);
                    }
                }, 100);
                return;
            }
        }

        try {
            console.log('🔌 Connecting to:', url);
            const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_API_URL}${path}`, [token]);
            wsRef.current = ws;
            ws.onopen = () => {
                console.log('✅ WebSocket connected');
                setIsConnected(true);
                setIsConnecting(false);
                setError(null);
                reconnectCountRef.current = 0;
                onOpen?.();
            };

            ws.onmessage = (event) => {
                console.log('📨 Message received:', event.data);
                try {
                    const data = JSON.parse(event.data);
                    onMessage?.(data);
                } catch (err) {
                    // Handle non-JSON messages
                    onMessage?.(event.data);
                }
            };

            ws.onclose = (event) => {
                console.log('🔌 WebSocket closed:', event.code, event.reason);
                setIsConnected(false);
                setIsConnecting(false);
                wsRef.current = null;
                onClose?.(event);

                // Auto-reconnect for abnormal closures
                if (event.code !== 1000 && reconnectCountRef.current < reconnectAttempts) {
                    reconnectCountRef.current++;
                    const delay = reconnectDelay * reconnectCountRef.current;

                    console.log(`🔄 Reconnecting in ${delay}ms (${reconnectCountRef.current}/${reconnectAttempts})`);

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, delay);
                }
            };

            ws.onerror = (error) => {
                setError('WebSocket connection error');
                setIsConnecting(false);
                onError?.(error);
            };

        } catch (err) {
            console.error('❌ Failed to create WebSocket:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            setIsConnecting(false);
        }
    }, [url, token, reconnectAttempts, reconnectDelay, onOpen, onMessage, onClose, onError, saveTokenToCookie, hasCookie]);

    /** Disconnect from WebSocket */
    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        if (wsRef.current) {
            console.log('🔌 Disconnecting WebSocket');
            wsRef.current.close(1000, 'Client disconnect');
            wsRef.current = null;
        }

        setIsConnected(false);
        setIsConnecting(false);
        reconnectCountRef.current = 0;
    }, []);

    /** Send raw data */
    const send = useCallback((data: any) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error('❌ WebSocket not connected');
            setError('WebSocket not connected');
            return;
        }

        try {
            const message = typeof data === 'string' ? data : JSON.stringify(data);
            console.log('📤 Sending:', message);
            wsRef.current.send(message);
        } catch (err) {
            console.error('❌ Failed to send message:', err);
            setError('Failed to send message');
        }
    }, []);

    /** Send typed message with type field */
    const sendTyped = useCallback(<T,>(type: string, data: T) => {
        send({ type, data });
    }, [send]);

    /** Auto-connect on mount if enabled */
    useEffect(() => {
        if (autoConnect) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [autoConnect]); // Don't include connect/disconnect to avoid infinite loop

    return {
        ws: wsRef.current,
        isConnected,
        isConnecting,
        error,
        connect,
        disconnect,
        send,
        sendTyped
    };
};

