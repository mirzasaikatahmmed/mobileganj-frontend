'use client';

import { useState } from 'react';
import { Search, DollarSign, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockDues = [
  { id: 'SRV-002', customer: 'Fatima Rahman', phone: '01812345678', device: 'Samsung S23', total: 8000, paid: 5000, due: 3000 },
  { id: 'SRV-005', customer: 'Kamal Hossain', phone: '01912345678', device: 'iPhone 12', total: 12000, paid: 7000, due: 5000 },
];

export default function ServiceDueCollectionPage() {
  const [search, setSearch] = useState('');

  const filtered = mockDues.filter(d => 
    d.id.includes(search) || 
    d.customer.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  const totalDue = mockDues.reduce((sum, d) => sum + d.due, 0);

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Service Due Collection</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Collect pending service payments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Due</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Pending Jobs</p>
              <p className="text-xl sm:text-2xl font-bold">{mockDues.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by job ID, customer, or phone..."
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
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Job ID</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Customer</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Device</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Total</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Paid</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Due</th>
                <th className="text-right p-3 sm:p-4 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((due) => (
                <tr key={due.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 sm:p-4">
                    <p className="font-mono font-medium text-sm">{due.id}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div>
                      <p className="font-medium text-sm">{due.customer}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {due.phone}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-sm">{due.device}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-semibold text-sm">৳{due.total.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-green-600 font-medium text-sm">৳{due.paid.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-red-600 font-bold text-sm">৳{due.due.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex justify-end">
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Collect
                      </Button>
                    </div>
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
