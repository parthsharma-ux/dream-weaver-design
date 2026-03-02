import { LayoutDashboard, Wrench, FolderOpen, Users, LogOut, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Services", url: "/admin/services", icon: Wrench },
  { title: "Portfolio", url: "/admin/portfolio", icon: FolderOpen },
  { title: "Leads", url: "/admin/leads", icon: Users },
];

export const AdminSidebar = () => {
  const { signOut } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-6 w-6 rounded" />
              {!collapsed && <span className="font-serif font-bold">Admin Panel</span>}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 space-y-1">
        <a href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
          <Home className="h-4 w-4" />
          {!collapsed && "View Website"}
        </a>
        <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
