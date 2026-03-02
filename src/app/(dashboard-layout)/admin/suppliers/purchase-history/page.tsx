'use client';

import { useState } from 'react';
import { Search, Calendar, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockPurchases = [
  { id: '1', purchaseNo: 'PUR-001234', supplierName: 'Tech Supplies Ltd', date: '2024-01-15', totalAmount: 450000, paidAmount: 300000, status: 'Partial' },
  { id: '2', purchaseNo: 'PUR-001235', supplierName: 'Mobile World', date: '2024-01-20', totalAmount: 325000, paidAmount: 325000, status: 'Paid' },
  { id: '3', purchaseNo: 'PUR-001236', supplierName: 'Gadget Hub', date: '2024-01-25', totalAmount: 285000, paidAmount: 200000, status: 'Partial' },
];

export default function PurchaseHistoryPage() {
  const [search, setSearch] = useState('');

  const filtered = mockPurchases.filter(p => 
    p.purchaseNo.includes(search) || 
    p.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Purchase History</h1>
        <p className="text-muted-foreground">View all supplier purchases</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by purchase no or supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Purchase No</th>
              <th className="text-left p-4 font-semibold">Supplier</th>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Total Amount</th>
              <th className="text-left p-4 font-semibold">Paid Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((purchase) => (
              <tr key={purchase.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <p className="font-mono font-medium">{purchase.purchaseNo}</p>
                </td>
                <td className="p-4">
                  <p className="font-medium">{purchase.supplierName}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {purchase.date}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">৳{purchase.totalAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <p className="text-green-600 font-medium">৳{purchase.paidAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <Badge variant={purchase.status === 'Paid' ? 'default' : 'secondary'}>
                    {purchase.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
