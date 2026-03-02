import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Palette, TreeDeciduous, ChefHat, Hammer, Castle, Home, Paintbrush, Ruler } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2, Palette, TreeDeciduous, ChefHat, Hammer, Castle, Home, Paintbrush, Ruler,
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    supabase.from("services").select("*").order("created_at").then(({ data }) => {
      if (data) setServices(data);
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
                <div className="card-3d bg-card border border-border rounded-2xl p-8 h-full shadow-premium hover:border-gold/50 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gold">
                    <IconComp className="w-8 h-8 text-charcoal" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(service.features ?? []).map((feature, fIndex) => (
                      <span key={fIndex} className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center text-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
