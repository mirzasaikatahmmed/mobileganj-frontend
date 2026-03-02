'use client';

import { useState } from 'react';
import { Plus, Search, Users, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const mockInvestors = [
  { id: '1', name: 'Ahmed Khan', phone: '01711223344', email: 'ahmed@example.com', totalInvested: 500000, returns: 50000, status: 'Active' },
  { id: '2', name: 'Rahim Mia', phone: '01811223344', email: 'rahim@example.com', totalInvested: 300000, returns: 25000, status: 'Active' },
];

export default function InvestorsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockInvestors.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.phone.includes(search)
  );

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Investors</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage investor profiles</p>
        </div>
        <Button size="lg" className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Investors</p>
              <p className="text-xl sm:text-2xl font-bold">{mockInvestors.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Active</p>
              <p className="text-xl sm:text-2xl font-bold">{mockInvestors.filter(i => i.status === 'Active').length}</p>
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Investor</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Contact</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Total Invested</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Returns</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Status</th>
                <th className="text-right p-3 sm:p-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((investor) => (
                <tr key={investor.id} className="border-t hover:bg-muted/50">
                  <td className="p-3 sm:p-4">
                    <p className="font-medium text-sm">{investor.name}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {investor.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {investor.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="font-semibold text-sm">৳{investor.totalInvested.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <p className="text-green-600 font-medium text-sm">৳{investor.returns.toLocaleString()}</p>
                  </td>
                  <td className="p-3 sm:p-4">
                    <Badge variant="default" className="text-xs">{investor.status}</Badge>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
}
