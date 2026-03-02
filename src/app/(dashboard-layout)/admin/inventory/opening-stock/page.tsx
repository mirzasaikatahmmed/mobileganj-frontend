'use client';

import { Package, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OpeningStockPage() {
  const openingStocks = [
    { id: 1, product: 'iPhone 14 Pro', sku: 'IP14P-128-BLK', quantity: 15, purchasePrice: 120000, totalValue: 1800000, date: '2024-01-01' },
    { id: 2, product: 'Samsung S23', sku: 'SS23-256-WHT', quantity: 20, purchasePrice: 85000, totalValue: 1700000, date: '2024-01-01' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Opening Stock
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage initial inventory opening stock
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Opening Stock
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Items</p>
          <p className="text-2xl font-bold mt-1">35</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Quantity</p>
          <p className="text-2xl font-bold mt-1">450</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Value</p>
          <p className="text-2xl font-bold mt-1">৳8.5M</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border rounded-lg p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search opening stock..." className="pl-9" />
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
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Purchase Price</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Total Value</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {openingStocks.map((stock) => (
                <tr key={stock.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{stock.product}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{stock.sku}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-sm font-medium">
                      {stock.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">৳{stock.purchasePrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">৳{stock.totalValue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted-foreground">{stock.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
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
