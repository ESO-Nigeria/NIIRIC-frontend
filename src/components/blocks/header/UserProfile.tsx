import {
  Bell,
	Bolt,
	ChevronDown,
	ChevronsUpDown,
	ExternalLink,
	Files,
	Filter,
	LogIn,
	LogOut,
	Newspaper,
	Rocket,
	Settings,
	Settings2,
	User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/components/types/profile";

interface UserProps {
	first_name: string;
	last_name: string;
	email: string;
}

interface Props {
	user: UserProps;
	handleLogout: () => void;
  profile?: User
}

export default function UserAvatarMenu({ user, handleLogout, profile }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center gap-1.5">
				<Avatar>
          <AvatarImage src={profile?.profile_pic} alt={profile?.first_name} />
					<AvatarFallback className="bg-primary  text-primary-foreground">
						{user?.first_name?.[0]}
						{user?.last_name?.[0]}
					</AvatarFallback>
				</Avatar>
				<div className="text-start flex flex-col">
					<p className="text-sm font-medium capitalize">{user?.first_name} {user?.last_name}</p>
				</div>
        <div>
        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 w-72">
				<DropdownMenuItem asChild>
					<Link href="/dashboard">
						<UserIcon className="mr-1" /> Dashboard
					</Link>
				</DropdownMenuItem>
        <DropdownMenuItem asChild>
					<Link href="/dashboard/publications/time">
						<Newspaper className="mr-1" /> Timeline
					</Link>
				</DropdownMenuItem>
        <DropdownMenuItem asChild>
					<Link href="/dashboard/publications">
						<Files className="mr-1" /> Publications
					</Link>
				</DropdownMenuItem>
        <DropdownMenuItem asChild>
					<Link href="#">
						<Bell className="mr-1" /> Notifications
					</Link>
				</DropdownMenuItem>
        <DropdownMenuItem asChild>
					<Link href="#">
						<Settings className="mr-1" /> Settings
					</Link>
				</DropdownMenuItem>
		
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-1" /> Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
