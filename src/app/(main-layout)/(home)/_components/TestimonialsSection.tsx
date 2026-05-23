"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Karim Ahmed",
    location: "Rangpur",
    rating: 5,
    text: "Bought iPhone 15 Pro Max from Mobile GANJ. Got 100% original product. EMI facility is great!",
    product: "iPhone 15 Pro Max",
    avatar: "👨",
  },
  {
    id: 2,
    name: "Fatima Akter",
    location: "Dhaka",
    rating: 5,
    text: "Pre-ordered Samsung S24 Ultra from Dubai. Received within 5 days. Excellent service!",
    product: "Samsung S24 Ultra",
    avatar: "👩",
  },
  {
    id: 3,
    name: "Rahim Khan",
    location: "Bogura",
    rating: 5,
    text: "Sold my old iPhone and bought a new phone. Exchange offer is really good. Thank you Mobile GANJ!",
    product: "Trade-in Service",
    avatar: "👨",
  },
  {
    id: 4,
    name: "Sumaiya Rahman",
    location: "Rangpur",
    rating: 4,
    text: "Bought a used phone, condition feels brand new. Battery health 92%. Really satisfied.",
    product: "Used iPhone 14 Pro",
    avatar: "👩",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          What Our <span className="text-primary">Customers</span> Say
        </h2>
        <p className="text-muted-foreground">
          Trusted by 2000+ happy customers across Bangladesh
        </p>
      </div>

      <div className="overflow-hidden pb-8">
        <motion.div
          className="flex gap-4 sm:gap-6 w-fit"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Seamless infinite loop array duplication */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="bg-card border rounded-xl p-5 hover:shadow-md transition-all w-70 md:w-[320px] shrink-0 whitespace-normal"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < t.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground/30"
                      }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.location} • {t.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
