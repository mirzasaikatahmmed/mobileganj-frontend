'use client';

import { useState } from 'react';
import { Search, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockLedger = [
  { id: '1', date: '2024-01-15', description: 'Purchase - PUR-001234', debit: 450000, credit: 0, balance: 450000 },
  { id: '2', date: '2024-01-18', description: 'Payment Received', debit: 0, credit: 300000, balance: 150000 },
  { id: '3', date: '2024-01-25', description: 'Purchase - PUR-001235', debit: 285000, credit: 0, balance: 435000 },
  { id: '4', date: '2024-01-28', description: 'Payment Received', debit: 0, credit: 200000, balance: 235000 },
];

export default function SupplierLedgerPage() {
  const [selectedSupplier, setSelectedSupplier] = useState('Tech Supplies Ltd');

  const totalDebit = mockLedger.reduce((sum, l) => sum + l.debit, 0);
  const totalCredit = mockLedger.reduce((sum, l) => sum + l.credit, 0);
  const balance = totalDebit - totalCredit;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supplier Ledger</h1>
        <p className="text-muted-foreground">View supplier account statement</p>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Select Supplier</Label>
            <select 
              className="w-full h-12 px-4 rounded-md border bg-background"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
            >
              <option value="Tech Supplies Ltd">Tech Supplies Ltd</option>
              <option value="Mobile World">Mobile World</option>
              <option value="Gadget Hub">Gadget Hub</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex gap-2">
              <Input type="date" />
              <Input type="date" />
            </div>
          </div>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Debit</p>
              <p className="text-2xl font-bold text-red-600">৳{totalDebit.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Credit</p>
              <p className="text-2xl font-bold text-green-600">৳{totalCredit.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-2xl font-bold text-orange-600">৳{balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-left p-4 font-semibold">Debit</th>
              <th className="text-left p-4 font-semibold">Credit</th>
              <th className="text-left p-4 font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {mockLedger.map((entry) => (
              <tr key={entry.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-medium">{entry.description}</p>
                </td>
                <td className="p-4">
                  <p className="text-red-600 font-semibold">
                    {entry.debit > 0 ? `৳${entry.debit.toLocaleString()}` : '-'}
                  </p>
                </td>
                <td className="p-4">
                  <p className="text-green-600 font-semibold">
                    {entry.credit > 0 ? `৳${entry.credit.toLocaleString()}` : '-'}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-bold">৳{entry.balance.toLocaleString()}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
