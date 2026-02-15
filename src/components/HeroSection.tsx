import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import heroVideoMobile from "@/assets/hero-video-mobile.mp4";

export const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/917737177301?text=Hello! I'm interested in your construction and interior services. I'd like to schedule a free site visit.",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = "tel:+917737177301";
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      {/* Background Video - Mobile 9:16 */}
      <div className="absolute inset-0 md:hidden overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={heroVideoMobile} type="video/mp4" />
        </video>
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/90" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-28 md:pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/40 rounded-full px-3 md:px-4 py-2 mb-4 md:mb-6"
          >
            <MapPin className="w-4 h-4 text-gold" />
            <span className="text-cream text-xs md:text-sm font-medium">
              Trusted Builders in Jaipur Since 2012
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-cream leading-tight mb-4 md:mb-6"
          >
            Complete House Construction
            <br />
            <span className="text-gradient-gold">& Interior Solution</span>
            <br />
            in Jaipur
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-cream/80 mb-3 md:mb-4 max-w-2xl font-light"
          >
            From foundation to final decor – We build & design your dream home
          </motion.p>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-1 md:gap-2 mb-6 md:mb-8"
          >
            <p className="text-gold italic font-serif text-sm md:text-lg">
              "We Build Your Dream Not Only A House 🏡"
            </p>
            <p className="text-gold italic font-serif text-sm md:text-lg">
              "We Decor Your Dream Not Only Your House 🏠"
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12"
          >
            <Button
              variant="hero"
              size="lg"
              className="sm:h-14 sm:px-10 sm:text-base"
              onClick={handleCall}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="sm:h-14 sm:px-10 sm:text-base"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Site Visit
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              className="sm:h-14 sm:px-10 sm:text-base"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { number: "12+", label: "Years Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "1000+", label: "Happy Families" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold">
                  {stat.number}
                </div>
                <div className="text-cream/70 text-xs md:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
