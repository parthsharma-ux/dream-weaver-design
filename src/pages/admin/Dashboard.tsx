import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, FolderOpen, Users } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({ services: 0, portfolio: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [servicesRes, portfolioRes, leadsRes] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        services: servicesRes.count ?? 0,
        portfolio: portfolioRes.count ?? 0,
        leads: leadsRes.count ?? 0,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Services", value: stats.services, icon: Wrench, color: "text-blue-500" },
    { title: "Portfolio Projects", value: stats.portfolio, icon: FolderOpen, color: "text-green-500" },
    { title: "Total Leads", value: stats.leads, icon: Users, color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {loading ? "..." : card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
