import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, X, Save, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const iconOptions = ["Building2", "Palette", "Hammer", "ChefHat", "TreeDeciduous", "Castle", "Home", "Paintbrush", "Ruler"];

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "Building2", features: "", image: "", long_description: "" });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at");
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "Error", description: "File must be under 10MB", variant: "destructive" });
      return null;
    }
    const ext = file.name.split(".").pop();
    const path = `services/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    return supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setForm(prev => ({ ...prev, image: url }));
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" });
      return;
    }
    const featuresArr = form.features.split(",").map((f) => f.trim()).filter(Boolean);

    const payload: any = {
      title: form.title, description: form.description, icon: form.icon, features: featuresArr, image: form.image || null, long_description: form.long_description || null,
    };

    if (editing) {
      const { error } = await supabase.from("services").update(payload).eq("id", editing);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Service updated successfully" });
    } else {
      const { error } = await supabase.from("services").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Created", description: "Service created successfully" });
    }

    setEditing(null);
    setShowForm(false);
    setForm({ title: "", description: "", icon: "Building2", features: "", image: "", long_description: "" });
    fetchServices();
  };

  const handleEdit = (service: Service) => {
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: (service.features ?? []).join(", "),
      image: (service as any).image ?? "",
      long_description: (service as any).long_description ?? "",
    });
    setEditing(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted", description: "Service deleted" });
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">Manage Services</h1>
        <Button variant="gold" onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", description: "", icon: "Building2", features: "", image: "", long_description: "" }); }}>
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editing ? "Edit Service" : "Add New Service"}
              <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); setEditing(null); }}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Service Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Icon</label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.icon === icon ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Image */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Service Image (optional)</label>
              {form.image && (
                <div className="mb-2 relative inline-block group">
                  <img src={form.image} alt="Service preview" className="w-40 h-28 object-cover rounded-lg border border-border" />
                  <button type="button" onClick={() => setForm({ ...form, image: "" })}
                    className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ×
                  </button>
                </div>
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-card cursor-pointer hover:bg-muted transition-colors text-sm">
                <ImagePlus className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>

            <Input placeholder="Features (comma separated)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Learn More Details (optional)</label>
              <textarea
                placeholder="Detailed description shown when user clicks 'Learn More'"
                value={form.long_description}
                onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button variant="gold" onClick={handleSave}>
              <Save className="w-4 h-4" /> {editing ? "Update" : "Create"}
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {service.image && (
                    <div className="relative group/img">
                      <img src={service.image} alt={service.title} className="w-16 h-12 object-cover rounded-lg border border-border" />
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (!confirm("Remove image from this service?")) return;
                          const { error } = await supabase.from("services").update({ image: null }).eq("id", service.id);
                          if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
                          toast({ title: "Image removed" });
                          fetchServices();
                        }}
                        className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover/img:opacity-100 transition-opacity"
                      >×</button>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                    <div className="flex gap-1 mt-1">
                      {(service.features ?? []).map((f, i) => (
                        <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
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

export default AdminServices;
