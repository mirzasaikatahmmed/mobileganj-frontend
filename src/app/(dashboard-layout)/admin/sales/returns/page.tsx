'use client';

import { useState } from 'react';
import { useSaleReturns, useSaleReturnStats } from '@/hooks/use-sale-returns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ReturnsPage() {
  const [filters, setFilters] = useState({ page: 1, limit: 20, search: '', status: '' });
  const { data, isLoading } = useSaleReturns(filters);
  const { data: stats } = useSaleReturnStats();

  const statusColors = {
    pending: 'bg-yellow-500',
    approved: 'bg-blue-500',
    rejected: 'bg-red-500',
    completed: 'bg-green-500',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sale Returns</h1>
        <Link href="/admin/sales/returns/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Return
          </Button>
        </Link>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{stats.totalAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Refunded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">৳{stats.refundedAmount.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by return number or invoice..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="pl-10"
              />
            </div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="border rounded-md px-3 py-2"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Return #</th>
                      <th className="text-left p-3">Invoice #</th>
                      <th className="text-left p-3">Customer</th>
                      <th className="text-left p-3">Items</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-right p-3">Refund</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((ret: any) => (
                      <tr key={ret.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{ret.returnNumber}</td>
                        <td className="p-3">{ret.sale?.invoiceNumber}</td>
                        <td className="p-3">{ret.customer?.name || 'Walk-in'}</td>
                        <td className="p-3">{ret.items?.length || 0}</td>
                        <td className="p-3 text-right">৳{Number(ret.totalAmount).toLocaleString()}</td>
                        <td className="p-3 text-right">৳{Number(ret.refundAmount).toLocaleString()}</td>
                        <td className="p-3">
                          <Badge className={statusColors[ret.status as keyof typeof statusColors]}>
                            {ret.status}
                          </Badge>
                        </td>
                        <td className="p-3">{format(new Date(ret.createdAt), 'dd MMM yyyy')}</td>
                        <td className="p-3 text-center">
                          <Link href={`/admin/sales/returns/${ret.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data?.total > filters.limit && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    disabled={filters.page === 1}
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="py-2 px-4">
                    Page {filters.page} of {Math.ceil(data.total / filters.limit)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={filters.page >= Math.ceil(data.total / filters.limit)}
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
