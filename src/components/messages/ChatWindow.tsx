import { Card, CardHeader, CardContent } from "@/components/ui/card";
import FindResearchers from "@/components/messages/FindResearchers";
import MessageInput from "./MessageInput";
import { getRelativeTime } from "./ConversationList";

export default function ChatWindow({
  selectedUser,
  setSelectedUser,
  conversationView,
  setConversationView,
  messages,
  setMessages,
  conversations,
  setConversations,
}: any) {
  const activeMessages = selectedUser ? messages[selectedUser.id] || [] : [];

  return (
    <div className="flex-[1.5]">
      <Card className="border-none h-fit w-full">
        <CardHeader>
          {!conversationView ? (
            <>
              <h2 className="text-xl font-normal font-poppins mb-3">
                Send Message
              </h2>
              <FindResearchers
                onSelect={(user) => {
                    setSelectedUser(user);
                }}
                selectedUser={selectedUser}
                />

            </>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={selectedUser?.avatar || "/default-avatar.png"}
                alt={selectedUser?.name}
                className="w-10 h-10 rounded-full object-cover border border-[#039855]"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  {selectedUser?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedUser?.university || "Researcher"}
                </p>
              </div>
            </div>
          )}
        </CardHeader>

        {/* Chat Display */}
        <CardContent className="px-6 py-4 min-h-[100px] max-h-[400px] overflow-y-auto flex flex-col gap-3">
          {!conversationView ? (
            <div className="text-gray-400 text-center py-20">
              Select a user and start a conversation
            </div>
          ) : activeMessages.length === 0 ? (
            <div className="text-gray-400 text-center py-20">
              No messages yet. Say hello 👋
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {activeMessages.map((msg: any, idx: number) => {
                const isSelf = msg.fromSelf;
                const senderName = isSelf ? "You" : selectedUser?.name;
                const avatar = isSelf
                  ? "/default-avatar.png" // replace with your profile image
                  : selectedUser?.avatar || "/default-avatar.png";

                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-2 mb-1">
                      {!isSelf && (
                        <img
                          src={avatar}
                          alt={senderName}
                          className="w-[48px] h-[48px] rounded-full object-cover border border-gray-300"
                        />
                      )}
                      <span className="text-[14px] font-semibold font-medium text-gray-600 ">
                        {senderName}
                      </span>
                      {isSelf && (
                        <img
                          src="https://i.pravatar.cc/40?img=3"
                          alt={senderName}
                          className="w-[48px] h-[48px] rounded-full object-cover border border-gray-300"
                        />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-[10px] text-sm break-words max-w-[70%] ${
                        isSelf
                          ? "bg-gray-100 text-base-800 rounded-tr-none"
                          : "bg-gray-50  rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Timestamp */}
                    <span
                      className={`text-[11px] text-gray-400 mt-1 ${
                        isSelf ? "text-right" : "text-left"
                      }`}
                    >
                      {getRelativeTime(msg.timestamp)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>



        {/* Message Input */}
        <MessageInput
            selectedUser={selectedUser}
            messages={messages}
            setMessages={setMessages}
            setConversations={setConversations}
            conversations={conversations}
            setConversationView={setConversationView}
        />
      </Card>
    </div>
  );
}
