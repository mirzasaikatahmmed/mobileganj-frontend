"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/hooks/use-cart";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Wallet, Building2, CheckCircle2, ShieldCheck,
  Truck, RotateCcw, User, Phone, Mail, MapPin, Building,
  StickyNote, ChevronRight, Lock, ArrowLeft, Heart, Tag,
} from "lucide-react";
import Image from "next/image";

function getConditionBadge(condition: string) {
  const map: Record<string, { label: string; className: string }> = {
    "Brand New": { label: "Brand New", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
    "Like New": { label: "Like New", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
    Used: { label: "Used", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  };
  return map[condition] || { label: condition, className: "bg-muted text-muted-foreground" };
}

function CheckoutSteps() {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
      <div className="flex items-center justify-center gap-0 max-w-md mx-auto">
        {[
          { step: 1, label: "Cart", done: true },
          { step: 2, label: "Checkout", done: false, active: true },
          { step: 3, label: "Confirmation", done: false },
        ].map((s, i) => (
          <div key={s.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${s.done ? "bg-primary border-primary text-primary-foreground" : s.active ? "border-primary text-primary bg-primary/10" : "border-muted-foreground/30 text-muted-foreground bg-muted"}`}>
                {s.done ? <CheckCircle2 className="h-5 w-5" /> : s.step}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${s.done || s.active ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
            </div>
            {i < 2 && <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full ${s.done ? "bg-primary" : "bg-muted-foreground/20"}`} />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "", city: "", notes: "" });
  const [isRedirecting, setIsRedirecting] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const totalSaved = useMemo(() => items.reduce((acc, item) => item.offerPrice ? acc + (item.price - item.offerPrice) * item.quantity : acc, 0), [items]);
  const deliveryCharge = totalPrice >= 5000 ? 0 : 80;
  const grandTotal = totalPrice + deliveryCharge;

  useEffect(() => {
    if (items.length === 0 && !isRedirecting) {
      setIsRedirecting(true);
      router.push("/cart");
    }
  }, [items.length, isRedirecting, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Order placed successfully! We will contact you shortly.");
    clearCart();
    router.push("/");
  };

  const paymentMethods = [
    { id: "cod", label: "Cash on Delivery", icon: Wallet, description: "Pay when you receive your order", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    { id: "bkash", label: "bKash", icon: CreditCard, description: "Pay via bKash mobile wallet", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
    { id: "nagad", label: "Nagad", icon: CreditCard, description: "Pay via Nagad mobile wallet", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
    { id: "bank", label: "Bank Transfer", icon: Building2, description: "Direct bank transfer", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Complete Your Order</h1>
          <p className="text-muted-foreground mt-1 text-sm">Enter your details and select a payment method</p>
        </div>
        <Link href="/cart" className="self-start flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <CheckoutSteps />

      {totalSaved > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl px-4 py-3">
          <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
            <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">You are saving ৳{totalSaved.toLocaleString()} on this order!</p>
            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Products at offer price in this order</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 space-y-5">
            {/* Customer Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="font-bold text-lg">Personal Information</h2>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-11 rounded-lg" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="h-11 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        Email <span className="text-muted-foreground text-xs">(Optional)</span>
                      </Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-11 rounded-lg" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="flex items-center gap-1.5 text-sm font-medium">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      Delivery Address <span className="text-destructive">*</span>
                    </Label>
                    <Textarea id="address" placeholder="House/Flat number, Road, Area..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required rows={3} className="resize-none rounded-lg" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="flex items-center gap-1.5 text-sm font-medium">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input id="city" placeholder="e.g. Dhaka, Chittagong, Sylhet" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="h-11 rounded-lg" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes" className="flex items-center gap-1.5 text-sm font-medium">
                      <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
                      Order Notes <span className="text-muted-foreground text-xs">(Optional)</span>
                    </Label>
                    <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={2} className="resize-none rounded-lg" placeholder="Any special delivery instructions..." />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="font-bold text-lg">Payment Method</h2>
                  </div>
                </div>
                <CardContent className="p-5">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {paymentMethods.map((method) => {
                        const isSelected = paymentMethod === method.id;
                        return (
                          <motion.div key={method.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className={`relative flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${isSelected ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" : "border-border/60 hover:border-primary/40 hover:shadow-sm"}`}
                            onClick={() => setPaymentMethod(method.id)}>
                            {isSelected && (
                              <motion.div layoutId="payment-check" className="absolute -top-1.5 -right-1.5">
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                                </div>
                              </motion.div>
                            )}
                            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${method.bg}`}>
                              <method.icon className={`h-5 w-5 ${method.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Label htmlFor={method.id} className="cursor-pointer font-semibold text-sm">{method.label}</Label>
                              <p className="text-xs text-muted-foreground leading-tight mt-0.5">{method.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5">
                    <Lock className="h-3.5 w-3.5 shrink-0" />
                    <span>Your payment information is completely secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mobile Submit */}
            <div className="lg:hidden">
              <Button type="submit" size="lg" className="w-full h-13 text-base font-semibold gap-2 rounded-xl shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />Processing...</>
                ) : (
                  <><Lock className="h-4 w-4" />Confirm Order — ৳{grandTotal.toLocaleString()}</>
                )}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="rounded-2xl border-border/60 overflow-hidden">
                  <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-lg">Order Summary</h2>
                      <Badge variant="secondary" className="text-xs font-medium">{totalItems} items</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      <AnimatePresence>
                        {items.map((item, index) => {
                          const badge = getConditionBadge(item.condition);
                          return (
                            <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="flex gap-3 p-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                              <div className="relative w-16 h-16 shrink-0 bg-background rounded-lg overflow-hidden border">
                                <Image src={item.images[0] || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                                {item.offerPrice && (
                                  <div className="absolute top-0.5 left-0.5">
                                    <Badge className="bg-red-500 text-white text-[8px] px-1 py-0 rounded">
                                      {Math.round(((item.price - item.offerPrice) / item.price) * 100)}%
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate leading-tight">{item.name}</p>
                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">x{item.quantity}</span>
                                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 font-medium ${badge.className}`}>{badge.label}</Badge>
                                </div>
                                <p className="text-sm font-bold mt-1 text-primary tabular-nums">৳{((item.offerPrice || item.price) * item.quantity).toLocaleString()}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    <Separator />

                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                        <span className="font-medium tabular-nums">৳{(totalPrice + totalSaved).toLocaleString()}</span>
                      </div>
                      {totalSaved > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-600 dark:text-emerald-400">Discount</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium tabular-nums">-৳{totalSaved.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Charge</span>
                        <span className={`font-medium ${deliveryCharge === 0 ? "text-emerald-600 dark:text-emerald-400" : "tabular-nums"}`}>
                          {deliveryCharge === 0 ? "Free" : `৳${deliveryCharge}`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-base">Grand Total</p>
                        <p className="text-[11px] text-muted-foreground">(VAT included)</p>
                      </div>
                      <p className="text-2xl font-bold text-primary tabular-nums">৳{grandTotal.toLocaleString()}</p>
                    </div>

                    <div className="bg-primary/5 rounded-lg px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Or EMI from <span className="font-semibold text-primary">৳{Math.round(grandTotal / 12).toLocaleString()}</span>/month
                      </p>
                    </div>

                    <div className="hidden lg:block pt-1">
                      <Button type="submit" size="lg" className="w-full rounded-xl gap-2 text-base font-semibold py-6 shadow-lg hover:shadow-xl transition-shadow" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />Processing...</>
                        ) : (
                          <><Lock className="h-4 w-4" />Confirm Order</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Card className="rounded-2xl border-border/60">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Truck, title: "Free Delivery", desc: "On orders ৳5,000+", color: "text-blue-500" },
                      { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected", color: "text-emerald-500" },
                      { icon: RotateCcw, title: "Easy Return", desc: "Within 7 days", color: "text-orange-500" },
                      { icon: Heart, title: "Original Products", desc: "100% guaranteed", color: "text-rose-500" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-2.5 p-2">
                        <item.icon className={`h-4 w-4 ${item.color} shrink-0 mt-0.5`} />
                        <div>
                          <p className="text-xs font-semibold leading-tight">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-[11px] text-muted-foreground">bKash · Nagad · Rocket · Card · Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
