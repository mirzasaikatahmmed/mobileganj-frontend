'use client';

import { Package, Search, Filter, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OwnStockPage() {
  const stocks = [
    { id: 1, product: 'iPhone 15 Pro Max', sku: 'IP15PM-256-BLK', category: 'Phone', quantity: 25, branch: 'Main Branch', value: 3750000 },
    { id: 2, product: 'Samsung Galaxy S24 Ultra', sku: 'SGS24U-512-GRY', category: 'Phone', quantity: 18, branch: 'Main Branch', value: 2340000 },
    { id: 3, product: 'AirPods Pro 2', sku: 'APP2-WHT', category: 'Accessories', quantity: 45, branch: 'Branch 1', value: 1350000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Own Stock
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            View and manage your own inventory stock
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
          <p className="text-sm opacity-90">Total Products</p>
          <p className="text-2xl font-bold mt-1">88</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Quantity</p>
          <p className="text-2xl font-bold mt-1">1,245</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Value</p>
          <p className="text-2xl font-bold mt-1">৳12.5M</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Low Stock Items</p>
          <p className="text-2xl font-bold mt-1">12</p>
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
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
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
                <th className="text-left px-4 py-3 text-sm font-semibold">Branch</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Value (৳)</th>
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
                  <td className="px-4 py-3 text-sm">{stock.branch}</td>
                  <td className="px-4 py-3 text-right font-medium">৳{stock.value.toLocaleString()}</td>
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
