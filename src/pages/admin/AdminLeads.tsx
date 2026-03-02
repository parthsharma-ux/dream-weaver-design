import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, CheckCircle, Circle, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const toggleContacted = async (lead: Lead) => {
    const { error } = await supabase.from("leads").update({ contacted: !lead.contacted }).eq("id", lead.id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted", description: "Lead deleted" });
    fetchLeads();
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-foreground mb-6">Leads</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="text-muted-foreground">No leads yet.</p>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <Card key={lead.id} className={lead.contacted ? "opacity-60" : ""}>
              <CardContent className="flex items-start justify-between p-4 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{lead.name}</h3>
                    {lead.contacted && (
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Contacted</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="w-3 h-3" /> {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </a>
                    )}
                    {lead.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {lead.city}
                      </span>
                    )}
                  </div>
                  {lead.message && <p className="text-sm text-muted-foreground mt-2">{lead.message}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant={lead.contacted ? "outline" : "default"}
                    size="icon"
                    onClick={() => toggleContacted(lead)}
                    title={lead.contacted ? "Mark as not contacted" : "Mark as contacted"}
                  >
                    {lead.contacted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(lead.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
