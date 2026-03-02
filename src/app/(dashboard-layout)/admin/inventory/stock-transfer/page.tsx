'use client';

import { ArrowRightLeft, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StockTransferG2BPage() {
  const transfers = [
    { id: 'TRF-001', date: '2024-01-15', from: 'Godown', to: 'Main Branch', items: 5, quantity: 45, status: 'pending', requestedBy: 'Admin' },
    { id: 'TRF-002', date: '2024-01-14', from: 'Godown', to: 'Branch 1', items: 3, quantity: 28, status: 'approved', requestedBy: 'Manager' },
    { id: 'TRF-003', date: '2024-01-13', from: 'Godown', to: 'Branch 2', items: 8, quantity: 62, status: 'completed', requestedBy: 'Admin' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600',
      approved: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600',
      completed: 'bg-green-50 dark:bg-green-950/30 text-green-600',
      rejected: 'bg-red-50 dark:bg-red-950/30 text-red-600',
    };
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      completed: 'Completed',
      rejected: 'Rejected',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status === 'completed' && <CheckCircle className="w-3 h-3" />}
        {status === 'rejected' && <XCircle className="w-3 h-3" />}
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
            <ArrowRightLeft className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Stock Transfer [G2B]
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Godown to Branch stock transfer requests
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Transfers</p>
          <p className="text-2xl font-bold mt-1">48</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold mt-1 text-orange-600">12</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold mt-1 text-blue-600">8</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold mt-1 text-green-600">28</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search transfers..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="branch2">Branch 2</option>
          </select>
          <Input type="date" className="h-10" />
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
                <th className="text-left px-4 py-3 text-sm font-semibold">From</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">To</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Items</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Requested By</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{transfer.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transfer.date}</td>
                  <td className="px-4 py-3 text-sm">{transfer.from}</td>
                  <td className="px-4 py-3 text-sm">{transfer.to}</td>
                  <td className="px-4 py-3 text-center">{transfer.items}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                      {transfer.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{transfer.requestedBy}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(transfer.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {transfer.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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
