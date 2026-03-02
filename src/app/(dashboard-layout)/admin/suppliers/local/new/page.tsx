'use client';

import { ArrowLeft, Save, User, MapPin, CreditCard, Upload } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewLocalSellerPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/suppliers/local">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Local Seller</h1>
          <p className="text-muted-foreground">Register local phone seller with KYC</p>
        </div>
      </div>

      <form className="space-y-6">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input placeholder="Enter full name" required />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input placeholder="01XXXXXXXXX" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Father's Name</Label>
              <Input placeholder="Father's name" />
            </div>
            <div className="space-y-2">
              <Label>Mother's Name</Label>
              <Input placeholder="Mother's name" />
            </div>
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
            <Label>Full Address *</Label>
            <Textarea placeholder="House, Road, Area, City" rows={3} required />
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">KYC Information</h2>
          </div>

          <div className="space-y-2">
            <Label>NID Number *</Label>
            <Input placeholder="National ID number" required />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>NID Front Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload Front</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>NID Back Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload Back</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Seller Photo</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload Photo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Local Seller
          </Button>
          <Link href="/admin/suppliers/local">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
