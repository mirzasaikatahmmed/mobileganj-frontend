'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const mockWarranties = [
  { id: '1', name: '1 Year Official Warranty', months: 12 },
  { id: '2', name: '6 Months Warranty', months: 6 },
  { id: '3', name: '3 Months Warranty', months: 3 },
  { id: '4', name: 'No Warranty', months: 0 },
];

export default function WarrantySettings() {
  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Warranty Settings</h3>
      
      <div>
        <Label>Warranty Template</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select warranty" />
          </SelectTrigger>
          <SelectContent>
            {mockWarranties.map(warranty => (
              <SelectItem key={warranty.id} value={warranty.id}>
                {warranty.name} ({warranty.months} months)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Or enter custom warranty below
        </p>
      </div>

      <div>
        <Label>Custom Warranty (Months)</Label>
        <Input type="number" placeholder="e.g., 12" />
      </div>

      <div>
        <Label>Warranty Note</Label>
        <Textarea 
          placeholder="e.g., 1 Year Official Warranty from Manufacturer" 
          rows={3}
        />
      </div>
    </div>
  );
}
