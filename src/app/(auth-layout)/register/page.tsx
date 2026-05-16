"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUser } from "@/hooks/use-auth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const register = useRegisterUser();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone || !/^01[3-9]\d{8}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return !Object.keys(e).length;
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const { confirmPassword, ...payload } = form;
      register.mutate(payload);
    }
  };
 
  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
 
  const strength = passwordStrength();
  const strengthColor = strength <= 2 ? "bg-red-500" : strength <= 3 ? "bg-yellow-500" : "bg-green-500";
  const strengthText = strength <= 2 ? "Weak" : strength <= 3 ? "Medium" : "Strong";
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join MobileGanj today</p>
      </div>
 
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder="Your full name" className="pl-10 h-11"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phone" type="tel" placeholder="01XXXXXXXXX" className="pl-10 h-11"
              value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-muted-foreground font-normal">(Optional)</span></Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="email@example.com" className="pl-10 h-11"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="At least 6 characters"
              className="pl-10 pr-10 h-11" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : "bg-muted"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Strength: {strengthText}</p>
            </div>
          )}
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
 
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="confirmPassword" type="password" placeholder="Confirm your password"
              className="pl-10 h-11" value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          </div>
          {form.confirmPassword && form.password === form.confirmPassword && (
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Passwords match
            </p>
          )}
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>
 
        <Button type="submit" className="w-full h-11" disabled={register.isPending}>
          {register.isPending ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>Create Account <ArrowRight className="h-4 w-4 ml-1" /></>
          )}
        </Button>
      </form>
 
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">Login</Link>
      </p>
    </motion.div>
  );
}
