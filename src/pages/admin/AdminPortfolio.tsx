import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, X, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Project = Tables<"portfolio_projects">;

const categories = ["Construction", "Interior", "Kitchen", "Wooden Work", "Terrace", "Elevation"];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Construction", image: "" });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    const { data } = await supabase.from("portfolio_projects").select("*").order("created_at", { ascending: false });
    setProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "Image must be under 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(path);
    setForm({ ...form, image: urlData.publicUrl });
    setUploading(false);
    toast({ title: "Uploaded", description: "Image uploaded successfully" });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" });
      return;
    }

    if (editing) {
      const { error } = await supabase.from("portfolio_projects").update({
        title: form.title, description: form.description, category: form.category, image: form.image || null,
      }).eq("id", editing);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Project updated successfully" });
    } else {
      const { error } = await supabase.from("portfolio_projects").insert({
        title: form.title, description: form.description, category: form.category, image: form.image || null,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Created", description: "Project created successfully" });
    }

    setEditing(null);
    setShowForm(false);
    setForm({ title: "", description: "", category: "Construction", image: "" });
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image ?? "",
    });
    setEditing(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted", description: "Project deleted" });
    fetchProjects();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">Manage Portfolio</h1>
        <Button variant="gold" onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", description: "", category: "Construction", image: "" }); }}>
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editing ? "Edit Project" : "Add New Project"}
              <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); setEditing(null); }}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Image</label>
              {form.image && (
                <img src={form.image} alt="Preview" className="w-32 h-24 object-cover rounded-lg mb-2" />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-card cursor-pointer hover:bg-muted transition-colors text-sm">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center text-muted-foreground text-sm">No Image</div>
              )}
              <CardContent className="p-4">
                <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{project.category}</span>
                <h3 className="font-semibold text-foreground mt-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3 h-3" /> Delete
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

export default AdminPortfolio;
