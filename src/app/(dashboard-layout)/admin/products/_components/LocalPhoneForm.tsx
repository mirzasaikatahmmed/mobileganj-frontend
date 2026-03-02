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
  { id: '3', name: 'Google' },
];

const mockConditions = [
  { value: 'brand_new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
  { value: 'like_new', label: 'Like New' },
];

export default function LocalPhoneForm() {
  return (
    <div className="space-y-6">
      {/* Local Seller Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Local Seller Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Seller Full Name *</Label>
            <Input placeholder="Enter full name" required />
          </div>
          <div>
            <Label>Father's Name</Label>
            <Input placeholder="Enter father's name" />
          </div>
          <div>
            <Label>Mother's Name</Label>
            <Input placeholder="Enter mother's name" />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input placeholder="Enter mobile number" required />
          </div>
          <div className="col-span-2">
            <Label>Full Address *</Label>
            <Textarea placeholder="Enter complete address" rows={2} required />
          </div>
          <div>
            <Label>NID Number *</Label>
            <Input placeholder="Enter NID number" required />
          </div>
          <div>
            <Label>NID Front Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div>
            <Label>NID Back Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div>
            <Label>Seller Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
        </div>
      </div>

      {/* Phone Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Phone Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Title *</Label>
            <Input placeholder="e.g., iPhone 14 Pro" required />
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
            <Label>Storage</Label>
            <Input placeholder="e.g., 128GB" />
          </div>
          <div>
            <Label>RAM</Label>
            <Input placeholder="e.g., 6GB" />
          </div>
          <div>
            <Label>Color</Label>
            <Input placeholder="e.g., Black" />
          </div>
          <div>
            <Label>Stock Qty</Label>
            <Input type="number" defaultValue="1" />
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
            <Input type="number" placeholder="e.g., 3" />
          </div>
          <div className="col-span-2">
            <Label>Custom Warranty Text</Label>
            <Input placeholder="e.g., 3 Months Warranty" />
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
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">Save Product</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
