'use client';

import { useState } from 'react';
import { Search, Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockShipments = [
  { id: 'SHP-001', supplier: 'Dubai Tech Hub', origin: 'Dubai, UAE', items: 25, value: 1250000, status: 'In Transit', eta: '2024-02-05' },
  { id: 'SHP-002', supplier: 'Singapore Mobile', origin: 'Singapore', items: 15, value: 850000, status: 'In Transit', eta: '2024-02-08' },
];

export default function InTransitPage() {
  const [search, setSearch] = useState('');

  const filtered = mockShipments.filter(s => 
    s.id.includes(search) || 
    s.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">In Transit Shipments</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Track shipments on the way</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">In Transit</p>
              <p className="text-xl sm:text-2xl font-bold">{mockShipments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Items</p>
              <p className="text-xl sm:text-2xl font-bold">{mockShipments.reduce((sum, s) => sum + s.items, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by shipment ID or supplier..."
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
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Origin</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Items</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Value</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">ETA</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((shipment) => (
                <tr key={shipment.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 sm:p-4">
                    <p className="font-mono font-medium text-sm">{shipment.id}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-medium text-sm">{shipment.supplier}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shipment.origin}
                    </p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm">{shipment.items} items</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-semibold text-sm">৳{shipment.value.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm">{shipment.eta}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <Badge variant="default" className="text-xs">
                      <Plane className="w-3 h-3 mr-1" />
                      {shipment.status}
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
