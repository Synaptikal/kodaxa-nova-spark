import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Building, ShoppingCart, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UserMenu: React.FC = () => {
  const { user, profile, signOut } = useAuth();

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    return user?.email || 'User';
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile?.avatar_url || undefined} alt="User" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">{getDisplayName()}</p>
            <p className="text-xs text-muted-foreground">
              {profile?.company_name || profile?.role || 'User'}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass border-glass-border/30">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            {profile?.company_name && (
              <p className="text-xs leading-none text-muted-foreground">
                {profile.company_name}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {profile?.company_name && (
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Company</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/add-ons" className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Marketplace</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/subscription" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Subscription</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
