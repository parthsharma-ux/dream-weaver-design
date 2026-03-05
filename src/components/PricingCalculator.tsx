import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calculator, Home, Paintbrush, ChefHat, TreeDeciduous, Hammer, IndianRupee, MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";

const constructionTypes = [
  { id: "standard", name: "Standard", pricePerSqft: 1800, description: "Quality construction with standard finishes" },
  { id: "premium", name: "Premium", pricePerSqft: 2200, description: "Premium materials with better finishes" },
  { id: "luxury", name: "Luxury", pricePerSqft: 2800, description: "Top-quality materials with luxury finishes" },
];

const interiorTypes = [
  { id: "basic", name: "Basic", pricePerSqft: 800, description: "Essential interior with standard fittings" },
  { id: "modular", name: "Modular", pricePerSqft: 1200, description: "Modular furniture with quality finishes" },
  { id: "designer", name: "Designer", pricePerSqft: 1800, description: "Custom designer interiors" },
];

const additionalServices = [
  { id: "kitchen", name: "Modular Kitchen", icon: ChefHat, price: 150000 },
  { id: "garden", name: "Terrace Garden", icon: TreeDeciduous, price: 80000 },
  { id: "woodwork", name: "Premium Woodwork", icon: Hammer, price: 200000 },
];

export const PricingCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [plotSize, setPlotSize] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [constructionType, setConstructionType] = useState("premium");
  const [includeInterior, setIncludeInterior] = useState(true);
  const [interiorType, setInteriorType] = useState("modular");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const builtUpArea = plotSize * floors * 0.6;
  const constructionCost = builtUpArea * (constructionTypes.find((c) => c.id === constructionType)?.pricePerSqft || 0);
  const interiorCost = includeInterior ? builtUpArea * (interiorTypes.find((i) => i.id === interiorType)?.pricePerSqft || 0) : 0;
  const servicesCost = selectedServices.reduce((acc, id) => {
    const service = additionalServices.find((s) => s.id === id);
    return acc + (service?.price || 0);
  }, 0);
  const totalEstimate = constructionCost + interiorCost + servicesCost;

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const handleWhatsAppQuote = () => {
    const message = `Hello! I'm interested in getting a detailed quote.\n\nMy Requirements:\n- Plot Size: ${plotSize} sq.ft\n- Floors: ${floors}\n- Construction Type: ${constructionTypes.find((c) => c.id === constructionType)?.name}\n- Interior: ${includeInterior ? interiorTypes.find((i) => i.id === interiorType)?.name : "Not required"}\n- Additional Services: ${selectedServices.length > 0 ? selectedServices.map((id) => additionalServices.find((s) => s.id === id)?.name).join(", ") : "None"}\n\nEstimated Budget: ${formatPrice(totalEstimate)}\n\nPlease provide a detailed quotation.`;
    window.open(`https://wa.me/917737177301?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="calculator" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-gold font-medium tracking-widest text-sm uppercase mb-4 block">Cost Estimator</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Calculate Your <span className="text-gradient-gold">Project Cost</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Get an instant estimate for your dream home. Prices are indicative and may vary based on specifications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Property Details */}
            <div className="bg-background rounded-2xl p-6 border border-border shadow-premium">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-gold" /> Property Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Plot Size (sq.ft)</label>
                  <input type="range" min="500" max="5000" step="100" value={plotSize} onChange={(e) => setPlotSize(Number(e.target.value))} className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-gold" />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">500</span>
                    <span className="text-lg font-bold text-gold">{plotSize} sq.ft</span>
                    <span className="text-sm text-muted-foreground">5000</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Number of Floors</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((f) => (
                      <button key={f} onClick={() => setFloors(f)} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${floors === f ? "bg-gradient-gold text-charcoal shadow-gold" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                        {f === 1 ? "G" : `G+${f - 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gold/10 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Built-up Area:</strong>{" "}
                  <span className="text-gold font-semibold">{builtUpArea.toLocaleString()} sq.ft</span> (approx. 60% of plot × {floors} floors)
                </p>
              </div>
            </div>

            {/* Construction Type */}
            <div className="bg-background rounded-2xl p-6 border border-border shadow-premium">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold" /> Construction Type
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {constructionTypes.map((type) => (
                  <button key={type.id} onClick={() => setConstructionType(type.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${constructionType === type.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"}`}>
                    <div className="font-semibold text-foreground">{type.name}</div>
                    <div className="text-gold font-bold">₹{type.pricePerSqft}/sq.ft</div>
                    <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior */}
            <div className="bg-background rounded-2xl p-6 border border-border shadow-premium">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                  <Paintbrush className="w-5 h-5 text-gold" /> Interior Design
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={includeInterior} onChange={(e) => setIncludeInterior(e.target.checked)} className="w-5 h-5 rounded accent-gold" />
                  <span className="text-sm text-foreground">Include Interior</span>
                </label>
              </div>
              {includeInterior && (
                <div className="grid md:grid-cols-3 gap-4">
                  {interiorTypes.map((type) => (
                    <button key={type.id} onClick={() => setInteriorType(type.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${interiorType === type.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"}`}>
                      <div className="font-semibold text-foreground">{type.name}</div>
                      <div className="text-gold font-bold">₹{type.pricePerSqft}/sq.ft</div>
                      <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Services */}
            <div className="bg-background rounded-2xl p-6 border border-border shadow-premium">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Additional Services</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {additionalServices.map((service) => (
                  <button key={service.id} onClick={() => toggleService(service.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedServices.includes(service.id) ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"}`}>
                    <service.icon className={`w-6 h-6 mb-2 ${selectedServices.includes(service.id) ? "text-gold" : "text-muted-foreground"}`} />
                    <div className="font-semibold text-foreground">{service.name}</div>
                    <div className="text-gold font-bold">{formatPrice(service.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Estimate Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl p-6 border border-gold/20 shadow-premium">
              <h3 className="font-serif text-xl font-semibold text-cream mb-6 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-gold" /> Cost Estimate
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-cream/80">
                  <span>Construction ({constructionTypes.find((c) => c.id === constructionType)?.name})</span>
                  <span className="font-semibold text-cream">{formatPrice(constructionCost)}</span>
                </div>
                {includeInterior && (
                  <div className="flex justify-between text-cream/80">
                    <span>Interior ({interiorTypes.find((i) => i.id === interiorType)?.name})</span>
                    <span className="font-semibold text-cream">{formatPrice(interiorCost)}</span>
                  </div>
                )}
                {selectedServices.length > 0 && (
                  <div className="flex justify-between text-cream/80">
                    <span>Additional Services</span>
                    <span className="font-semibold text-cream">{formatPrice(servicesCost)}</span>
                  </div>
                )}
                <div className="border-t border-gold/20 pt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-cream font-medium">Total Estimate</span>
                    <span className="text-3xl font-serif font-bold text-gold">{formatPrice(totalEstimate)}</span>
                  </div>
                  <p className="text-xs text-cream/50 mt-2">*Prices are approximate and may vary based on location and specific requirements</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="gold" size="lg" className="w-full" onClick={handleWhatsAppQuote}>
                  <MessageCircle className="w-5 h-5" /> Get Detailed Quote
                </Button>
                <Button variant="heroOutline" size="lg" className="w-full" onClick={() => (window.location.href = "tel:+917737177301")}>
                  <Phone className="w-5 h-5" /> Call for Appointment
                </Button>
              </div>
              <div className="mt-6 p-3 bg-gold/10 rounded-xl text-center">
                <p className="text-sm text-cream/80">🏆 <strong className="text-gold">Free Site Visit</strong> for all inquiries</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
