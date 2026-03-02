import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminGuard } from "./AdminGuard";

export const AdminLayout = () => {
  return (
    <AdminGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 flex items-center border-b border-border px-4 bg-card">
              <SidebarTrigger className="mr-4" />
              <h2 className="font-serif font-semibold text-foreground">Bhagwati Builder Admin</h2>
            </header>
            <main className="flex-1 p-6 bg-background overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminGuard>
  );
};
