'use client';

import { ArrowLeft, Save, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewExpensePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Link href="/admin/expense">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Add Expense</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Record new expense</p>
        </div>
      </div>

      <form className="bg-card border rounded-lg p-4 sm:p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Expense Details</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expense Date *</Label>
            <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select id="category" name="category" title="Select expense category" className="w-full h-12 px-4 rounded-md border bg-background" required>
              <option value="">Select category</option>
              <option value="rent">Shop Rent</option>
              <option value="salary">Staff Salary</option>
              <option value="electricity">Electricity Bill</option>
              <option value="internet">Internet / WiFi</option>
              <option value="transport">Transport</option>
              <option value="maintenance">Shop Maintenance</option>
              <option value="marketing">Marketing / Ads</option>
              <option value="packaging">Packaging</option>
              <option value="misc">Miscellaneous</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Expense Type *</Label>
            <select id="type" name="type" title="Select expense type" className="w-full h-12 px-4 rounded-md border bg-background" required>
              <option value="">Select type</option>
              <option value="fixed">Fixed</option>
              <option value="unfixed">Unfixed</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Amount (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method *</Label>
          <select id="payment-method" name="payment-method" title="Select payment method" className="w-full h-12 px-4 rounded-md border bg-background" required>
            <option value="">Select method</option>
            <option value="cash">Cash</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Note</Label>
          <Textarea placeholder="Additional notes..." rows={3} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button type="submit" size="lg" className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Expense
          </Button>
          <Link href="/admin/expense" className="flex-1">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
