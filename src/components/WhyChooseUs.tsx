import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Award, Gem, Palette, Users, MapPin } from "lucide-react";

const reasons = [
  { icon: Award, title: "10+ Years Experience", description: "Over a decade of expertise in construction and interior design in Jaipur." },
  { icon: Clock, title: "On-Time Delivery", description: "We value your time and ensure project completion within committed timelines." },
  { icon: Gem, title: "Premium Materials", description: "Only the finest quality materials from trusted brands for lasting durability." },
  { icon: Palette, title: "Custom Designs", description: "Personalized designs tailored to your taste, lifestyle, and requirements." },
  { icon: Users, title: "One-Stop Solution", description: "From construction to final decor - everything under one roof." },
  { icon: MapPin, title: "Local Expertise", description: "Deep understanding of Jaipur's architecture, climate, and local preferences." },
];

export const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            The <span className="text-gradient-gold">Bhagwati Builder</span><br />Advantage
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience the difference of working with Jaipur's most trusted construction and interior company.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center border border-border group-hover:border-gold/50 transition-colors duration-300 shadow-premium">
                  <reason.icon className="w-9 h-9 text-gold" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-charcoal font-bold text-sm shadow-gold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-gold rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
            Ready to Build Your Dream Home?
          </h3>
          <p className="text-charcoal/80 mb-6 max-w-2xl mx-auto">
            Join 1000+ happy families who trusted us with their dream homes. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917737177301" className="inline-flex items-center justify-center gap-2 bg-charcoal text-cream px-8 py-4 rounded-xl font-semibold hover:bg-charcoal/90 transition-colors">
              📞 Call: +91-7737177301
            </a>
            <a href="https://wa.me/917737177301" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors">
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
