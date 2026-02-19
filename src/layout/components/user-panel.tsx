import { toAbsoluteUrl } from '@/lib/helpers';
import { Moon, Sun, Laptop, LogOut, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/dropdown-menu';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage, } from '@/components/avatar';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-context';

type Account = {
  name: string;
  email: string;
  avatar?: string;
  avatarFallback?: string;
  avatarFallbackClassName?: string;
};

const accounts: Account[] = [
  {
    name: 'Support',
    email: 'support@reui.io',
    avatar: toAbsoluteUrl('/media/avatars/300-2.png'),
    avatarFallback: 'S',
  },
  {
    name: 'Finance',
    email: 'finance@reui.io',
    avatarFallback: 'F',
    avatarFallbackClassName: 'bg-green-500 text-white',
  },
  {
    name: 'HR',
    email: 'hr@reui.io',
    avatarFallback: 'H',
    avatarFallbackClassName: 'bg-yellow-500 text-white',
  },
];

function getInitials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'U';

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function UserPanel() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const userDisplayName = user?.fullName || user?.username || 'User';
  const userEmail = user?.email || '';
  const userInitials = getInitials(userDisplayName);

  return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(
				'grow cursor-pointer justify-between flex items-center gap-2.5 lg:mx-2.5 lg:px-2 py-1 rounded-md ring-none outline-none',
				'hover:bg-background data-[state=open]:bg-background',
				'in-data-[sidebar-collapsed=true]:hover:bg-transparent in-data-[sidebar-collapsed=true]:data-[state=open]:bg-transparent',				
			)}>
				<div className="flex items-center gap-1.5">
					<Avatar className="size-8 border border-background rounded-full overflow-hidden">
						<AvatarImage src={toAbsoluteUrl('/media/avatars/300-2.png')} alt={userDisplayName}/>
						<AvatarFallback className="rounded-md">{userInitials}</AvatarFallback>
					</Avatar>
					<div className="hidden md:flex flex-col items-start gap-0.25 md:in-data-[sidebar-collapsed=true]:hidden">
						<span className="text-sm font-medium text-foreground leading-none">{userDisplayName}</span>
						<span className="text-xs text-muted-foreground font-normal leading-none">{userEmail}</span>
					</div>
				</div> 
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="!w-56 lg:w-(--radix-dropdown-menu-trigger-width)">
				<DropdownMenuGroup>  
					<DropdownMenuLabel>Accounts</DropdownMenuLabel>
					{accounts.map((account, index) => (
						<DropdownMenuItem key={index}>
							<Avatar className="size-7">
								{account.avatar && <AvatarImage src={account.avatar} alt="@reui"/>} 
								{account.avatarFallback && <AvatarFallback className={cn('text-xs', account.avatarFallbackClassName)}>{account.avatarFallback}</AvatarFallback>}
							</Avatar>
							<div className="flex flex-col items-start gap-0.5">
								<span className="text-sm font-medium text-foreground leading-none">{account.name}</span>
								<span className="text-xs text-muted-foreground font-normal leading-none">{account.email}</span>
							</div>
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem className="ps-3.5">
						<Plus />
						<span className="ps-1.5">Add Account</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="ps-3.5"
						onSelect={(event) => {
							event.preventDefault();
							void logout();
						}}
					>
						<LogOut />
						<span className="ps-1.5">Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>  
				<DropdownMenuSeparator />

				<DropdownMenuSub>
					<DropdownMenuSubTrigger className="ps-3.5">
						{resolvedTheme === 'light' ? <Sun /> : <Moon />}
						<span className="ps-1.5">
							{resolvedTheme === 'light' ? 'Light' : 'Dark'} Mode
						</span>
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup
							className="w-36"
							value={theme ?? 'system'}
							onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
						>
							<DropdownMenuRadioItem value="system">
								<Laptop className="mr-2 h-4 w-4" />
								<span>System</span>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="light">
								<Sun className="mr-2 h-4 w-4" />
								<span>Light</span>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">
								<Moon className="mr-2 h-4 w-4" />
								<span>Dark</span>
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				<DropdownMenuSeparator />
				
				<div className="px-2 py-1 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
					<Link className="cursor-pointer hover:text-primary" to="/static/privacy">Privacy</Link>
					<span className="rounded-full size-0.5 bg-muted-foreground/60"></span>
					<Link className="cursor-pointer hover:text-primary" to="/static/terms">Terms</Link>
				</div>                
			</DropdownMenuContent>
		</DropdownMenu>
  );
}
  
