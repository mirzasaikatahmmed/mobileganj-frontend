'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Phone', icon: '📱', href: '/shop?category=Phone' },
  { name: 'Charger', icon: '🔌', href: '/shop?category=Charger' },
  { name: 'Earphone', icon: '🎧', href: '/shop?category=Earphone' },
  { name: 'Power Bank', icon: '🔋', href: '/shop?category=Power Bank' },
  { name: 'Cover', icon: '📦', href: '/shop?category=Cover' },
  { name: 'Glass', icon: '🛡️', href: '/shop?category=Glass' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured <span className="text-primary">Categories</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Link
              href={category.href}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="font-semibold text-sm text-center">{category.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
