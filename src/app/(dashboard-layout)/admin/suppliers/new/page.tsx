"use client";

import { useState } from "react";
import { ArrowLeft, Save, Truck, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewSupplierPage() {
  const [type, setType] = useState<"supplier" | "shop">("supplier");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    bankName: "",
    accountNumber: "",
    notes: "",
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/suppliers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {type === "supplier" ? "Add New Supplier" : "Add New Shop"}
          </h1>
          <p className="text-muted-foreground">
            {type === "supplier" ? "Create supplier profile" : "Create shop profile"}
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>

          <div className="space-y-3">
            <Label>Type *</Label>
            <RadioGroup
              value={type}
              onValueChange={(val) => setType(val as "supplier" | "shop")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="supplier" id="type-supplier" />
                <Label htmlFor="type-supplier" className="cursor-pointer">Supplier</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shop" id="type-shop" />
                <Label htmlFor="type-shop" className="cursor-pointer">Shop</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{type === "supplier" ? "Company Name *" : "Shop Name *"}</Label>
              <Input 
                placeholder={`Enter ${type === "supplier" ? "supplier" : "shop"} name`} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input placeholder="01XXXXXXXXX" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder={`${type === "supplier" ? "supplier" : "shop"}@example.com`} 
            />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Address</h2>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea placeholder="House, Road, Area" rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea placeholder="Additional information..." rows={3} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg">
            <Save className="w-4 h-4 mr-2" />
            {type === "supplier" ? "Save Supplier" : "Save Shop"}
          </Button>
          <Link href="/admin/suppliers">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
