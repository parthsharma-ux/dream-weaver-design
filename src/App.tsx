import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";

const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminPortfolio = lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Suspense fallback={<AdminFallback />}><AdminLayout /></Suspense>}>
            <Route index element={<Suspense fallback={<AdminFallback />}><Dashboard /></Suspense>} />
            <Route path="services" element={<Suspense fallback={<AdminFallback />}><AdminServices /></Suspense>} />
            <Route path="portfolio" element={<Suspense fallback={<AdminFallback />}><AdminPortfolio /></Suspense>} />
            <Route path="leads" element={<Suspense fallback={<AdminFallback />}><AdminLeads /></Suspense>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
