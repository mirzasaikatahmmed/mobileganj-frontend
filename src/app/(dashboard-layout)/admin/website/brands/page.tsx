'use client';

import { Tag, Plus, Edit, Trash2, Eye, Image, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BrandsManagementPage() {
  const brands = [
    { id: 1, name: 'Apple', products: 45, featured: true, active: true },
    { id: 2, name: 'Samsung', products: 67, featured: true, active: true },
    { id: 3, name: 'Google', products: 23, featured: true, active: true },
    { id: 4, name: 'OnePlus', products: 18, featured: false, active: true },
    { id: 5, name: 'Xiaomi', products: 34, featured: false, active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Brands Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage product brands and logos</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Add Brand</Button>
      </div>

      <div className="bg-card border rounded-lg p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search brands..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="border rounded-lg overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium">{brand.name}</h4>
                <p className="text-sm text-muted-foreground">{brand.products} products</p>
              </div>
              <div className="flex items-center gap-2">
                {brand.featured && (
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600">
                    Featured
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${brand.active ? 'bg-green-50 dark:bg-green-950/30 text-green-600' : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'}`}>
                  {brand.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2"><Edit className="w-3 h-3" />Edit</Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" />Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
