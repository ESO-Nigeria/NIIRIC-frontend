import {
  Bell,
  ChevronDown,
  Files,
  LogOut,
  MessageSquare,
  Newspaper,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/components/types/profile";
import {
  useGetUserProfileQuery,
  useGetUserQualificationsQuery,
} from "@/store/features/auth/actions";
import clsx from "clsx";

interface UserProps {
  first_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
}

interface Props {
  user: UserProps;
  handleLogout: () => void;
  profile?: User;
}

export default function UserAvatarMenu({ user, handleLogout }: Props) {
  const { data: userProfile, isLoading: profileLoading } = useGetUserProfileQuery({});
  const {
    data: userQualifications,
    isLoading: qualificationsLoading,
  } = useGetUserQualificationsQuery({});

const checksLoading = profileLoading || qualificationsLoading;

  const hasProfile = Boolean(userProfile && (userProfile as any).id);

  // Normalize qualifications shape
  const qualificationsArray = Array.isArray((userQualifications as any)?.results)
    ? (userQualifications as any).results
    : Array.isArray(userQualifications)
      ? (userQualifications as any)
      : [];

  const hasQualifications = qualificationsArray.length > 0;

  const gatedDisabled = !checksLoading && (!hasProfile || !hasQualifications);
 
  const disabledClasses =
    "pointer-events-none opacity-50 text-muted-foreground cursor-not-allowed";

  // Wrapper to unify item rendering
  const renderItem = (
    {
      href,
      icon,
      label,
      gated,
    }: { href: string; icon: React.ReactNode; label: string; gated?: boolean },
  ) => {
    const isDisabled = gated ? gatedDisabled  : false;
		  // const isDisabled = gated && gatedDisabled;

    return (
      <DropdownMenuItem
        asChild
        disabled={isDisabled}
        // Tooltip via title attribute
        title={
          isDisabled
            ? "This action is unavailable until your profile and qualifications are available."
            : undefined
        }
        className={clsx(isDisabled && disabledClasses)}
      >
        <Link
          href={isDisabled ? "#" : href}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          className={clsx(
            "flex items-center",
            isDisabled && "select-none",
          )}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {icon} {label}
        </Link>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5">
        <Avatar>
          <AvatarImage src={user?.profile_pic} alt={user?.first_name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col">
          <p className="text-sm font-medium capitalize">
            {user?.first_name} {user?.last_name}
          </p>
        </div>
        <div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-72">
        {renderItem({
          href: "/dashboard",
          icon: <UserIcon className="mr-1 h-4 w-4" />,
          label: "Dashboard",
        })}
        {renderItem({
          href: "/dashboard/publications/timeline",
          icon: <Newspaper className="mr-1 h-4 w-4" />,
          label: "Timeline",
          gated: false,
        })}
        {renderItem({
          href: "/dashboard/publications",
          icon: <Files className="mr-1 h-4 w-4" />,
          label: "Publications",
          gated: true,
        })}
				{renderItem({
          href: "/dashboard/messages",
          icon: <MessageSquare className="mr-1 h-4 w-4" />,
          label: "Messages",
          gated: true,
        })}
        {/* {renderItem({
          href: "#",
          icon: <Bell className="mr-1 h-4 w-4" />,
          label: "Notifications",
					gated: true
          // Not gated
        })} */}
        {renderItem({
          href: "/dashboard/settings",
          icon: <Settings className="mr-1 h-4 w-4" />,
          label: "Settings",
          gated: true,
        })}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer focus:bg-destructive/10"
        >
          <LogOut className="mr-1 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}