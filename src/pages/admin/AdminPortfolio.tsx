import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, X, Save, Video, ImagePlus, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const categories = ["Construction", "Interior", "Kitchen", "Wooden Work", "Terrace", "Elevation"];
const statuses = [
  { value: "completed", label: "Completed", color: "bg-green-500/20 text-green-400" },
  { value: "ongoing", label: "Ongoing", color: "bg-blue-500/20 text-blue-400" },
  { value: "upcoming", label: "Upcoming", color: "bg-amber-500/20 text-amber-400" },
];

interface FormState {
  title: string;
  description: string;
  category: string;
  image: string;
  images: string[];
  video_url: string;
  status: string;
  service_id: string;
}

const emptyForm: FormState = {
  title: "", description: "", category: "Construction", image: "", images: [], video_url: "", status: "completed", service_id: "",
};

// Sortable project card component
const SortableProjectCard = ({ project, statusInfo, onEdit, onDelete }: {
  project: any;
  statusInfo: (s: string) => { value: string; label: string; color: string };
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };
  const si = statusInfo(project.status);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="overflow-hidden">
        <div className="flex">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center justify-center px-2 bg-muted/50 cursor-grab active:cursor-grabbing touch-none"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full sm:w-32 h-28 object-cover" />
              ) : (
                <div className="w-full sm:w-32 h-28 bg-muted flex items-center justify-center text-muted-foreground text-xs">No Image</div>
              )}
              <CardContent className="p-3 flex-1">
                <div className="flex gap-2 mb-1">
                  <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{project.category}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${si.color}`}>{si.label}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{project.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  {(project.images?.length || 0) > 0 && <span>{project.images.length} images</span>}
                  {project.video_url && <span>• video</span>}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}>
                    <Trash2 className="w-3 h-3" /> Delete
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const fetchData = async () => {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("portfolio_projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
      supabase.from("services").select("id, title").order("created_at"),
    ]);
    setProjects(p ?? []);
    setServices(s ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "Error", description: "File must be under 50MB", variant: "destructive" });
      return null;
    }
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    return supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl;
  };

  const handleMultiImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...urls],
      image: prev.image || urls[0] || "",
    }));
    setUploading(false);
    toast({ title: "Uploaded", description: `${urls.length} image(s) uploaded` });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) setForm(prev => ({ ...prev, video_url: url }));
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setForm(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages, image: newImages[0] || "" };
    });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" });
      return;
    }

    const basePayload = {
      title: form.title,
      description: form.description,
      category: form.category,
      image: form.image || form.images[0] || null,
      images: form.images,
      video_url: form.video_url || null,
      status: form.status,
      service_id: form.service_id || null,
    };

    const { error } = editing
      ? await supabase.from("portfolio_projects").update(basePayload).eq("id", editing)
      : await supabase.from("portfolio_projects").insert({ ...basePayload, sort_order: projects.length });

    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: editing ? "Updated" : "Created", description: `Project ${editing ? "updated" : "created"} successfully` });
    setEditing(null);
    setShowForm(false);
    setForm(emptyForm);
    fetchData();
  };

  const handleEdit = (project: any) => {
    setForm({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image ?? "",
      images: project.images ?? [],
      video_url: project.video_url ?? "",
      status: project.status ?? "completed",
      service_id: project.service_id ?? "",
    });
    setEditing(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted", description: "Project deleted" });
    fetchData();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);
    setProjects(reordered);

    // Persist new order
    const updates = reordered.map((p, i) => supabase.from("portfolio_projects").update({ sort_order: i }).eq("id", p.id));
    await Promise.all(updates);
    toast({ title: "Reordered", description: "Project order saved" });
  };

  const getStatusInfo = (s: string) => statuses.find(st => st.value === s) || statuses[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">Manage Portfolio</h1>
        <Button variant="gold" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}>
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

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button key={s.value} type="button" onClick={() => setForm({ ...form, status: s.value })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.status === s.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} type="button" onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Link to Service */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Link to Service (optional)</label>
              <select
                value={form.service_id}
                onChange={(e) => setForm({ ...form, service_id: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">None</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Multiple Images */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Images (multiple)</label>
              {form.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt={`Preview ${i}`} className="w-24 h-20 object-cover rounded-lg border border-border" />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-card cursor-pointer hover:bg-muted transition-colors text-sm">
                <ImagePlus className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Images"}
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleMultiImageUpload} disabled={uploading} />
              </label>
            </div>

            {/* Video */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Video (optional)</label>
              {form.video_url && (
                <div className="mb-2 flex items-center gap-2">
                  <video src={form.video_url} className="w-40 h-24 object-cover rounded-lg border border-border" />
                  <Button variant="ghost" size="sm" onClick={() => setForm({ ...form, video_url: "" })}>
                    <X className="w-3 h-3" /> Remove
                  </Button>
                </div>
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-card cursor-pointer hover:bg-muted transition-colors text-sm">
                <Video className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Video"}
                <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={uploading} />
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="grid gap-3">
              {projects.map((project) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  statusInfo={getStatusInfo}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default AdminPortfolio;
