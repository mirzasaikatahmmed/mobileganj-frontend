"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const usedPhones = [
  { id: "u1", name: "iPhone 14 Pro Max", slug: "used-iphone-14-pro-max", image: "/products/iphone-14-pro-max.jpg", originalPrice: 115000, price: 85000, condition: "Like New", storage: "256GB", color: "Deep Purple" },
  { id: "u2", name: "Samsung S23 Ultra", slug: "used-samsung-s23-ultra", image: "/products/samsung-s23-ultra.jpg", originalPrice: 115000, price: 78000, condition: "Like New", storage: "256GB", color: "Phantom Black" },
  { id: "u3", name: "iPhone 13 Pro", slug: "used-iphone-13-pro", image: "/products/iphone-15-pro.jpg", originalPrice: 95000, price: 58000, condition: "Used", storage: "128GB", color: "Graphite" },
  { id: "u4", name: "Google Pixel 7 Pro", slug: "used-google-pixel-7-pro", image: "/products/google-pixel-7-pro.jpg", originalPrice: 79000, price: 42000, condition: "Used", storage: "128GB", color: "Obsidian" },
];

export default function UsedPhoneSection() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Pre <span className="text-emerald-600">Owned</span>
        </h2>
        <Link href="/buy-phone">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {usedPhones.map((phone, idx) => (
          <motion.div
            key={phone.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <Link href={`/product/${phone.slug}`} className="group block">
              <div className="rounded-xl overflow-hidden bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px]">
                    {phone.condition}
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {phone.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-sm font-bold">
                      ৳{phone.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ৳{phone.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    ৳{(phone.originalPrice - phone.price).toLocaleString()} OFF
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
