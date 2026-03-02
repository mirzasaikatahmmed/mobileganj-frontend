'use client';

import { Tag, Plus, Edit, Trash2, Eye, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function CategoryBannersPage() {
  const banners = [
    { id: 1, category: 'Phones', title: 'Latest Smartphones', active: true },
    { id: 2, category: 'Accessories', title: 'Premium Accessories', active: true },
    { id: 3, category: 'Tablets', title: 'Tablets & iPads', active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Category Banners
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Category-specific promotional banners</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Add Banner</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded-lg overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-medium">{banner.title}</h4>
                <p className="text-sm text-muted-foreground">Category: {banner.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${banner.active ? 'bg-green-50 dark:bg-green-950/30 text-green-600' : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'}`}>
                  {banner.active ? 'Active' : 'Inactive'}
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
