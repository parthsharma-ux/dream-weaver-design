import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const categoryColors: Record<string, string> = {
  Construction: "bg-blue-500/20 text-blue-400",
  Interior: "bg-purple-500/20 text-purple-400",
  Kitchen: "bg-orange-500/20 text-orange-400",
  "Wooden Work": "bg-amber-500/20 text-amber-400",
  Terrace: "bg-green-500/20 text-green-400",
  Elevation: "bg-cyan-500/20 text-cyan-400",
};

const statusColors: Record<string, string> = {
  completed: "bg-green-500/20 text-green-400",
  ongoing: "bg-blue-500/20 text-blue-400",
  upcoming: "bg-amber-500/20 text-amber-400",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  ongoing: "Ongoing",
  upcoming: "Upcoming",
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    supabase.from("portfolio_projects").select("*").order("created_at").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  const selected = projects.find((p) => p.id === selectedProject);
  const allMedia = selected ? [...(selected.images || []), ...(selected.video_url ? [selected.video_url] : [])] : [];

  const openProject = (id: string) => {
    setImgIndex(0);
    setSelectedProject(id);
  };

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: "50px 50px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Our Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our finest construction and interior projects across Jaipur.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openProject(project.id)}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gold/20 to-gold/5 border border-border hover:border-gold/50 transition-all duration-500 shadow-premium">
                <div className="absolute inset-0">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-2xl flex items-center justify-center">
                          <span className="text-2xl font-serif font-bold text-charcoal">{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {project.video_url && (
                  <div className="absolute top-3 right-3 bg-charcoal/70 rounded-full p-2">
                    <Play className="w-4 h-4 text-cream fill-cream" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-2 mb-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category] || "bg-gold/20 text-gold"}`}>
                      {project.category}
                    </span>
                    {project.status && project.status !== "completed" && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || ""}`}>
                        {statusLabels[project.status] || project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-cream mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="https://wa.me/917737177301?text=Hello! I'd like to see more of your project portfolio." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold font-semibold hover:underline">
            View More Projects on WhatsApp <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Detail Modal with Gallery */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button className="absolute top-6 right-6 text-cream hover:text-gold transition-colors z-10" onClick={() => setSelectedProject(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full bg-card rounded-2xl p-6 md:p-8 border border-border max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Media Gallery */}
            <div className="relative aspect-video bg-charcoal rounded-xl mb-6 overflow-hidden">
              {allMedia.length > 0 ? (
                <>
                  {allMedia[imgIndex]?.match(/\.(mp4|webm|mov)/) ? (
                    <video src={allMedia[imgIndex]} controls className="w-full h-full object-contain" />
                  ) : (
                    <img src={allMedia[imgIndex] || selected.image} alt={selected.title} className="w-full h-full object-contain" />
                  )}
                  {allMedia.length > 1 && (
                    <>
                      <button onClick={() => setImgIndex((imgIndex - 1 + allMedia.length) % allMedia.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal rounded-full p-2 text-cream">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={() => setImgIndex((imgIndex + 1) % allMedia.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-charcoal/70 hover:bg-charcoal rounded-full p-2 text-cream">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {allMedia.map((_, i) => (
                          <button key={i} onClick={() => setImgIndex(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? "bg-gold" : "bg-cream/40"}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : selected.image ? (
                <img src={selected.image} alt={selected.title} className="w-full h-full object-contain" />
              ) : (
                <span className="flex items-center justify-center h-full text-muted-foreground">No media</span>
              )}
            </div>

            {/* Thumbnails */}
            {allMedia.length > 1 && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {allMedia.map((url, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIndex ? "border-gold" : "border-border"}`}>
                    {url.match(/\.(mp4|webm|mov)/) ? (
                      <div className="w-full h-full bg-charcoal flex items-center justify-center">
                        <Play className="w-4 h-4 text-cream" />
                      </div>
                    ) : (
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[selected.category] || "bg-gold/20 text-gold"}`}>
                {selected.category}
              </span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[selected.status] || statusColors.completed}`}>
                {statusLabels[selected.status] || "Completed"}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{selected.title}</h3>
            <p className="text-muted-foreground">{selected.description}</p>
          </div>
        </motion.div>
      )}
    </section>
  );
};
