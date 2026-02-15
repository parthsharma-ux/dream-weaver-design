import { Phone, MessageCircle, MapPin } from "lucide-react";

const services = ["Civil Construction", "Interior Design", "Wooden Work", "Modular Kitchen", "Terrace Garden", "Modern Elevation"];
const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/917737177301?text=Hello! I'm interested in your services.", "_blank");
  };

  return (
    <footer className="bg-charcoal text-cream border-t border-gold/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 break-words">Bhagwati Builder</h3>
            <p className="text-gold text-sm mb-4">Jaipur Builder • Since 2012</p>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              "We Build Your Dream Not Only A House"<br /><br />
              Complete house construction and interior solutions in Jaipur, Rajasthan.
            </p>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-3 md:px-4 py-2">
              <span className="text-gold font-semibold text-sm">🏆 Since 2012</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 md:mb-6 text-cream">Our Services</h4>
            <ul className="space-y-2 md:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-cream/70 hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    <span className="break-words">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 md:mb-6 text-cream">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-cream/70 hover:text-gold transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 md:mb-6 text-cream">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <a href="tel:+917737177301" className="text-cream/70 hover:text-gold transition-colors text-sm block break-all">+91-7737177301</a>
                  <a href="tel:+919660177301" className="text-cream/70 hover:text-gold transition-colors text-sm block break-all">+91-9660177301</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <button onClick={handleWhatsApp} className="text-cream/70 hover:text-gold transition-colors text-sm text-left">WhatsApp Chat</button>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">Jaipur, Rajasthan, India</span>
              </li>
            </ul>
            <button onClick={handleWhatsApp} className="mt-6 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-xs md:text-sm text-center md:text-left break-words max-w-full">
            <span className="block">© 2024 Bhagwati Builder</span>
            <span className="block">Sanwariya Home Decor</span>
            <span className="block">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-3 md:gap-4 text-cream/50 text-xs md:text-sm flex-wrap justify-center">
            <span>Jaipur, Rajasthan</span>
            <span className="text-gold">•</span>
            <span>Since 2012</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
