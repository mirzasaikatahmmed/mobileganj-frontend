"use client";

import { CreditCard, CheckCircle, Clock, Shield, Calculator, ArrowRight, Banknote, Percent, Building2, Phone, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

export default function EMIPage() {
  const [price, setPrice] = useState(80000);
  const [duration, setDuration] = useState(6);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  const downPayment = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = price - downPayment;
  const monthly = Math.ceil(loanAmount / duration);

  const banks = [
    { name: "BRAC Bank", color: "bg-red-500" },
    { name: "City Bank", color: "bg-blue-600" },
    { name: "Eastern Bank", color: "bg-green-600" },
    { name: "DBBL", color: "bg-emerald-600" },
    { name: "Islami Bank", color: "bg-teal-600" },
    { name: "Standard Chartered", color: "bg-sky-700" },
    { name: "HSBC", color: "bg-red-600" },
    { name: "Prime Bank", color: "bg-indigo-600" },
    { name: "Mutual Trust Bank", color: "bg-violet-600" },
    { name: "AB Bank", color: "bg-orange-600" },
    { name: "UCB", color: "bg-cyan-600" },
    { name: "Southeast Bank", color: "bg-amber-600" },
  ];

  const features = [
    { icon: CreditCard, title: "Simple Process", desc: "Select EMI at checkout, choose your bank. No hassle.", gradient: "from-blue-500 to-cyan-500" },
    { icon: CheckCircle, title: "Instant Approval", desc: "Get EMI approval in minutes. No lengthy paperwork required.", gradient: "from-emerald-500 to-green-500" },
    { icon: Clock, title: "Flexible Duration", desc: "3, 6, 9, or 12 months — choose the duration that suits you.", gradient: "from-violet-500 to-purple-500" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure payment gateway. Your information is always protected.", gradient: "from-amber-500 to-orange-500" },
  ];

  const steps = [
    { num: "1", text: "Choose your preferred phone" },
    { num: "2", text: "Select \"EMI\" at checkout" },
    { num: "3", text: "Choose bank and duration" },
    { num: "4", text: "Pay down payment, rest in installments!" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-violet-500/5 py-16 md:py-24">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />0% Interest Installment Facility
              </Badge>
            </motion.div>

            <motion.h1 {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get your dream phone now,{" "}
              <span className="bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent">pay in installments</span>
            </motion.h1>

            <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              No hidden charges, no extra fees. Get EMI approval in just a few minutes!
            </motion.p>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="gap-2 px-8 h-12 text-base">
                  <Phone className="h-4 w-4" />Browse Phones<ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#calculator">
                <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base">
                  <Calculator className="h-4 w-4" />Calculate EMI
                </Button>
              </a>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap items-center justify-center gap-8 mt-12 text-center">
              {[
                { value: "0%", label: "Interest Rate" },
                { value: "12+", label: "Partner Banks" },
                { value: "10%", label: "Min Down Payment" },
                { value: "12 Months", label: "Max Duration" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why is our EMI the best?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Simple, fast, and completely secure installment facility</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }} className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-br ${f.gradient} text-white mb-4 shadow-sm`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 px-3 py-1 text-primary border-primary/30">
              <Calculator className="h-3.5 w-3.5 mr-1" />Interactive Calculator
            </Badge>
            <h2 className="text-3xl font-bold mb-3">Calculate EMI</h2>
            <p className="text-muted-foreground">Use the sliders below to find your monthly installment</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 rounded-2xl border border-border/60 bg-card p-6 md:p-8 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Phone Price</label>
                    <span className="text-lg font-bold text-primary">৳{price.toLocaleString()}</span>
                  </div>
                  <Slider value={[price]} onValueChange={(v) => setPrice(v[0])} min={10000} max={300000} step={5000} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>৳10,000</span><span>৳3,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Down Payment ({downPaymentPercent}%)</label>
                    <span className="text-lg font-bold">৳{downPayment.toLocaleString()}</span>
                  </div>
                  <Slider value={[downPaymentPercent]} onValueChange={(v) => setDownPaymentPercent(v[0])} min={10} max={60} step={5} className="mt-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>10%</span><span>60%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Installment Duration</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((d) => (
                      <button key={d} onClick={() => setDuration(d)} className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${duration === d ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40 text-muted-foreground"}`}>
                        {d} months
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border-2 border-primary/20 bg-linear-to-br from-primary/5 to-violet-500/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-6">Your EMI Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Phone Price</span>
                      <span className="font-semibold">৳{price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Down Payment</span>
                      <span className="font-semibold">৳{downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold">৳{loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Interest Rate</span>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800">0%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-semibold">{duration} months</span>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Installment</p>
                    <motion.div key={`${price}-${downPaymentPercent}-${duration}`} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <span className="text-4xl font-bold text-primary">৳{monthly.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </motion.div>
                  </div>
                </div>
                <Link href="/shop" className="mt-8 block">
                  <Button className="w-full gap-2 h-11">Buy on EMI<ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Table */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">EMI Breakdown</h2>
            <p className="text-muted-foreground">Monthly installments for popular phone prices (0% interest)</p>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left text-sm font-semibold py-4 px-6">
                      <div className="flex items-center gap-2"><Banknote className="h-4 w-4 text-primary" />Phone Price</div>
                    </th>
                    <th className="text-center text-sm font-semibold py-4 px-4">3 Months</th>
                    <th className="text-center text-sm font-semibold py-4 px-4">6 Months</th>
                    <th className="text-center text-sm font-semibold py-4 px-4">9 Months</th>
                    <th className="text-center text-sm font-semibold py-4 px-4">12 Months</th>
                  </tr>
                </thead>
                <tbody>
                  {[30000, 50000, 80000, 100000, 150000, 200000].map((p, idx) => {
                    const dp = p * 0.2;
                    const loan = p - dp;
                    return (
                      <tr key={p} className={`border-t border-border/40 transition-colors hover:bg-muted/30 ${idx % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="py-4 px-6 font-semibold">
                          ৳{p.toLocaleString()}
                          <span className="block text-xs text-muted-foreground font-normal mt-0.5">Down: ৳{dp.toLocaleString()}</span>
                        </td>
                        {[3, 6, 9, 12].map((m) => (
                          <td key={m} className="py-4 px-4 text-center text-sm">
                            <span className="font-bold">৳{Math.ceil(loan / m).toLocaleString()}</span>
                            <span className="text-muted-foreground">/mo</span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-muted/30 px-6 py-3 text-xs text-muted-foreground text-center border-t border-border/40">
              * Calculated with 20% down payment. Actual EMI may vary.
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How to get EMI?</h2>
            <p className="text-muted-foreground">Just 4 simple steps</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div key={step.num} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.12 }} className="relative text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground text-xl font-bold mb-4 shadow-md">{step.num}</div>
                  {i < steps.length - 1 && <ChevronRight className="hidden lg:block absolute top-5 -right-3 h-5 w-5 text-muted-foreground/40" />}
                  <p className="text-sm font-medium leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banks */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold">Partner Banks</h2>
            </div>
            <p className="text-muted-foreground">Our EMI partnerships with the country's leading banks</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {banks.map((bank, i) => (
              <motion.div key={bank.name} {...fadeUp} transition={{ duration: 0.3, delay: i * 0.05 }} className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border/60 bg-card hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <div className={`h-8 w-8 shrink-0 rounded-lg ${bank.color} flex items-center justify-center`}>
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium truncate">{bank.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Important Information</h2>
            <div className="space-y-4">
              {[
                { q: "Is a credit card required for EMI?", a: "Yes, you need a credit card from any of the above banks to avail EMI facility." },
                { q: "Are there any extra charges for EMI?", a: "No extra charges from us. However, some banks may charge a processing fee." },
                { q: "What is the minimum product price for EMI?", a: "EMI is available on any product priced ৳10,000 or above." },
                { q: "How much down payment is required?", a: "EMI can be started with a minimum 10% down payment." },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <Percent className="h-4 w-4 text-primary mt-0.5 shrink-0" />{faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get your dream phone on EMI today!</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">0% interest installments up to 12 months. Start shopping now.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop"><Button size="lg" className="gap-2 px-10 h-12 text-base">Start Shopping<ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="gap-2 px-10 h-12 text-base"><Phone className="h-4 w-4" />Contact Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
