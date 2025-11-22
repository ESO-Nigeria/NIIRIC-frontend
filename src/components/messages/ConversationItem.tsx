import { getRelativeTime } from "./ConversationList";
import { smartTimeAgo} from "@/helpers/helpers";
import {useGetMessageListQuery} from "@/store/features/messages/actions";
import {useGetPublisherProfileByIdQuery} from "@/store/features/auth/actions";
import Link from "next/link";

export default function ConversationItem({ conv, selectedUser, onSelect }: any) {

    const {data: profile, isLoading, refetch} = useGetPublisherProfileByIdQuery(conv?.other_profile_id)

    return (
    <Link
      href={`/dashboard/messages/${conv.other_user_id}/${conv?.other_profile_id}`}
      // onClick={onSelect}
      className={`flex items-center gap-3 p-4 cursor-pointer rounded-xl hover:bg-gray-50 ${
        selectedUser?.id?.toString() === conv.id?.toString() ? "bg-green-50" : ""
      }`}
    >
      <img
        src={profile?.profile_pic}
        alt={conv.name}
        className="w-10 h-10 rounded-full object-cover border border-[#039855]"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-800 truncate capitalize">{profile?.first_name} {profile?.last_name}</h4>
       <p dangerouslySetInnerHTML={{ __html: conv.last_message?.text ?? "" }} className="text-sm text-gray-500 line-clamp-2 overflow-hidden " />
      </div>
        <div className="flex flex-col justify-end items-end gap-y-2" >
            <p className="text-xs text-gray-400 whitespace-nowrap">
                {smartTimeAgo(conv?.last_message?.sent)}
            </p>
            {!conv?.last_message?.read && !conv?.last_message?.out && <span
                className="text-xs bg-primary-green text-white font-medium size-4 rounded-full flex items-center justify-center "> {conv?.unread_count} </span>}
        </div>

    </Link>
  );
}
