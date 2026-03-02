'use client';

import { useState } from 'react';
import { Search, CheckCircle, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockDelivered = [
  { id: 'SHP-003', supplier: 'China Mobile Mart', items: 30, value: 1500000, deliveredDate: '2024-01-28' },
];

export default function DeliveredPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Delivered Shipments</h1>
        <p className="text-muted-foreground text-sm sm:text-base">View completed shipments</p>
      </div>

      <div className="bg-card border rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Delivered</p>
            <p className="text-xl sm:text-2xl font-bold">{mockDelivered.length}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search shipments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Shipment ID</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Supplier</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Items</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Value</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Delivered Date</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDelivered.map((shipment) => (
                <tr key={shipment.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 sm:p-4">
                    <p className="font-mono font-medium text-sm">{shipment.id}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-medium text-sm">{shipment.supplier}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm">{shipment.items} items</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-semibold text-sm">৳{shipment.value.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {shipment.deliveredDate}
                    </p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <Badge variant="default" className="text-xs bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Delivered
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
