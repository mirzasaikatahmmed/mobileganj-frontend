'use client';

import { FileBarChart, Search, Download, TrendingUp, TrendingDown, ArrowRightLeft, Filter, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StockReportPage() {
  const movements = [
    { id: 1, date: '2024-01-20', product: 'iPhone 15 Pro Max', type: 'out', quantity: 15, branch: 'Main Branch', reference: 'GTB-045', value: 2250000 },
    { id: 2, date: '2024-01-19', product: 'Samsung S24 Ultra', type: 'in', quantity: 25, supplier: 'Supplier A', reference: 'PO-1234', value: 3250000 },
    { id: 3, date: '2024-01-18', product: 'AirPods Pro 2', type: 'out', quantity: 30, branch: 'Branch 1', reference: 'GTB-044', value: 900000 },
    { id: 4, date: '2024-01-17', product: 'MacBook Pro M3', type: 'in', quantity: 10, supplier: 'Supplier B', reference: 'PO-1235', value: 2500000 },
  ];

  const getTypeStyle = (type: string) => {
    if (type === 'in') {
      return {
        badge: 'bg-green-50 dark:bg-green-950/30 text-green-600',
        icon: TrendingUp,
        label: 'Stock In',
      };
    }
    return {
      badge: 'bg-red-50 dark:bg-red-950/30 text-red-600',
      icon: TrendingDown,
      label: 'Stock Out',
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <FileBarChart className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Stock In Out Report
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Detailed godown stock movement report
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Movements</p>
          </div>
          <p className="text-2xl font-bold">1,245</p>
          <p className="text-xs opacity-75 mt-1">This month</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Stock In</p>
          </div>
          <p className="text-2xl font-bold">+856</p>
          <p className="text-xs opacity-75 mt-1">From suppliers</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Stock Out</p>
          </div>
          <p className="text-2xl font-bold">-689</p>
          <p className="text-xs opacity-75 mt-1">To branches</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Net Change</p>
          </div>
          <p className="text-2xl font-bold">+167</p>
          <p className="text-xs opacity-75 mt-1">Current balance</p>
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
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Locations</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="supplier">Suppliers</option>
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
                <th className="text-left px-4 py-3 text-sm font-semibold">From/To</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Reference</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Value (৳)</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => {
                const typeStyle = getTypeStyle(movement.type);
                const TypeIcon = typeStyle.icon;
                return (
                  <tr key={movement.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-muted-foreground">{movement.date}</td>
                    <td className="px-4 py-3 font-medium">{movement.product}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle.badge}`}>
                        <TypeIcon className="w-3 h-3" />
                        {typeStyle.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full text-sm font-medium ${
                        movement.type === 'in' 
                          ? 'bg-green-50 dark:bg-green-950/30 text-green-600' 
                          : 'bg-red-50 dark:bg-red-950/30 text-red-600'
                      }`}>
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {movement.type === 'in' ? movement.supplier : movement.branch}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{movement.reference}</td>
                    <td className="px-4 py-3 text-right font-medium">৳{movement.value.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
