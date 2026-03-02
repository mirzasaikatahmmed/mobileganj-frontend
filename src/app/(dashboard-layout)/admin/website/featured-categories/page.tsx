'use client';

import { FolderTree, Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturedCategoriesPage() {
  const categories = [
    { id: 1, name: 'Smartphones', products: 156, order: 1, featured: true },
    { id: 2, name: 'Accessories', products: 89, order: 2, featured: true },
    { id: 3, name: 'Tablets', products: 34, order: 3, featured: true },
    { id: 4, name: 'Smart Watches', products: 23, order: 4, featured: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <FolderTree className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Featured Categories
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage homepage featured categories</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Add Category</Button>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Products</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Order</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
              <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                    {cat.products}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{cat.order}</td>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === categories.length - 1}>
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
