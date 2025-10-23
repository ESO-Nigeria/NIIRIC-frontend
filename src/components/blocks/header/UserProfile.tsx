import {
	Bolt,
	ExternalLink,
	Filter,
	LogIn,
	LogOut,
	Rocket,
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
			<DropdownMenuTrigger className="flex items-center gap-3">
				<Avatar>
          <AvatarImage src={profile?.profile_pic} alt={profile?.first_name} />
					<AvatarFallback className="bg-primary  text-primary-foreground">
						{user?.first_name?.[0]}
						{user?.last_name?.[0]}
					</AvatarFallback>
				</Avatar>
				<div className="text-start flex flex-col">
					{/* <p className="text-sm font-medium">My Workspace</p> */}
					<p className="text-sm font-medium capitalize">{user?.first_name} {user?.last_name}</p>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 w-72">
				{/* <DropdownMenuItem className="flex-col items-start">
          <div className="flex items-center gap-1">
            <Rocket className="mr-1 h-[18px] w-[18px]" />
            <span className="font-medium leading-none">Upgrade</span>
          </div>
          <p className="text-muted-foreground">
            You&apos;re on a free version of Slack.
          </p>
        </DropdownMenuItem> */}
				{/* <DropdownMenuSeparator /> */}
				<DropdownMenuItem asChild>
					<Link href="/dashboard">
						<UserIcon className="mr-1" /> Dashboard
					</Link>
				</DropdownMenuItem>
				{/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings2 className="mr-1" /> Preferences
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Filter className="mr-1" />
            Filter sidebar
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Activity</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem checked>
                  All activity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Unread messaged only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Mentions only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Customize by section
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>People</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem checked>
                  Everyone
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Without external people
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Including external people
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Bolt className="mr-1" />
            Tools & settings
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-52">
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuItem>Customize workspace</DropdownMenuItem>
            <DropdownMenuItem>Workspace builder</DropdownMenuItem>
            <DropdownMenuItem>
              Workspace analytics <ExternalLink className="ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Administration</DropdownMenuLabel>
            <DropdownMenuItem>Manage apps</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogIn className="mr-1" /> Sign in on mobile
        </DropdownMenuItem> */}
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-1" /> Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
