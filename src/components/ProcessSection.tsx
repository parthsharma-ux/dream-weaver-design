import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, HardHat, Paintbrush, KeyRound } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Consultation", description: "Share your vision with us. We listen to understand your needs, budget, and timeline." },
  { icon: PenTool, step: "02", title: "Design Planning", description: "Our experts create detailed plans and 3D designs for your approval and customization." },
  { icon: HardHat, step: "03", title: "Construction", description: "Quality construction begins with premium materials and expert supervision." },
  { icon: Paintbrush, step: "04", title: "Interior Execution", description: "Transform spaces with stunning interiors, modular work, and finishing touches." },
  { icon: KeyRound, step: "05", title: "Final Handover", description: "Your dream home is ready! Complete handover with all documentation and support." },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            From Vision to <span className="text-gradient-gold">Reality</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A streamlined process that ensures quality, transparency, and your complete satisfaction at every step.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center group"
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 bg-card border-2 border-gold/30 rounded-full flex items-center justify-center group-hover:border-gold transition-colors duration-300 shadow-premium relative z-10">
                    <step.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-charcoal font-bold text-xs shadow-gold z-20">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 text-gold/50">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
