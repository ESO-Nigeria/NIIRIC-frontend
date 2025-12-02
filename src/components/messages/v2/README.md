# Refactored Messaging System (v2)

A modern, functional, and highly usable messaging interface built with Next.js, TypeScript, and WebSockets.

## 📁 File Structure

```
src/
├── app/dashboard/messages/v2/
│   ├── layout.tsx                    # Main layout with conversation list
│   ├── page.tsx                      # New conversation page
│   └── [conversationId]/[profileId]/
│       └── page.tsx                  # Individual conversation page
│
├── components/messages/v2/
│   ├── MessagesList.tsx              # Conversations sidebar with search
│   ├── ConversationView.tsx          # Message thread display
│   ├── MessageComposer.tsx           # Rich text message input
│   └── NewConversation.tsx           # Start new conversation UI
│
├── hooks/
│   └── useMessaging.ts               # Centralized messaging logic
│
└── components/ui/
    ├── alert.tsx                     # Alert component (newly added)
    └── ... (other UI components)
```

## 🚀 Features

### 1. **Centralized State Management** (`useMessaging` hook)

- Single source of truth for all messaging logic
- Manages WebSocket connection lifecycle
- Handles message sending, reading, and typing indicators
- Auto-refetches on WebSocket events
- Provides connection status and loading states

### 2. **Smart Conversations List** (`MessagesList`)

- **Real-time updates** via WebSocket
- **Search functionality** across conversations
- **Smart sorting**: Unread messages first, then by recency
- **Visual indicators**: Unread count badges, read/unread status
- **Optimized rendering**: Skeleton loaders for better UX
- **Profile integration**: Fetches and displays user profiles

### 3. **Enhanced Conversation View** (`ConversationView`)

- **Message grouping**: Avatars shown only once per sender group
- **Read receipts**: Blue double-check for read, gray single-check for sent
- **Timestamp display**: Smart relative time (e.g., "2 min ago")
- **Auto-scroll**: Smooth scroll to latest message
- **Typing indicators**: Animated "user is typing..." display
- **Empty states**: Friendly UI when no messages exist
- **Loading states**: Skeleton placeholders during data fetch

### 4. **Rich Message Composer** (`MessageComposer`)

- **Rich text editing** with RichTextEditor
- **Keyboard shortcuts**: Ctrl/Cmd + Enter to send
- **Visual feedback**: Focus states, disabled states
- **Loading indicators**: Shows when message is sending
- **Smart validation**: Disables send if message is empty
- **Typing notifications**: Notifies recipient when typing

### 5. **New Conversation UI** (`NewConversation`)

- **User search**: Real-time filtering of researchers
- **Profile display**: Avatar, name, bio
- **Quick actions**: Direct "Message" button
- **Empty states**: Helpful messaging when no users found

## 🔧 Technical Improvements

### Compared to Original Implementation

| Feature               | Original             | Refactored (v2)                    |
| --------------------- | -------------------- | ---------------------------------- |
| **Code Organization** | Mixed concerns       | Separated by responsibility        |
| **State Management**  | Props drilling       | Centralized hook                   |
| **WebSocket**         | Multiple connections | Single shared connection           |
| **Error Handling**    | Minimal              | Comprehensive with user feedback   |
| **Loading States**    | Basic                | Skeleton loaders + indicators      |
| **Type Safety**       | Partial              | Full TypeScript coverage           |
| **Performance**       | Re-renders           | Optimized with useMemo/useCallback |
| **UX**                | Functional           | Polished with animations           |
| **Search**            | None                 | Client-side filtering              |
| **Empty States**      | Missing              | Contextual empty states            |

## 🎨 UI/UX Enhancements

1. **Visual Hierarchy**
   - Clear separation between conversation list and chat
   - Color-coded elements (primary green for actions)
   - Proper spacing and typography

2. **Feedback Mechanisms**
   - Loading spinners for async operations
   - Success/error alerts
   - Read receipts
   - Typing indicators

3. **Responsive Design**
   - Adapts to mobile/tablet/desktop
   - Touch-friendly hit areas
   - Scrollable content areas

4. **Accessibility**
   - Proper semantic HTML
   - Keyboard navigation support
   - Screen reader friendly

## 📚 Usage

### Basic Usage

Navigate to `/dashboard/messages/v2` to access the new messaging system.

### Starting a New Conversation

1. Click "New Message" button
2. Search for a researcher
3. Click "Message" on their profile
4. Conversation opens automatically

### Viewing Conversations

1. Conversations list shows on the left
2. Click any conversation to open
3. Messages load automatically
4. Unread messages marked with badges

### Sending Messages

1. Type in the rich text editor
2. Press Ctrl+Enter or click Send
3. Message appears instantly
4. Read receipts update in real-time

## 🔌 WebSocket Events

The system listens to these WebSocket message types:

- **Type 3**: New message received
- **Type 4**: User started typing
- **Type 5**: User stopped typing
- **Type 6**: Message marked as read
- **Type 8**: New conversation created
- **Type 9**: Conversation updated

## 🛠 Customization

### Theming

Update colors in `tailwind.config` or directly in components:

- Primary action color: `primary-green`
- Text colors: `gray-900`, `gray-600`, `gray-400`
- Backgrounds: `gray-50`, `white`

### Message Bubble Styles

Edit in `ConversationView.tsx`:

```tsx
className={`px-4 py-2.5 rounded-2xl ${
  isSelf
    ? "bg-primary-green text-white"
    : "bg-gray-100 text-gray-900"
}`}
```

### Auto-scroll Behavior

Modify in `ConversationView.tsx`:

```tsx
messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
```

## 🐛 Troubleshooting

### WebSocket Connection Issues

- Check `useMessaging` hook for connection status
- Verify token is valid
- Check browser console for errors

### Messages Not Sending

- Ensure `isConnected` is true
- Check network tab for WebSocket frames
- Verify recipient ID is correct

### Profile Not Loading

- Check if `profileId` param exists
- Verify API endpoint is accessible
- Check Redux state for auth token

## 🚦 Performance Considerations

- **Memoization**: Uses `useMemo` and `useCallback` to prevent unnecessary re-renders
- **Lazy Loading**: Profiles fetched only when needed
- **Optimized Queries**: RTK Query caching reduces API calls
- **Virtual Scrolling**: Can be added for very long conversation lists

## 📊 Future Enhancements

- [ ] File attachments (images, documents)
- [ ] Voice messages
- [ ] Message reactions (emoji)
- [ ] Message editing/deletion
- [ ] Group conversations
- [ ] Message search within conversation
- [ ] Push notifications
- [ ] Offline support
- [ ] Message encryption
- [ ] Video/audio calls

## 🔐 Security

- All messages sent over secure WebSocket (wss://)
- Authentication required via JWT token
- Messages encrypted in transit
- User permissions enforced on backend

## 📝 Notes

- This is a v2 implementation living alongside the original
- Original routes: `/dashboard/messages/*`
- New routes: `/dashboard/messages/v2/*`
- Can gradually migrate users to v2
- Both systems share the same backend API

---

**Built with ❤️ using Next.js, TypeScript, and modern React patterns**
