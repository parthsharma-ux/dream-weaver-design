import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Sharma", role: "Homeowner, Vaishali Nagar", rating: 5, text: "Bhagwati Builder built our dream home exactly as we imagined. Their attention to detail and quality of work is exceptional. Highly recommended for anyone looking to build in Jaipur!" },
  { name: "Priya Agarwal", role: "Homeowner, Mansarovar", rating: 5, text: "The modular kitchen they designed is stunning! Sanwariya Home Decor truly understands modern aesthetics. The team was professional and completed work on time." },
  { name: "Sunil Jain", role: "Property Investor", rating: 5, text: "I've worked with many builders, but Bhagwati Builder stands out for their transparency and quality. They delivered all 3 of my projects flawlessly. Trustworthy team!" },
  { name: "Meena Gupta", role: "Homeowner, Jagatpura", rating: 5, text: "From construction to interior, they handled everything perfectly. Our terrace garden is the highlight of our home. Thank you for making our vision come true!" },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it – hear from the families who trusted us with their dream homes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-background rounded-2xl p-8 shadow-premium border border-border hover:border-gold/30 transition-colors duration-300 relative"
            >
              <div className="absolute top-6 right-6 text-gold/20">
                <Quote className="w-12 h-12" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 relative z-10">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-charcoal font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-center"
        >
          {[
            { value: "1000+", label: "Happy Families" },
            { value: "4.9", label: "Average Rating" },
            { value: "500+", label: "Projects Delivered" },
            { value: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-serif font-bold text-gold">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
