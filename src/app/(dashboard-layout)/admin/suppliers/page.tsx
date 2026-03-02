'use client';

import { useState } from 'react';
import { Plus, Search, Plane, Phone, Mail, MapPin, Edit, Trash2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockSuppliers = [
  { id: '1', name: 'Dubai Tech Supplies', shopName: 'Tech Hub Dubai', phone: '+971-50-1234567', address: 'Dubai, UAE', totalPurchase: 2500000, due: 150000, status: 'Active' },
  { id: '2', name: 'Singapore Mobile World', shopName: 'Mobile Plaza', phone: '+65-9123-4567', address: 'Singapore', totalPurchase: 1800000, due: 0, status: 'Active' },
];

export default function OverseasSuppliersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockSuppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.phone.includes(search)
  );

  const totalSuppliers = mockSuppliers.length;
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'Active').length;
  const totalDue = mockSuppliers.reduce((sum, s) => sum + s.due, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overseas Suppliers</h1>
          <p className="text-muted-foreground">Manage international suppliers</p>
        </div>
        <Link href="/admin/suppliers/new">
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Overseas Supplier
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
              <p className="text-2xl font-bold">{totalSuppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{activeSuppliers}</p>
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Supplier</th>
              <th className="text-left p-4 font-semibold">Shop Name</th>
              <th className="text-left p-4 font-semibold">Contact</th>
              <th className="text-left p-4 font-semibold">Total Purchase</th>
              <th className="text-left p-4 font-semibold">Due Amount</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((supplier) => (
              <tr key={supplier.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.address}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">{supplier.shopName}</p>
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
                <td className="p-4">
                  <p className={`font-bold ${supplier.due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ৳{supplier.due.toLocaleString()}
                  </p>
                </td>
                <td className="p-4">
                  <Badge variant={supplier.status === 'Active' ? 'default' : 'secondary'}>
                    {supplier.status}
                  </Badge>
                </td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
