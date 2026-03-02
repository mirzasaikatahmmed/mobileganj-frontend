'use client';

import { useState } from 'react';
import { ArrowLeft, Save, User, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewCustomerPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    type: 'Regular',
    nid: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating customer:', formData);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Customer</h1>
          <p className="text-muted-foreground">Create customer profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter customer name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Customer Type</Label>
              <select
                id="type"
                className="w-full h-12 px-4 rounded-md border bg-background"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nid">NID Number</Label>
            <Input
              id="nid"
              placeholder="National ID number"
              value={formData.nid}
              onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Address Information</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Textarea
              id="address"
              placeholder="House, Road, Area"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Dhaka, Chittagong, etc."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Additional Notes</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Customer
          </Button>
          <Link href="/admin/customers">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
