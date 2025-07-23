import { useState } from "react";
import { 
  BarChart3, 
  Brain, 
  Shield, 
  Settings, 
  Home, 
  Users, 
  Bell,
  ChevronLeft,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Business Foundry", url: "/foundry", icon: BarChart3 },
  { title: "AI Workspace", url: "/ai", icon: Brain },
  { title: "IP Fortress", url: "/ip", icon: Shield },
  { title: "Admin Panel", url: "/admin", icon: Settings },
  { title: "Users", url: "/users", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (active: boolean) =>
    `group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? "bg-gradient-primary text-primary-foreground shadow-glow"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} glass border-r border-glass-border/30`}>
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Kodaxa</h1>
                <p className="text-xs text-muted-foreground">Orchestrator</p>
              </div>
            </div>
          )}
          <SidebarTrigger className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors" />
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClasses(active)}>
                        <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} transition-transform group-hover:scale-110`} />
                        {!collapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                        {active && !collapsed && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground"></div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Actions */}
        <div className="mt-auto pt-4 border-t border-glass-border/20">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/notifications" className={getNavClasses(isActive("/notifications"))}>
                      <Bell className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>Notifications</span>}
                      {!collapsed && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/profile" className={getNavClasses(isActive("/profile"))}>
                      <Settings className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>Profile</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}