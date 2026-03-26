'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PreOrderSection() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl px-8 py-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Pre-Order Any Phone from Dubai
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Get the latest smartphones directly from Dubai. Fast delivery within 3–7 working days with EMI options available.
        </p>
        <Link href="/pre-order">
          <Button size="lg" variant="secondary" className="gap-2 rounded-full px-8 font-semibold">
            Explore Pre-Orders <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
