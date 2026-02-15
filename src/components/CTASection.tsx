import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageCircle, Send, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", requirement: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsApp = () => {
    window.open("https://wa.me/917737177301?text=Hello! I'm interested in your construction and interior services. I'd like to discuss my project.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917737177301";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello! I'm ${formData.name} from ${formData.city}.\n\nMy Requirement: ${formData.requirement}\n\nPlease contact me at: ${formData.phone}`;
    window.open(`https://wa.me/917737177301?text=${encodeURIComponent(message)}`, "_blank");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Get Started</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-6 leading-tight">
              Build Your <span className="text-gradient-gold">Dream Home</span><br />With Us
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              Ready to transform your vision into reality? Contact us today for a free site visit and consultation. Our experts are here to guide you every step of the way.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-cream font-semibold">Call Us</div>
                  <a href="tel:+917737177301" className="text-gold hover:underline">+91-7737177301</a>
                  <span className="text-cream/50 mx-2">|</span>
                  <a href="tel:+919660177301" className="text-gold hover:underline">+91-9660177301</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" onClick={handleCall}>
                <Phone className="w-5 h-5" /> Call Now
              </Button>
              <Button variant="whatsapp" size="xl" onClick={handleWhatsApp}>
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-charcoal-light border border-gold/20 rounded-3xl p-8 shadow-premium">
              <h3 className="text-2xl font-serif font-bold text-cream mb-2">Get Free Site Visit</h3>
              <p className="text-cream/60 mb-6">Fill the form below and our team will contact you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-charcoal border border-gold/30 rounded-xl px-5 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors" />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full bg-charcoal border border-gold/30 rounded-xl px-5 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors" />
                <input type="text" placeholder="City (e.g., Jaipur)" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="w-full bg-charcoal border border-gold/30 rounded-xl px-5 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors" />
                <textarea placeholder="Your Requirement (Construction / Interior / Both)" value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} required rows={3} className="w-full bg-charcoal border border-gold/30 rounded-xl px-5 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors resize-none" />
                <Button type="submit" variant="gold" size="xl" className="w-full" disabled={isSubmitted}>
                  {isSubmitted ? (<><CheckCircle className="w-5 h-5" /> Request Sent!</>) : (<><Send className="w-5 h-5" /> Get Free Consultation</>)}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
