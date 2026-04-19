'use client';

import { useState, useMemo } from 'react';
import { Plus, Search, Plane, Phone, MapPin, Edit, Trash2, TrendingUp, Store, Truck, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type SupplierType = 'Supplier' | 'Shop';

const mockSuppliers = [
  { id: '1', name: 'Dubai Tech Supplies', shopName: 'Tech Hub Dubai', phone: '+971-50-1234567', address: 'Dubai, UAE', totalPurchase: 2500000, due: 150000, type: 'Supplier' as SupplierType },
  { id: '2', name: 'Singapore Mobile World', shopName: 'Mobile Plaza', phone: '+65-9123-4567', address: 'Singapore', totalPurchase: 1800000, due: 0, type: 'Shop' as SupplierType },
];

type TabKey = 'all' | 'suppliers' | 'shops';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'all', label: 'All', icon: <Users className="w-4 h-4" />, color: 'text-foreground' },
  { key: 'suppliers', label: 'Suppliers', icon: <Truck className="w-4 h-4" />, color: 'text-blue-600 dark:text-blue-400' },
  { key: 'shops', label: 'Shops', icon: <Store className="w-4 h-4" />, color: 'text-green-600 dark:text-green-400' },
];

export default function OverseasSuppliersPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = mockSuppliers;

    if (activeTab === 'suppliers') {
      result = result.filter(s => s.type === 'Supplier');
    } else if (activeTab === 'shops') {
      result = result.filter(s => s.type === 'Shop');
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.phone.includes(q) ||
        (s.shopName && s.shopName.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [activeTab, search]);

  const counts = useMemo(() => ({
    all: mockSuppliers.length,
    suppliers: mockSuppliers.filter(s => s.type === 'Supplier').length,
    shops: mockSuppliers.filter(s => s.type === 'Shop').length,
  }), []);

  const totalDue = mockSuppliers.reduce((sum, s) => sum + (s.type === 'Supplier' ? s.due : 0), 0);

  const showDue = activeTab !== 'shops';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overseas Suppliers</h1>
          <p className="text-muted-foreground">Manage international suppliers and shops</p>
        </div>
        <Link href="/admin/suppliers/new">
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total {activeTab === 'shops' ? 'Shops' : activeTab === 'suppliers' ? 'Suppliers' : 'Records'}</p>
              <p className="text-2xl font-bold">{filtered.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Due</p>
              <p className="text-2xl font-bold">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="flex overflow-x-auto border-b scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                activeTab === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <span className={activeTab === tab.key ? 'text-primary' : tab.color}>
                {tab.icon}
              </span>
              {tab.label}
              <span className={cn(
                'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="p-4 border-b bg-muted/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40 text-sm">
              <tr>
                <th className="text-left p-4 font-semibold">Name & Location</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">Contact</th>
                <th className="text-left p-4 font-semibold">Total Purchase</th>
                {showDue && <th className="text-left p-4 font-semibold">Due Amount</th>}
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((supplier) => (
                  <tr key={supplier.id} className="border-t hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        {supplier.shopName && <p className="text-xs text-muted-foreground mt-0.5">{supplier.shopName}</p>}
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.address}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium",
                        supplier.type === 'Supplier' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      )}>
                        {supplier.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {supplier.phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">৳{supplier.totalPurchase.toLocaleString()}</p>
                    </td>
                    {showDue && (
                      <td className="p-4">
                        {supplier.type === 'Supplier' ? (
                          <p className={`font-bold ${supplier.due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ৳{supplier.due.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-muted-foreground">—</p>
                        )}
                      </td>
                    )}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
