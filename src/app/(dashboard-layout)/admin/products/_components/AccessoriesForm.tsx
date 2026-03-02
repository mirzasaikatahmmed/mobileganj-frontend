'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Anker' },
  { id: '4', name: 'Baseus' },
];

const mockAccessoryTypes = [
  { value: 'charger', label: 'Charger' },
  { value: 'earphone', label: 'Earphone' },
  { value: 'cover', label: 'Cover' },
  { value: 'glass', label: 'Glass' },
  { value: 'power_bank', label: 'Power Bank' },
];

const mockConditions = [
  { value: 'brand_new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
  { value: 'like_new', label: 'Like New' },
];

const mockUnits = [
  { value: 'piece', label: 'Piece' },
  { value: 'box', label: 'Box' },
  { value: 'set', label: 'Set' },
  { value: 'pair', label: 'Pair' },
];

export default function AccessoriesForm() {
  return (
    <div className="space-y-6">
      {/* Accessories Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Accessories Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Name *</Label>
            <Input placeholder="e.g., AirPods Pro 2" required />
          </div>
          <div>
            <Label>Accessory Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {mockAccessoryTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brand</Label>
            <Select>
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
            <Label>Color</Label>
            <Input placeholder="e.g., White" />
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
            <Label>Unit Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {mockUnits.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Stock Qty *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Low Stock Alert Qty</Label>
            <Input type="number" placeholder="5" />
          </div>
          <div>
            <Label>Warranty (Months)</Label>
            <Input type="number" placeholder="e.g., 6" />
          </div>
          <div className="col-span-2">
            <Label>Custom Warranty Text</Label>
            <Input placeholder="e.g., 6 Months Warranty" />
          </div>
          <div className="col-span-2">
            <Label>Product Image</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
      </div>

      {/* Optional Supplier */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Supplier (Optional)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Supplier Name</Label>
            <Input placeholder="Enter supplier name" />
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
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">Save Product</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
