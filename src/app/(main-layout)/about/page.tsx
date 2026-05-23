"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Users, Award, TrendingUp, ShieldCheck, Truck, RotateCcw, Heart, Phone, Globe, Star, Zap, Target, Eye, ChevronRight, Sparkles, Clock, Headphones, Package, CheckCircle2 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } } };

const stats = [
  { value: "5,000+", label: "Happy Customers", icon: Users, color: "text-blue-500" },
  { value: "10,000+", label: "Products Delivered", icon: Package, color: "text-emerald-500" },
  { value: "5+", label: "Years Experience", icon: Clock, color: "text-amber-500" },
  { value: "98%", label: "Customer Satisfaction", icon: Heart, color: "text-rose-500" },
];

const features = [
  { icon: ShieldCheck, title: "100% Original Products", description: "Sourced directly from authorized distributors. Originality guaranteed on every product.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: TrendingUp, title: "Best Price Guarantee", description: "Most competitive prices in the market. Regular offers, EMI facility and special discounts.", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { icon: Truck, title: "Fast Delivery", description: "Fast delivery service nationwide. 24 hours in Dhaka and 48-72 hours outside Dhaka.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { icon: RotateCcw, title: "Easy Return Policy", description: "Easy return within 7 days. Refund or exchange without any questions.", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { icon: Headphones, title: "24/7 Support", description: "Contact us anytime. Our expert team is always ready to serve you.", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
  { icon: Award, title: "Warranty Benefits", description: "Official warranty on all products. Free servicing and repair facility.", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/30" },
];

const timeline = [
  { year: "2021", title: "Journey Begins", description: "Mobile GANJ started with a small shop in Dhaka." },
  { year: "2022", title: "Online Presence", description: "Online platform launched. Nationwide delivery service started." },
  { year: "2023", title: "Overseas Phones", description: "Started direct phone imports from Dubai and other countries." },
  { year: "2024", title: "EMI Facility", description: "Easy installment phone buying launched. Customer count exceeded 5000+." },
  { year: "2025", title: "Servicing Center", description: "Own servicing center launched. Used phone buying and selling platform." },
];

const team = [
  { name: "Md. Rahim Ahmed", role: "Founder & CEO", image: "/placeholder.jpg" },
  { name: "Tanvir Hasan", role: "Operations Manager", image: "/placeholder.jpg" },
  { name: "Sabrina Akter", role: "Customer Relations", image: "/placeholder.jpg" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative">
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">About Us</span>
          </motion.nav>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />Bangladesh's Trusted Mobile Shop
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Making Technology <span className="text-primary">Accessible to All</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
              Mobile GANJ is a trusted mobile phone and accessories shop in Bangladesh. We deliver original products from the world's best brands at affordable prices. New and used phones, overseas phones, EMI facility — everything in one place.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-wrap gap-3">
              <Link href="/shop"><Button size="lg" className="rounded-full px-8 gap-2"><Store className="h-4 w-4" />Visit Shop</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="rounded-full px-8 gap-2"><Phone className="h-4 w-4" />Contact Us</Button></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={scaleIn} className={`flex flex-col items-center justify-center py-8 sm:py-10 ${i < stats.length - 1 ? "border-r border-border/40" : ""}`}>
                <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Our Story */}
        <section className="py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div variants={fadeInUp} custom={0} className="relative">
                <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-border/40 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Store className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">Mobile GANJ</p>
                      <p className="text-sm text-muted-foreground mt-1">Since 2021</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center"><ShieldCheck className="h-7 w-7 text-emerald-500" /></div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center"><Globe className="h-7 w-7 text-blue-500" /></div>
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center"><Star className="h-5 w-5 text-amber-500" /></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center"><Heart className="h-5 w-5 text-rose-500" /></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} custom={1}>
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Our Story</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Built on Trust</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Our journey started in 2021 with a small shop in Dhaka. With a policy of only original products and honest business, we have earned the love of thousands of customers.</p>
                  <p>Today we are not just a mobile shop — we are a complete ecosystem. New phones, used phone buying and selling, direct imports from Dubai, servicing center, EMI facility — everything under one roof.</p>
                  <p>Our goal is simple — technology should be within everyone's reach, at affordable prices, reliably.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="pb-16 sm:pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <motion.div variants={scaleIn}>
              <Card className="rounded-2xl border-border/60 overflow-hidden h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"><Target className="h-7 w-7 text-primary" /></div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">To deliver original and quality mobile products to every person in Bangladesh at affordable prices. While ensuring exceptional customer service that builds a foundation of trust and satisfaction.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={scaleIn}>
              <Card className="rounded-2xl border-border/60 overflow-hidden h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"><Eye className="h-7 w-7 text-amber-600" /></div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">To become Bangladesh's most trusted and preferred mobile phone destination — where quality, originality and customer satisfaction come above all.</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="pb-16 sm:pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-10">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Why Us?</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Reasons to Choose Us</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-xl mx-auto">Thousands of customers trust us — find out the reasons behind it</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-base mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="pb-16 sm:pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-10">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Our Journey</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold">Our Journey at a Glance</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-5.75 top-2 bottom-2 w-0.5 bg-border" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} variants={fadeInUp} custom={i} className="flex gap-5 group">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10 relative group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-xs font-bold text-primary">{item.year.slice(2)}</span>
                      </div>
                    </div>
                    <Card className="flex-1 rounded-xl border-border/60 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] px-2 py-0 font-medium">{item.year}</Badge>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="pb-16 sm:pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-10">
            <motion.div variants={fadeInUp} custom={0}><Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Our Team</Badge></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">The People Behind Us</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-lg mx-auto">An experienced and skilled team always dedicated to serving you</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {team.map((member) => (
              <motion.div key={member.name} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 overflow-hidden text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Users className="h-9 w-9 text-primary/60" />
                    </div>
                    <h4 className="font-bold text-base">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* CTA */}
      <section className="bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} custom={0}><Zap className="h-10 w-10 text-primary mx-auto mb-4" /></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-4">Get Started Today!</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground mb-8 leading-relaxed">Join thousands of satisfied customers. Visit our shop or contact us directly.</motion.p>
            <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <Link href="/shop"><Button size="lg" className="rounded-full px-8 gap-2"><Store className="h-4 w-4" />Visit Shop</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="rounded-full px-8 gap-2"><Phone className="h-4 w-4" />Contact Us</Button></Link>
            </motion.div>
            <motion.div variants={fadeInUp} custom={4} className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: CheckCircle2, text: "100% Original" },
                { icon: Truck, text: "Free Delivery" },
                { icon: RotateCcw, text: "7-Day Return" },
                { icon: ShieldCheck, text: "Warranty" },
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
