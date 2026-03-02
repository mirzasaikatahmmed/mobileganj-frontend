'use client';

import { AlertTriangle, Save, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AddDamageProductPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-destructive" />
          Add Damage Product
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Report damaged or defective products
        </p>
      </div>

      {/* Form */}
      <form className="bg-card border rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h2 className="font-semibold text-lg">Damage Report Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Damage Date *</Label>
            <Input 
              id="date"
              type="date" 
              defaultValue={new Date().toISOString().split('T')[0]} 
              className="mt-1.5"
              required 
            />
          </div>
          <div>
            <Label htmlFor="branch">Branch *</Label>
            <select id="branch" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5" required>
              <option value="">Select branch...</option>
              <option value="main">Main Branch</option>
              <option value="branch1">Branch 1</option>
              <option value="branch2">Branch 2</option>
              <option value="godown">Godown</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="product">Select Product *</Label>
          <select id="product" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5" required>
            <option value="">Choose product...</option>
            <option value="1">iPhone 15 Pro Max - 256GB Black</option>
            <option value="2">Samsung Galaxy S24 Ultra - 512GB Gray</option>
            <option value="3">AirPods Pro 2 - White</option>
            <option value="4">MacBook Pro M3 - 16GB</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Damage Quantity *</Label>
            <Input 
              id="quantity"
              type="number" 
              placeholder="0" 
              min="1"
              className="mt-1.5"
              required 
            />
          </div>
          <div>
            <Label htmlFor="value">Estimated Loss Value (৳)</Label>
            <Input 
              id="value"
              type="number" 
              placeholder="0" 
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="damage-type">Damage Type *</Label>
          <select id="damage-type" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5" required>
            <option value="">Select type...</option>
            <option value="physical">Physical Damage</option>
            <option value="water">Water Damage</option>
            <option value="screen">Screen Damage</option>
            <option value="battery">Battery Issue</option>
            <option value="software">Software Issue</option>
            <option value="manufacturing">Manufacturing Defect</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="reason">Damage Reason/Description *</Label>
          <Textarea 
            id="reason"
            placeholder="Describe the damage in detail..." 
            rows={4} 
            className="mt-1.5"
            required 
          />
        </div>

        <div>
          <Label htmlFor="responsible">Responsible Person (if any)</Label>
          <Input 
            id="responsible"
            placeholder="Name of person responsible" 
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="action">Action Taken</Label>
          <select id="action" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
            <option value="">Select action...</option>
            <option value="repair">Sent for Repair</option>
            <option value="return">Return to Supplier</option>
            <option value="dispose">Dispose</option>
            <option value="warranty">Warranty Claim</option>
            <option value="pending">Pending Decision</option>
          </select>
        </div>

        <div>
          <Label htmlFor="note">Additional Notes</Label>
          <Textarea 
            id="note"
            placeholder="Any additional information..." 
            rows={3} 
            className="mt-1.5"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button type="submit" size="lg" className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Damage Report
          </Button>
          <Link href="/admin/inventory/all-damage" className="flex-1">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-orange-900 dark:text-orange-100">Important Note</p>
            <p className="text-orange-700 dark:text-orange-300 mt-1">
              Damaged products will be automatically deducted from your inventory. Make sure to provide accurate information for proper record keeping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
