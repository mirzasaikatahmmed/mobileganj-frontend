'use client';

import { useState } from 'react';
import { Plus, Search, Users, UserCheck, UserX, Phone, Mail, MapPin, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockCustomers = [
  { id: '1', name: 'Karim Ahmed', phone: '01711223344', email: 'karim@example.com', address: 'Dhaka', type: 'Regular', totalPurchase: 125000, status: 'Active' },
  { id: '2', name: 'Rahim Uddin', phone: '01811223344', email: 'rahim@example.com', address: 'Chittagong', type: 'VIP', totalPurchase: 450000, status: 'Active' },
  { id: '3', name: 'Fatema Begum', phone: '01911223344', email: 'fatema@example.com', address: 'Sylhet', type: 'Regular', totalPurchase: 85000, status: 'Inactive' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Customers</h1>
          <p className="text-muted-foreground">Manage customer database</p>
        </div>
        <Link href="/admin/customers/new">
          <Button size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">1,089</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <UserX className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactive</p>
              <p className="text-2xl font-bold">145</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Contact</th>
              <th className="text-left p-4 font-semibold">Type</th>
              <th className="text-left p-4 font-semibold">Total Purchase</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {customer.address}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={customer.type === 'VIP' ? 'default' : 'secondary'}>
                    {customer.type}
                  </Badge>
                </td>
                <td className="p-4">
                  <p className="font-semibold">৳{customer.totalPurchase.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                    {customer.status}
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
