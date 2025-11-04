// store/slices/messageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  status?: 'pending' | 'sent' | 'delivered' | 'read';
}

interface MessageState {
  allMessages: Message[];
  messageId: string;
  isConnected: boolean;
  error: string | null;
}

const initialState: MessageState = {
  allMessages: [],
  messageId: '',
  isConnected: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages: (state, action: PayloadAction<Message[]>) => {
      state.allMessages = action.payload;
    },
    setMessageId: (state, action: PayloadAction<string>) => {
      state.messageId = action.payload;
    },
    
    // WebSocket connection status
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    
    // Add message received via WebSocket
    addMessage: (state, action: PayloadAction<Message>) => {
      const exists = state.allMessages.find(m => m.id === action.payload.id);
      if (!exists) {
        state.allMessages.push(action.payload);
      }
    },
    
    // Add multiple messages (for initial load)
    addMessages: (state, action: PayloadAction<Message[]>) => {
      action.payload.forEach(message => {
        const exists = state.allMessages.find(m => m.id === message.id);
        if (!exists) {
          state.allMessages.push(message);
        }
      });
    },
    
    // Update message status (for read receipts, delivery confirmation, etc.)
    updateMessageStatus: (state, action: PayloadAction<{ id: string; status: Message['status'] }>) => {
      const message = state.allMessages.find(m => m.id === action.payload.id);
      if (message) {
        message.status = action.payload.status;
      }
    },
    
    // Clear all messages
    clearMessages: (state) => {
      state.allMessages = [];
    },
    
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAllMessages,
  setMessageId,
  setConnectionStatus,
  addMessage,
  addMessages,
  updateMessageStatus,
  clearMessages,
  setError,
} = messageSlice.actions;

export default messageSlice.reducer;