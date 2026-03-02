'use client';

import { Star, Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FeaturedProductsPage() {
  const products = [
    { id: 1, name: 'iPhone 15 Pro Max', category: 'Phone', price: 150000, stock: 25, order: 1, featured: true },
    { id: 2, name: 'Samsung S24 Ultra', category: 'Phone', price: 130000, stock: 18, order: 2, featured: true },
    { id: 3, name: 'AirPods Pro 2', category: 'Accessories', price: 30000, stock: 45, order: 3, featured: true },
    { id: 4, name: 'MacBook Pro M3', category: 'Laptop', price: 250000, stock: 8, order: 4, featured: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Star className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Featured Products
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage homepage featured products</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Add Product</Button>
      </div>

      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
            <option value="">Sort By</option>
            <option value="order">Display Order</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
              <th className="text-right px-4 py-3 text-sm font-semibold">Price</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Stock</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Order</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-sm">{product.category}</td>
                <td className="px-4 py-3 text-right">৳{product.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-center">{product.stock}</td>
                <td className="px-4 py-3 text-center">{product.order}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                    Featured
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === 0}>
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === products.length - 1}>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
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
  );
}
