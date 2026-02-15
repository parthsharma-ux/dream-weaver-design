import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Shield, Gem, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    { icon: Award, title: "10+ Years Experience", desc: "Trusted by 1000+ families" },
    { icon: Shield, title: "Quality Materials", desc: "Only premium brands used" },
    { icon: Gem, title: "Transparent Pricing", desc: "No hidden costs ever" },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-premium relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Building Dreams in
              <span className="text-gradient-gold"> Jaipur</span>
              <br />
              Since 2012
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <img src={logo} alt="Bhagwati Builder" className="inline h-6 w-auto rounded mr-1 align-middle" /><strong className="text-foreground">Bhagwati Builder</strong> &{" "}
              <strong className="text-foreground">Sanwariya Home Decor</strong>{" "}
              have been delivering quality construction and interior solutions
              for over a decade in Jaipur, Rajasthan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We believe in building not just houses, but homes filled with
              warmth, elegance, and lasting memories. Our team of expert
              craftsmen and designers work together to bring your vision to life
              with precision and care.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Complete Civil Construction Solutions",
                "Modern Interior & Wooden Work",
                "Customized Modular Kitchen Designs",
                "Terrace Garden & Elevation Design",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-flex items-center gap-3 bg-card border border-gold/30 rounded-xl px-6 py-4 shadow-premium"
            >
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-charcoal font-bold text-lg">12</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">Years of Excellence</div>
                <div className="text-sm text-muted-foreground">Trusted Local Expertise</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-premium hover-lift group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-3xl font-serif font-bold text-gold">500+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-3xl font-serif font-bold text-gold">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Families</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
