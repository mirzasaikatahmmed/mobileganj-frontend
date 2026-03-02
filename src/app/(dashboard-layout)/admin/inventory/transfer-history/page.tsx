'use client';

import { History, Search, Download, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TransferHistoryPage() {
  const history = [
    { id: 'TRF-045', date: '2024-01-20', type: 'B2B', from: 'Main Branch', to: 'Branch 1', items: 4, quantity: 32, completedBy: 'Admin', completedAt: '2024-01-20 14:30' },
    { id: 'TRF-044', date: '2024-01-19', type: 'B2G', from: 'Branch 2', to: 'Godown', items: 6, quantity: 18, completedBy: 'Manager', completedAt: '2024-01-19 16:45' },
    { id: 'TRF-043', date: '2024-01-18', type: 'G2B', from: 'Godown', to: 'Main Branch', items: 8, quantity: 55, completedBy: 'Admin', completedAt: '2024-01-18 11:20' },
  ];

  const getTypeBadge = (type: string) => {
    const styles = {
      'B2B': 'bg-blue-50 dark:bg-blue-950/30 text-blue-600',
      'B2G': 'bg-purple-50 dark:bg-purple-950/30 text-purple-600',
      'G2B': 'bg-green-50 dark:bg-green-950/30 text-green-600',
    };
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <History className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Transfer History
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Complete log of all stock transfers
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export History
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Transfers</p>
          <p className="text-2xl font-bold mt-1">245</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">B2B Transfers</p>
          <p className="text-2xl font-bold mt-1">128</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">G2B Transfers</p>
          <p className="text-2xl font-bold mt-1">85</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">B2G Transfers</p>
          <p className="text-2xl font-bold mt-1">32</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search transfers..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Types</option>
            <option value="b2b">B2B</option>
            <option value="b2g">B2G</option>
            <option value="g2b">G2B</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Locations</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="godown">Godown</option>
          </select>
          <Input type="date" className="h-10" placeholder="From Date" />
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
                <th className="text-left px-4 py-3 text-sm font-semibold">Transfer ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Type</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">From</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">To</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Items</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Completed By</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Completed At</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{record.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{record.date}</td>
                  <td className="px-4 py-3 text-center">{getTypeBadge(record.type)}</td>
                  <td className="px-4 py-3 text-sm">{record.from}</td>
                  <td className="px-4 py-3 text-sm">{record.to}</td>
                  <td className="px-4 py-3 text-center">{record.items}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                      {record.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{record.completedBy}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{record.completedAt}</td>
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
