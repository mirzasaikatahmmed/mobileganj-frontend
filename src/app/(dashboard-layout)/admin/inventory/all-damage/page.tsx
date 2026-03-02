'use client';

import { AlertTriangle, Plus, Search, Eye, Download, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AllDamageProductsPage() {
  const damages = [
    { id: 'DMG-001', date: '2024-01-20', product: 'iPhone 15 Pro Max', quantity: 1, value: 150000, type: 'Screen Damage', branch: 'Main Branch', action: 'Repair', status: 'pending' },
    { id: 'DMG-002', date: '2024-01-19', product: 'Samsung S24 Ultra', quantity: 2, value: 260000, type: 'Water Damage', branch: 'Branch 1', action: 'Return to Supplier', status: 'completed' },
    { id: 'DMG-003', date: '2024-01-18', product: 'AirPods Pro 2', quantity: 3, value: 90000, type: 'Manufacturing Defect', branch: 'Main Branch', action: 'Warranty Claim', status: 'in-progress' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600',
      'in-progress': 'bg-blue-50 dark:bg-blue-950/30 text-blue-600',
      completed: 'bg-green-50 dark:bg-green-950/30 text-green-600',
    };
    const labels = {
      pending: 'Pending',
      'in-progress': 'In Progress',
      completed: 'Completed',
    };
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-destructive" />
            All Damage Products
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            View and manage all damaged product reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/inventory/add-damage">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Damage
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Damages</p>
          <p className="text-2xl font-bold mt-1">48</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Pending</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">In Progress</p>
          <p className="text-2xl font-bold mt-1">8</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Loss</p>
          <p className="text-2xl font-bold mt-1">৳2.8M</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search damages..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Types</option>
            <option value="physical">Physical Damage</option>
            <option value="water">Water Damage</option>
            <option value="screen">Screen Damage</option>
            <option value="other">Other</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Damage ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Loss Value</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Damage Type</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Branch</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Action</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">View</th>
              </tr>
            </thead>
            <tbody>
              {damages.map((damage) => (
                <tr key={damage.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{damage.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{damage.date}</td>
                  <td className="px-4 py-3 font-medium">{damage.product}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 text-sm font-medium">
                      {damage.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">৳{damage.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{damage.type}</td>
                  <td className="px-4 py-3 text-sm">{damage.branch}</td>
                  <td className="px-4 py-3 text-sm">{damage.action}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(damage.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
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
