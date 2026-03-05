import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Palette, TreeDeciduous, ChefHat, Hammer, Castle, Home, Paintbrush, Ruler, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[] | null;
  image: string | null;
  images: string[] | null;
  long_description: string | null;
  created_at: string;
};

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2, Palette, TreeDeciduous, ChefHat, Hammer, Castle, Home, Paintbrush, Ruler,
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => {
    supabase.from("services").select("*").order("created_at").then(({ data }) => {
      if (data) setServices(data as Service[]);
    });
  }, []);

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Complete Home <span className="text-gradient-gold">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From construction to interiors, we offer comprehensive services to build and beautify your dream home.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComp = iconMap[service.icon] || Building2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-3d bg-card border border-border rounded-2xl overflow-hidden h-full shadow-premium hover:border-gold/50 transition-all duration-500 flex flex-col">
                <div className="p-8 flex flex-col flex-1">
                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gold">
                      <IconComp className="w-8 h-8 text-charcoal" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(service.features ?? []).map((feature, fIndex) => (
                        <span key={fIndex} className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelected(service)}
                      className="mt-auto flex items-center text-gold font-medium hover:gap-3 gap-2 transition-all duration-300"
                    >
                      <span className="text-sm">Learn More</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-premium"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center shadow-gold">
                      {(() => { const IC = iconMap[selected.icon] || Building2; return <IC className="w-7 h-7 text-charcoal" />; })()}
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-foreground">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{selected.description}</p>
                {selected.long_description && (
                  <div className="text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">{selected.long_description}</div>
                )}
                {/* Gallery Images */}
                {((selected.images && selected.images.length > 0) || selected.image) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {selected.image && (
                      <img src={selected.image} alt={selected.title} className="w-full h-auto rounded-xl object-contain bg-black/5" />
                    )}
                    {(selected.images ?? []).map((img, i) => (
                      <img key={i} src={img} alt={`${selected.title} ${i + 1}`} className="w-full h-auto rounded-xl object-contain bg-black/5" />
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(selected.features ?? []).map((f, i) => (
                    <span key={i} className="text-sm font-medium bg-secondary text-secondary-foreground px-4 py-2 rounded-full">{f}</span>
                  ))}
                </div>
                <a href="#contact" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 bg-gradient-gold text-charcoal font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Get a Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
