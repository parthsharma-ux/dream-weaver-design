import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Palette, TreeDeciduous, ChefHat, Hammer, Castle, Home } from "lucide-react";

const services = [
  { icon: Building2, title: "Civil Construction", description: "Complete house construction from foundation to rooftop with quality materials and expert craftsmanship.", features: ["Foundation Work", "Structural Design", "Finishing"] },
  { icon: Palette, title: "Interior Design", description: "Transform your spaces with modern interior solutions that blend aesthetics with functionality.", features: ["Living Room", "Bedroom Design", "Custom Furniture"] },
  { icon: Hammer, title: "Wooden Work", description: "Premium wooden craftsmanship for doors, windows, wardrobes, and custom furniture pieces.", features: ["Doors & Windows", "Wardrobes", "Custom Carpentry"] },
  { icon: ChefHat, title: "Modular Kitchen", description: "Designer modular kitchens with smart storage solutions and premium finishes.", features: ["Modern Design", "Smart Storage", "Premium Materials"] },
  { icon: TreeDeciduous, title: "Terrace Garden", description: "Beautiful rooftop gardens and green spaces to bring nature closer to your home.", features: ["Garden Design", "Landscaping", "Irrigation"] },
  { icon: Castle, title: "Modern Elevation", description: "Contemporary elevation designs that make your home stand out with a modern aesthetic.", features: ["3D Design", "Facade Work", "Exterior Finish"] },
  { icon: Home, title: "Dream Home Package", description: "Complete end-to-end solution from construction to interior - your one-stop home builder.", features: ["Turnkey Solution", "Customization", "Quality Assurance"] },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-3d bg-card border border-border rounded-2xl p-8 h-full shadow-premium hover:border-gold/50 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-gold">
                  <service.icon className="w-8 h-8 text-charcoal" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};
