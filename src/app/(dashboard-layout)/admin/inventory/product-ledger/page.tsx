'use client';

import { BookText, Search, Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductLedgerPage() {
  const ledger = [
    { id: 1, date: '2024-01-20', product: 'iPhone 15 Pro Max', type: 'Sale', quantity: -2, balance: 48, reference: 'INV-1234', branch: 'Main Branch', user: 'Admin' },
    { id: 2, date: '2024-01-19', product: 'iPhone 15 Pro Max', type: 'Purchase', quantity: +10, balance: 50, reference: 'PO-5678', branch: 'Main Branch', user: 'Manager' },
    { id: 3, date: '2024-01-18', product: 'iPhone 15 Pro Max', type: 'Transfer Out', quantity: -5, balance: 40, reference: 'TRF-045', branch: 'Main Branch', user: 'Admin' },
    { id: 4, date: '2024-01-17', product: 'iPhone 15 Pro Max', type: 'Return', quantity: +1, balance: 45, reference: 'RET-789', branch: 'Main Branch', user: 'Staff' },
  ];

  const getTypeStyle = (type: string) => {
    const styles = {
      'Sale': 'bg-red-50 dark:bg-red-950/30 text-red-600',
      'Purchase': 'bg-green-50 dark:bg-green-950/30 text-green-600',
      'Transfer In': 'bg-blue-50 dark:bg-blue-950/30 text-blue-600',
      'Transfer Out': 'bg-orange-50 dark:bg-orange-950/30 text-orange-600',
      'Return': 'bg-purple-50 dark:bg-purple-950/30 text-purple-600',
      'Damage': 'bg-gray-50 dark:bg-gray-950/30 text-gray-600',
    };
    return styles[type as keyof typeof styles] || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <BookText className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Product Ledger Table
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Detailed product-wise transaction history
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Ledger
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Transactions</p>
          <p className="text-2xl font-bold mt-1">1,245</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Stock In</p>
          <p className="text-2xl font-bold mt-1 text-green-600">+856</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Stock Out</p>
          <p className="text-2xl font-bold mt-1 text-red-600">-689</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-2xl font-bold mt-1">2,345</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Types</option>
            <option value="sale">Sale</option>
            <option value="purchase">Purchase</option>
            <option value="transfer">Transfer</option>
            <option value="return">Return</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
          </select>
          <Input type="date" className="h-10" placeholder="From Date" />
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Type</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Balance</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Reference</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Branch</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">User</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{entry.date}</td>
                  <td className="px-4 py-3 font-medium">{entry.product}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(entry.type)}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 font-medium ${entry.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.quantity > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(entry.quantity)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                      {entry.balance}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{entry.reference}</td>
                  <td className="px-4 py-3 text-sm">{entry.branch}</td>
                  <td className="px-4 py-3 text-sm">{entry.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
