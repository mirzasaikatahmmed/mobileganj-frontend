'use client';

import { ClipboardList, Search, Download, Package, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductSummaryPage() {
  const summary = [
    { id: 1, product: 'iPhone 15 Pro Max', category: 'Phone', totalStock: 50, sold: 125, revenue: 18750000, profit: 3750000, avgPrice: 150000 },
    { id: 2, product: 'Samsung S24 Ultra', category: 'Phone', totalStock: 16, sold: 89, revenue: 11570000, profit: 2314000, avgPrice: 130000 },
    { id: 3, product: 'AirPods Pro 2', category: 'Accessories', totalStock: 100, sold: 245, revenue: 7350000, profit: 1470000, avgPrice: 30000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Product Summary
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Comprehensive product performance analytics
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Summary
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Products</p>
          </div>
          <p className="text-2xl font-bold">156</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Sold</p>
          </div>
          <p className="text-2xl font-bold">1,459</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold">৳45.2M</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Profit</p>
          </div>
          <p className="text-2xl font-bold">৳9.8M</p>
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
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">Sort By</option>
            <option value="revenue">Revenue</option>
            <option value="profit">Profit</option>
            <option value="sold">Units Sold</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">In Stock</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Sold</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Avg Price</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Revenue</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Profit</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{item.product}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{item.totalStock}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-sm font-medium">
                      {item.sold}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">৳{item.avgPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">৳{item.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-green-600 font-medium">৳{item.profit.toLocaleString()}</span>
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
