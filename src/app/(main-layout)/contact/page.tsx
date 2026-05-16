"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, ChevronRight, Send, MessageCircle, Headphones, User, StickyNote, Sparkles, CheckCircle2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } } };

const contactMethods = [
  { icon: Phone, title: "Call Us", details: ["+880 1234-567890", "+880 1987-654321"], action: "Call Now", link: "tel:+8801234567890", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", borderColor: "hover:border-blue-300 dark:hover:border-blue-800" },
  { icon: MessageCircle, title: "WhatsApp", details: ["+880 1234-567890"], action: "Chat Now", link: "https://wa.me/8801234567890", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", borderColor: "hover:border-emerald-300 dark:hover:border-emerald-800" },
  { icon: Send, title: "Facebook Messenger", details: ["Mobile GANJ Official"], action: "Send Message", link: "https://facebook.com", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30", borderColor: "hover:border-violet-300 dark:hover:border-violet-800" },
  { icon: Mail, title: "Email", details: ["info@mobileganj.com"], action: "Send Email", link: "mailto:info@mobileganj.com", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/30", borderColor: "hover:border-rose-300 dark:hover:border-rose-800" },
];

const faqs = [
  { q: "How long does delivery take after ordering?", a: "Delivery within 24 hours in Dhaka and 48-72 hours outside Dhaka." },
  { q: "What is the return policy?", a: "You can return within 7 days of receiving the product. Full refund or exchange for any defective items." },
  { q: "How can I get EMI facility?", a: "EMI available on any product ৳10,000+, for 3-12 months. Visit our EMI page for details." },
  { q: "Can I sell my old phone?", a: "Yes! Submit your phone details in the Sell Phone section and we will offer you the best price." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.success("Your message has been sent! We will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 relative">
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Contact</span>
          </motion.nav>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 px-3 py-1">
                <Headphones className="h-3.5 w-3.5 mr-1.5" />
                We are always here for you
              </Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Get in <span className="text-primary">Touch With Us</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Contact us for any questions, suggestions or help. Our expert team is always ready to serve you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method) => (
              <motion.div key={method.title} variants={scaleIn}>
                <a href={method.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className={`rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 ${method.borderColor} transition-all duration-300 group cursor-pointer`}>
                    <CardContent className="p-5 sm:p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className={`h-7 w-7 ${method.color}`} />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base mb-2">{method.title}</h3>
                      {method.details.map((detail, i) => <p key={i} className="text-xs sm:text-sm text-muted-foreground mb-0.5">{detail}</p>)}
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline underline-offset-2">
                        {method.action}<ArrowUpRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Form + Store Info */}
        <section className="py-12 sm:py-16">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="lg:col-span-7">
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><Send className="h-4 w-4 text-primary" /></div>
                    <div>
                      <h2 className="font-bold text-lg">Send a Message</h2>
                      <p className="text-xs text-muted-foreground">We will reply within 24 hours</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />Your Name <span className="text-destructive">*</span>
                        </Label>
                        <Input id="name" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-11 rounded-lg" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-11 rounded-lg" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />Email <span className="text-muted-foreground text-xs">(Optional)</span>
                      </Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-11 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="flex items-center gap-1.5 text-sm font-medium">
                        <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />Subject <span className="text-muted-foreground text-xs">(Optional)</span>
                      </Label>
                      <Input id="subject" placeholder="What would you like to contact us about?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-11 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="flex items-center gap-1.5 text-sm font-medium">
                        <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea id="message" placeholder="Write your message in detail..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="resize-none rounded-lg" />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-xl gap-2 text-base font-semibold py-6" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />Sending...</>
                      ) : (
                        <><Send className="h-4 w-4" />Send Message</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Store Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.15, duration: 0.6 }} className="lg:col-span-5 space-y-5">
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="h-4 w-4 text-primary" /></div>
                    <h2 className="font-bold text-lg">Our Store</h2>
                  </div>
                </div>
                <CardContent className="p-5 space-y-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-blue-600" /></div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">Address</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">123 Main Street, Gulshan-1<br />Dhaka-1212, Bangladesh</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0"><Clock className="h-5 w-5 text-emerald-600" /></div>
                    <div>
                      <p className="font-semibold text-sm mb-1.5">Business Hours</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground">Saturday - Thursday</span>
                          <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">10:00 AM - 8:00 PM</Badge>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground">Friday</span>
                          <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">2:00 PM - 8:00 PM</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-violet-600" /></div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">Quick Contact</p>
                      <p className="text-sm text-muted-foreground">+880 1234-567890</p>
                      <p className="text-sm text-muted-foreground">info@mobileganj.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-4/3 bg-linear-to-br from-muted/50 to-muted rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/3 w-20 h-20 rounded-full border-2 border-primary" />
                      <div className="absolute top-1/3 left-1/4 w-32 h-0.5 bg-primary/50 rotate-45" />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">Gulshan-1, Dhaka</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Google Maps coming soon</p>
                    </div>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-xs">
                        <MapPin className="h-3.5 w-3.5" />View on Map
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-2">
                {[
                  { icon: CheckCircle2, text: "Reply within 24 hours" },
                  { icon: Headphones, text: "24/7 Support" },
                  { icon: ShieldCheck, text: "Trusted Service" },
                ].map((badge) => (
                  <Badge key={badge.text} variant="outline" className="rounded-full px-3 py-1.5 gap-1.5 text-xs font-medium border-border/60">
                    <badge.icon className="h-3.5 w-3.5 text-primary" />{badge.text}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-16 sm:pb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center mb-10">
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />Frequently Asked
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Frequently Asked Questions</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground max-w-lg mx-auto">Answers to the most commonly asked questions</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section className="bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center max-w-2xl mx-auto">
            <motion.div variants={fadeInUp} custom={0}><Headphones className="h-10 w-10 text-primary mx-auto mb-4" /></motion.div>
            <motion.h2 variants={fadeInUp} custom={1} className="text-2xl sm:text-3xl font-bold mb-3">Still have questions?</motion.h2>
            <motion.p variants={fadeInUp} custom={2} className="text-muted-foreground mb-8">Call us directly or message on WhatsApp — we are always here for you!</motion.p>
            <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <a href="tel:+8801234567890">
                <Button size="lg" className="rounded-full px-8 gap-2"><Phone className="h-4 w-4" />Call Us</Button>
              </a>
              <a href="https://wa.me/8801234567890" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2"><MessageCircle className="h-4 w-4" />WhatsApp</Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
