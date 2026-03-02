'use client';

import { Receipt, Search, Download, Eye, Printer, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TransferInvoicesPage() {
  const invoices = [
    { id: 'INV-GTB-045', transferId: 'GTB-045', date: '2024-01-20', branch: 'Main Branch', items: 5, quantity: 45, value: 6750000, issuedBy: 'Admin' },
    { id: 'INV-GTB-044', transferId: 'GTB-044', date: '2024-01-19', branch: 'Branch 1', items: 3, quantity: 28, value: 3640000, issuedBy: 'Manager' },
    { id: 'INV-GTB-043', transferId: 'GTB-043', date: '2024-01-18', branch: 'Branch 2', items: 8, quantity: 62, value: 8060000, issuedBy: 'Admin' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Receipt className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Stock Transfer Invoices
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            View and manage transfer invoices
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Invoices</p>
          <p className="text-2xl font-bold mt-1">245</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">This Month</p>
          <p className="text-2xl font-bold mt-1">48</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Items</p>
          <p className="text-2xl font-bold mt-1">1,245</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Value</p>
          <p className="text-2xl font-bold mt-1">৳85.4M</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="branch2">Branch 2</option>
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
                <th className="text-left px-4 py-3 text-sm font-semibold">Invoice ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Transfer ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Branch</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Items</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Value (৳)</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Issued By</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{invoice.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{invoice.transferId}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{invoice.date}</td>
                  <td className="px-4 py-3 text-sm">{invoice.branch}</td>
                  <td className="px-4 py-3 text-center">{invoice.items}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                      {invoice.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">৳{invoice.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{invoice.issuedBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
}
