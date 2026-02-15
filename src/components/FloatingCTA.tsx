import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export const FloatingCTA = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/917737177301?text=Hello! I'm interested in your construction and interior services.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917737177301";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={handleCall}
        className="w-14 h-14 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-charcoal" />
      </motion.button>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        onClick={handleWhatsApp}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-gold"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};
