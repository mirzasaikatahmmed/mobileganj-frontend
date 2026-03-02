'use client';

import { Package, Search, Filter, Download, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CurrentStockPage() {
  const stocks = [
    { id: 1, product: 'iPhone 15 Pro Max', sku: 'IP15PM-256-BLK', category: 'Phone', quantity: 85, minStock: 20, value: 12750000, location: 'A-12', status: 'good' },
    { id: 2, product: 'Samsung S24 Ultra', sku: 'SS24U-512-GRY', category: 'Phone', quantity: 12, minStock: 15, value: 1560000, location: 'A-15', status: 'low' },
    { id: 3, product: 'AirPods Pro 2', sku: 'APP2-WHT', category: 'Accessories', quantity: 150, minStock: 50, value: 4500000, location: 'B-08', status: 'good' },
    { id: 4, product: 'MacBook Pro M3', sku: 'MBP-M3-16', category: 'Laptop', quantity: 5, minStock: 10, value: 1250000, location: 'C-03', status: 'critical' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      good: 'bg-green-50 dark:bg-green-950/30 text-green-600',
      low: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600',
      critical: 'bg-red-50 dark:bg-red-950/30 text-red-600',
    };
    const labels = {
      good: 'Good Stock',
      low: 'Low Stock',
      critical: 'Critical',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status === 'critical' && <AlertTriangle className="w-3 h-3" />}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Current Stock Info
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Real-time godown inventory information
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Stock
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Items</p>
          <p className="text-2xl font-bold mt-1">156</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Quantity</p>
          <p className="text-2xl font-bold mt-1">2,845</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Value</p>
          <p className="text-2xl font-bold mt-1">৳45.8M</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Low Stock Items</p>
          <p className="text-2xl font-bold mt-1">18</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Categories</option>
            <option value="phone">Phones</option>
            <option value="accessories">Accessories</option>
            <option value="laptop">Laptops</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Status</option>
            <option value="good">Good Stock</option>
            <option value="low">Low Stock</option>
            <option value="critical">Critical</option>
          </select>
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
                <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">SKU</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Min Stock</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Location</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Value (৳)</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{stock.product}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{stock.sku}</td>
                  <td className="px-4 py-3 text-sm">{stock.category}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                      {stock.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{stock.minStock}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex px-2 py-1 rounded bg-muted text-xs font-medium">
                      {stock.location}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">৳{stock.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(stock.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
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
