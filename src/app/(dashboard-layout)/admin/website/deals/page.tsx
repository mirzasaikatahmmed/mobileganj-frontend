'use client';

import { Megaphone, Plus, Edit, Trash2, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DealsOffersPage() {
  const deals = [
    { id: 1, title: 'Weekend Sale', discount: 15, products: 12, active: true },
    { id: 2, title: 'Clearance Sale', discount: 25, products: 8, active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Deals & Offers
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage special deals and promotional offers</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Create Deal</Button>
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <div key={deal.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-lg">{deal.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{deal.products} products included</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                  <Percent className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-600">{deal.discount}% OFF</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2"><Edit className="w-3 h-3" />Edit</Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" />Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
