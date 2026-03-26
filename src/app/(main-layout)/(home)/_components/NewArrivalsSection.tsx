"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const tabs = [
  { key: "best-deals", label: "Best Deals" },
  { key: "top-selling", label: "Top Selling" },
];

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState("best-deals");

  const products = mockProducts
    .filter((p) =>
      activeTab === "best-deals"
        ? p.tags?.includes("Best Deal") || !!p.offerPrice
        : p.tags?.includes("Hot") || p.tags?.includes("New Arrival"),
    )
    .slice(0, 4);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured <span className="text-primary">Products</span>
        </h2>
        <Link href="/shop">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <ProductCard product={product} index={idx} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
