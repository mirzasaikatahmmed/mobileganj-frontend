"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, Clock, ChevronRight, Sparkles, Phone, MessageCircle, Heart, Truck, ShieldCheck, ArrowRight, PackageCheck, PackageX, CreditCard, Wallet, ArrowLeftRight, Banknote, Smartphone, FileCheck, AlertTriangle, ClipboardCheck, Send, Search, RefreshCw } from "lucide-react";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }) };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } } };

const eligibilityItems = [
  { icon: PackageCheck, text: "Product must be in original condition with original packaging" },
  { icon: FileCheck, text: "Purchase invoice and warranty card must be present" },
  { icon: Smartphone, text: "Product must have no physical damage" },
  { icon: ClipboardCheck, text: "Return request must be made within 7 days of purchase" },
  { icon: RefreshCw, text: "Product must not be extensively used" },
];

const nonReturnableItems = [
  "Physically damaged or water-damaged products",
  "Products without original packaging",
  "Special sale or clearance items",
  "Opened accessories (earphones, chargers, etc.)",
];

const returnSteps = [
  { title: "Return Request", description: "Call our support team or message on WhatsApp with the reason for return.", icon: Send, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { title: "Pack the Product", description: "Pack the product carefully with all accessories and original packaging.", icon: PackageCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { title: "Send / Drop Off", description: "Send via our courier service or drop off directly at our shop.", icon: Truck, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { title: "Inspection & Refund", description: "After inspection, refund will be processed within 3-5 working days via your preferred method.", icon: Search, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
];

const refundMethods = [
  { icon: Banknote, title: "Bank Transfer", duration: "3-5 Working Days", description: "Direct refund to your bank account", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { icon: CreditCard, title: "Store Credit", duration: "Instant", description: "Store balance usable on next purchase", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: Wallet, title: "Mobile Banking", duration: "Instant", description: "Refund via bKash, Nagad or Rocket", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { icon: ArrowLeftRight, title: "Exchange", duration: "Instant", description: "Exchange for another product", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
];

export default function ReturnPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-16 right-[15%] text-white/10">
              <RotateCcw className="h-16 w-16" />
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-20 left-[10%] text-white/10">
              <PackageCheck className="h-14 w-14" />
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20 relative text-white">
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white font-medium">Return Policy</span>
            </motion.nav>

            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                  <RotateCcw className="h-4 w-4 text-purple-300" />
                  <span className="text-sm font-medium">Easy Return Policy</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                7-Day <span className="relative">Easy Return</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                Not satisfied with the product? No worries! Return hassle-free within 7 days and get a full refund.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-wrap gap-2">
                {[
                  { icon: RotateCcw, text: "7-Day Return" },
                  { icon: Truck, text: "Free Return Shipping" },
                  { icon: Banknote, text: "100% Money Back" },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 text-sm">
                    <badge.icon className="h-3.5 w-3.5" /><span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-3">
            {[
              { icon: Clock, value: "7 Days", label: "Return Window", color: "text-violet-500" },
              { icon: Truck, value: "Free", label: "Return Shipping", color: "text-emerald-500" },
              { icon: Banknote, value: "100%", label: "Money Back Guarantee", color: "text-amber-500" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={scaleIn} className={`flex flex-col items-center justify-center py-8 sm:py-10 ${i < 2 ? "border-r border-border/40" : ""}`}>
                <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 text-center px-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Eligibility */}
        <section className="py-12 sm:py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-8">
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />Return Conditions
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold">Return Eligibility</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eligibilityItems.map((item) => (
              <motion.div key={item.text} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 group">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm leading-relaxed mt-1.5">{item.text}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Non-Returnable */}
        <section className="pb-12 sm:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
            <Card className="rounded-2xl border-destructive/20 overflow-hidden">
              <div className="bg-destructive/5 px-5 sm:px-6 py-4 border-b border-destructive/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center"><PackageX className="h-4 w-4 text-destructive" /></div>
                  <div>
                    <h2 className="font-bold text-lg">Non-Returnable Items</h2>
                    <p className="text-xs text-muted-foreground">These products are not covered under the return policy</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {nonReturnableItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 hover:bg-destructive/8 transition-colors">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Return Process */}
        <section className="pb-12 sm:pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-8">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"><Sparkles className="h-3.5 w-3.5 mr-1.5" />Return Process</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">How to Return?</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-lg mx-auto">Your return and refund will be completed in just 4 simple steps</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {returnSteps.map((step, idx) => (
              <motion.div key={step.title} variants={scaleIn} className="relative">
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <span className="text-3xl font-bold text-muted-foreground/20">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {idx < returnSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-background border border-border/60 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Refund Methods */}
        <section className="pb-12 sm:pb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-8">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-violet-500/10 text-violet-600 border-violet-500/20 hover:bg-violet-500/15"><Wallet className="h-3.5 w-3.5 mr-1.5" />Refund</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Refund Methods</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-lg mx-auto">Choose any refund method that suits you</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {refundMethods.map((method) => (
              <motion.div key={method.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className={`h-7 w-7 ${method.color}`} />
                    </div>
                    <h3 className="font-bold text-base mb-1">{method.title}</h3>
                    <Badge variant="secondary" className="text-xs font-medium mb-2">
                      <Clock className="h-3 w-3 mr-1" />{method.duration}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-violet-600/5 via-purple-600/10 to-fuchsia-600/5 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} custom={0}><RotateCcw className="h-10 w-10 text-primary mx-auto mb-4" /></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Need help with a return?</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground mb-8">Our support team is always ready to help you. Contact us now!</motion.p>
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
                { icon: RotateCcw, text: "7-Day Return" },
                { icon: Truck, text: "Free Shipping" },
                { icon: ShieldCheck, text: "100% Secure" },
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
