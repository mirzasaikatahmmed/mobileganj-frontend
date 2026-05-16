'use client';
 
import { useState } from 'react';
import { ArrowLeft, Save, Upload, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
 
export default function NewInvestorPage() {
  const [investorSign, setInvestorSign] = useState<string>('');
  const [ownerSign, setOwnerSign] = useState<string>('');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/investment">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Investor</h1>
          <p className="text-muted-foreground">Register new investor</p>
        </div>
      </div>
 
      <div className="card-base p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Investor Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Investor Name *</Label>
              <Input placeholder="Enter name" required />
            </div>
            <div>
              <Label>Phone Number *</Label>
              <Input placeholder="Enter phone" required />
            </div>
            <div className="col-span-2">
              <Label>Address</Label>
              <Input placeholder="Enter address" />
            </div>
          </div>
        </div>
 
        <div>
          <h3 className="font-semibold text-lg mb-4">Investment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Investment Amount (৳) *</Label>
              <Input type="number" placeholder="0" required />
            </div>
            <div>
              <Label>Investment Date *</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
            </div>
            <div className="col-span-2">
              <Label>Investment Type *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Profit</SelectItem>
                  <SelectItem value="share">Profit Share (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Monthly Profit / Percentage *</Label>
              <Input type="number" placeholder="Amount or %" required />
            </div>
            <div>
              <Label>Total Installments *</Label>
              <Input type="number" placeholder="12" required />
            </div>
          </div>
        </div>
 
        <div>
          <h3 className="font-semibold text-lg mb-4">Agreement</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Investor Signature */}
            <div className="space-y-2">
              <Label>Investor Signature</Label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => setInvestorSign(e.target.files?.[0]?.name || '')}
                />
                <div className="flex items-center gap-3 px-4 h-11 rounded-lg border border-input bg-card group-hover:bg-accent group-hover:border-primary/50 transition-all duration-200">
                  {investorSign ? (
                    <FileText className="w-4 h-4 text-primary" />
                  ) : (
                    <Upload className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm truncate ${investorSign ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {investorSign || 'Upload Signature'}
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Signature */}
            <div className="space-y-2">
              <Label>Owner Signature</Label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => setOwnerSign(e.target.files?.[0]?.name || '')}
                />
                <div className="flex items-center gap-3 px-4 h-11 rounded-lg border border-input bg-card group-hover:bg-accent group-hover:border-primary/50 transition-all duration-200">
                  {ownerSign ? (
                    <FileText className="w-4 h-4 text-primary" />
                  ) : (
                    <Upload className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm truncate ${ownerSign ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {ownerSign || 'Upload Signature'}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-2 pt-2">
              <Label>Note</Label>
              <Textarea placeholder="Additional notes..." rows={3} />
            </div>
          </div>
        </div>
 
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Investor
          </Button>
          <Link href="/admin/investment">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
