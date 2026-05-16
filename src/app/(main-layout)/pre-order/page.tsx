"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import { motion } from "framer-motion";
import { Plane, Shield, ShieldCheck, Truck, CreditCard, CheckCircle2, ChevronRight, Sparkles, Globe, Package, Banknote, HandCoins, ArrowRight, Phone, Heart, RotateCcw, Zap, Timer, Star, MessageCircle, AlertCircle } from "lucide-react";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }) };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } } };

const terms = [
  "Booking amount: 20-30% advance payment required",
  "Delivery: 3-7 working days from Dubai",
  "Price may vary ±2-3% due to customs & market changes",
  "Order confirmed after advance payment received",
  "0% interest EMI available",
  "Full warranty & after-sales support guaranteed",
];

export default function PreOrderPage() {
  const preOrderProducts = useMemo(() => mockProducts.filter((p) => p.isPreOrder), []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-16 right-[15%] text-white/10">
              <Plane className="h-16 w-16" />
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-20 left-[10%] text-white/10">
              <Globe className="h-14 w-14" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20 relative text-white">
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white font-medium">Pre-Order</span>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                    <Globe className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm font-medium">Direct Import from Dubai</span>
                  </div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                  Pre-Order <span className="relative">from Dubai</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                  Import the world's latest smartphones directly from Dubai. Pay advance and receive original products in 3-7 days!
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-wrap gap-2">
                  {[
                    { icon: Plane, text: "3-7 Days Delivery" },
                    { icon: ShieldCheck, text: "100% Original" },
                    { icon: Zap, text: "0% EMI" },
                  ].map((badge) => (
                    <div key={badge.text} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 text-sm">
                      <badge.icon className="h-3.5 w-3.5" /><span>{badge.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 max-w-sm w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                      <Plane className="h-8 w-8 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-bold">Dubai Import</h3>
                    <p className="text-sm text-white/60 mt-1">Direct import from UAE</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Timer, label: "Delivery Time", value: "3-7 Working Days" },
                      { icon: HandCoins, label: "Advance Payment", value: "20-30%" },
                      { icon: ShieldCheck, label: "Warranty", value: "Full Guarantee" },
                      { icon: CreditCard, label: "EMI", value: "0% Interest" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <item.icon className="h-4 w-4 text-white/60" />
                          <span className="text-sm text-white/70">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="block mt-5">
                    <Button className="w-full rounded-xl gap-2 bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                      <MessageCircle className="h-4 w-4" />Pre-Order Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3">
            {[
              { icon: Globe, value: "Any Phone", label: "From Dubai", color: "text-blue-500" },
              { icon: Timer, value: "3-7", label: "Days Delivery", color: "text-emerald-500" },
              { icon: Shield, value: "100%", label: "Original Guarantee", color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={stat.label} className={`flex flex-col items-center justify-center py-8 ${i < 2 ? "border-r border-border/40" : ""}`}>
                <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 text-center px-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Terms */}
        <section className="pb-12 sm:pb-16 pt-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            <Card className="rounded-2xl border-primary/20 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 sm:px-6 py-4 border-b border-primary/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><AlertCircle className="h-4 w-4 text-primary" /></div>
                  <h2 className="font-bold text-lg">Pre-Order Terms & Conditions</h2>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {terms.map((term, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{term}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Products */}
        <section className="pb-12 sm:pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-10">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"><Package className="h-3.5 w-3.5 mr-1.5" />Order Now</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Pre-Order Products</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-lg mx-auto">Browse the latest models available for import from Dubai and pre-order now</motion.p>
          </motion.div>

          {preOrderProducts.length > 0 ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {preOrderProducts.map((product, idx) => (
                <motion.div key={product.id} variants={scaleIn}><ProductCard product={product} index={idx} /></motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="rounded-2xl border-border/60">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"><Plane className="h-10 w-10 text-muted-foreground/40" /></div>
                <h3 className="text-lg font-bold mb-2">No pre-order products available right now</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">New models coming soon! Visit our shop to see other products.</p>
                <Link href="/shop"><Button className="rounded-full px-6 gap-2"><Package className="h-4 w-4" />Visit Shop</Button></Link>
              </CardContent>
            </Card>
          )}

          {preOrderProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/shop"><Button variant="outline" className="rounded-full px-6 gap-2">View All Products<ArrowRight className="h-4 w-4" /></Button></Link>
            </div>
          )}
        </section>

        {/* Why Pre-Order */}
        <section className="pb-12 sm:pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-8">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Why Pre-Order?</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold">Benefits of Pre-Ordering</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Star, title: "Latest Models First", description: "Get the newest models before they hit local stores. Be the first to own the latest release.", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
              { icon: ShieldCheck, title: "100% Original", description: "Every product sourced directly from authorized channels. Full authenticity guaranteed.", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
              { icon: CreditCard, title: "Easy Payment", description: "Book with a small advance, pay the rest on delivery. EMI options also available.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
              { icon: Truck, title: "Fast Delivery", description: "3-7 working days from Dubai to your doorstep. Safe shipping with tracking.", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
            ].map((feature) => (
              <motion.div key={feature.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-5">
                    <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-sm mb-1.5">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-indigo-600/5 via-violet-600/10 to-blue-600/5 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} custom={0}><Plane className="h-10 w-10 text-primary mx-auto mb-4" /></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Want your favorite phone from Dubai?</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground mb-8">Don't see your preferred phone in the list? Let us know — we can import any brand's phone from Dubai!</motion.p>
            <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full px-8 gap-2"><MessageCircle className="h-4 w-4" />WhatsApp Us</Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2"><Phone className="h-4 w-4" />Call Us</Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} custom={4} className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: ShieldCheck, text: "Original Products" },
                { icon: Plane, text: "Dubai Import" },
                { icon: RotateCcw, text: "Easy Return" },
                { icon: Heart, text: "5,000+ Customers" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <badge.icon className="h-4 w-4 text-primary" /><span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
