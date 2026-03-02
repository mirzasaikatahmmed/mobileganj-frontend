'use client';

import { useState } from 'react';
import { Search, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockPayments = [
  { id: 'SHP-001', supplier: 'Dubai Tech Hub', totalAmount: 1250000, paidAmount: 800000, dueAmount: 450000, status: 'Partial' },
  { id: 'SHP-002', supplier: 'Singapore Mobile', totalAmount: 850000, paidAmount: 0, dueAmount: 850000, status: 'Pending' },
];

export default function PaymentStatusPage() {
  const [search, setSearch] = useState('');

  const totalDue = mockPayments.reduce((sum, p) => sum + p.dueAmount, 0);

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Payment Status</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Track supplier payments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
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
              <p className="text-xs sm:text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-xl sm:text-2xl font-bold">{mockPayments.length}</p>
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
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Total Amount</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Paid</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Due</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Status</th>
                <th className="text-right p-3 sm:p-4 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 sm:p-4">
                    <p className="font-mono font-medium text-sm">{payment.id}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-medium text-sm">{payment.supplier}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-semibold text-sm">৳{payment.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-green-600 font-medium text-sm">৳{payment.paidAmount.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-red-600 font-bold text-sm">৳{payment.dueAmount.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <Badge variant={payment.status === 'Pending' ? 'destructive' : 'secondary'} className="text-xs">
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex justify-end">
                      <Button size="sm">Pay</Button>
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
