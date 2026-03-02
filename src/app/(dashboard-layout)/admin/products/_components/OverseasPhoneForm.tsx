'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Google' },
];

const mockRegions = [
  { value: 'usa', label: 'USA' },
  { value: 'japan', label: 'Japan' },
  { value: 'australia', label: 'Australia' },
  { value: 'uk', label: 'UK' },
  { value: 'european', label: 'European' },
  { value: 'other', label: 'Other' },
];

const mockConditions = [
  { value: 'brand_new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
  { value: 'like_new', label: 'Like New' },
];

export default function OverseasPhoneForm() {
  return (
    <div className="space-y-6">
      {/* Supplier Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Supplier Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Supplier Name *</Label>
            <Input placeholder="Enter supplier name" required />
          </div>
          <div>
            <Label>Supplier Phone</Label>
            <Input placeholder="Enter phone number" />
          </div>
          <div className="col-span-2">
            <Label>Invoice / Reference No</Label>
            <Input placeholder="Enter invoice number" />
          </div>
        </div>
      </div>

      {/* Phone Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Phone Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Title *</Label>
            <Input placeholder="e.g., iPhone 15 Pro Max" required />
          </div>
          <div>
            <Label>Brand *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {mockBrands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Region *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {mockRegions.map(region => (
                  <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Condition *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {mockConditions.map(condition => (
                  <SelectItem key={condition.value} value={condition.value}>{condition.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Stock Qty</Label>
            <Input type="number" defaultValue="1" />
          </div>
          <div>
            <Label>Storage</Label>
            <Input placeholder="e.g., 256GB" />
          </div>
          <div>
            <Label>RAM</Label>
            <Input placeholder="e.g., 8GB" />
          </div>
          <div>
            <Label>Color</Label>
            <Input placeholder="e.g., Blue Titanium" />
          </div>
          <div>
            <Label>Low Stock Alert</Label>
            <Input type="number" placeholder="e.g., 5" />
          </div>
          <div>
            <Label>IMEI 1 *</Label>
            <Input placeholder="Enter IMEI 1" required />
          </div>
          <div>
            <Label>IMEI 2</Label>
            <Input placeholder="Enter IMEI 2" />
          </div>
          <div>
            <Label>Purchase Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Selling Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Offer Price (৳)</Label>
            <Input type="number" placeholder="0" />
          </div>
          <div>
            <Label>Warranty (Months)</Label>
            <Input type="number" placeholder="e.g., 12" />
          </div>
          <div className="col-span-2">
            <Label>Custom Warranty Text</Label>
            <Input placeholder="e.g., 1 Year Official Warranty" />
          </div>
          <div className="col-span-2">
            <Label>Phone Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
      </div>

      {/* Marketing Flags */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Marketing Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" />
            <label htmlFor="featured" className="text-sm cursor-pointer">Featured Product</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newArrival" />
            <label htmlFor="newArrival" className="text-sm cursor-pointer">New Arrival</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="trending" />
            <label htmlFor="trending" className="text-sm cursor-pointer">Trending</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="preOrder" />
            <label htmlFor="preOrder" className="text-sm cursor-pointer">Pre-Order</label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">Save Product</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
