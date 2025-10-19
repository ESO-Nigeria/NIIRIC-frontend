import { getRelativeTime } from "./ConversationList";

export default function ConversationItem({ conv, selectedUser, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl hover:bg-gray-50 ${
        selectedUser?.id?.toString() === conv.id?.toString() ? "bg-green-50" : ""
      }`}
    >
      <img
        src={conv.avatar}
        alt={conv.name}
        className="w-10 h-10 rounded-full object-cover border border-[#039855]"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 truncate">{conv.name}</h4>
       <p className="text-sm text-gray-500 w-50 overflow-hidden whitespace-nowrap">
  {conv.lastMessage}
</p>

      </div>
      <p className="text-xs text-gray-400 whitespace-nowrap">
        {getRelativeTime(conv.timestamp)}
      </p>
    </div>
  );
}
