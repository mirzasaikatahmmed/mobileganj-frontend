'use client';

import { useState } from 'react';
import { Plus, Search, Phone, MapPin, Edit, Trash2, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockSellers = [
  { id: '1', fullName: 'Karim Ahmed', phone: '01711223344', address: 'Mirpur, Dhaka', nidNumber: '1234567890123', totalPurchase: 450000, due: 25000 },
  { id: '2', fullName: 'Rahim Uddin', phone: '01811223344', address: 'Agrabad, Chittagong', nidNumber: '9876543210987', totalPurchase: 325000, due: 0 },
];

export default function LocalSellersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockSellers.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.phone.includes(search)
  );

  const totalDue = mockSellers.reduce((acc, curr) => acc + curr.due, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Local Sellers</h1>
          <p className="text-muted-foreground">Manage local phone sellers</p>
        </div>
        <Link href="/admin/suppliers/local/new">
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Local Seller
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sellers</p>
              <p className="text-2xl font-bold">{mockSellers.length}</p>
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
              <th className="text-left p-4 font-semibold">Seller Name</th>
              <th className="text-left p-4 font-semibold">Contact</th>
              <th className="text-left p-4 font-semibold">NID Number</th>
              <th className="text-left p-4 font-semibold">Total Purchase</th>
              <th className="text-left p-4 font-semibold">Due Amount</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((seller) => (
              <tr key={seller.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <p className="font-medium">{seller.fullName}</p>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {seller.phone}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {seller.address}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-mono text-sm">{seller.nidNumber}</p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">৳{seller.totalPurchase.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <p className={`font-bold ${seller.due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ৳{seller.due.toLocaleString()}
                  </p>
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
