import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Calculator", href: "#calculator" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/917737177301?text=Hello! I'm interested in your construction and interior services.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917737177301";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-premium py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-3">
        <a href="#home" className="flex items-center gap-2 min-w-0 max-w-[62vw] sm:max-w-none">
          <img src={logo} alt="Bhagwati Property & Builders" className="h-10 sm:h-12 w-auto rounded" />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-cream truncate">
              Bhagwati Builder
            </span>
            <span className="text-[10px] sm:text-xs text-gold font-medium tracking-wider truncate">
              Jaipur Builder • Since 2012
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-cream/90 hover:text-gold transition-colors duration-300 font-medium text-sm tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="goldOutline" size="sm" onClick={handleCall}>
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
          <Button variant="whatsapp" size="sm" onClick={handleWhatsApp}>
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-cream"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-effect border-t border-gold/20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-gold transition-colors duration-300 font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="gold" onClick={handleCall}>
                  <Phone className="w-4 h-4" />
                  Call: +91-7737177301
                </Button>
                <Button variant="whatsapp" onClick={handleWhatsApp}>
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
