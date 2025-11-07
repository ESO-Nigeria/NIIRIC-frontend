// components/WebSocketProvider.tsx
'use client';

import { useEffect } from 'react';
import { useSocket } from '@/hooks/useWebSocket';
import { useDispatch } from 'react-redux';
import { messageApi } from '@/store/features/messages/message';
import { io } from "socket.io-client";


interface WebSocketProviderProps {
  children: React.ReactNode;
  userId?: string;
  enabled?: boolean;
}

export default function WebSocketProvider({ 
  children, 
  userId,
  enabled = true 
}: WebSocketProviderProps) {
  const dispatch = useDispatch();
  const { socket, isConnected, disconnect, reconnect  } = useSocket({
    url: "https://ws.postman-echo.com",
    path: "/handling", // adjust to your backend
    userId,
    onConnect: () => {
      console.log("✅ Global WebSocket connected");
    },
    onDisconnect: () => {
      console.log("❌ Global WebSocket disconnected");
    },
  });
  return <>{children}</>;
}

// export function useMessageWebSocket(userId?: string) {
//   const dispatch = useDispatch();

//   const { send, isConnected } = useSocket({
//     url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080',
//     userId,
//     onConnect: () => {
//       // Optionally fetch missed messages when reconnecting
//       // dispatch(messageApi.util.invalidateTags(['Messages']));
//       console.log('connected')
//     },
//   });

//   const sendTypingIndicator = (recipientId: string, isTyping: boolean) => {
//     send({
//       type: 'typing',
//       payload: {
//         recipientId,
//         isTyping,
//       },
//     });
//   };

//   const sendReadReceipt = (messageId: string) => {
//     send({
//       type: 'read_receipt',
//       payload: {
//         messageId,
//       },
//     });
//   };

//   return {
//     sendTypingIndicator,
//     sendReadReceipt,
//     isConnected,
//   };
// }