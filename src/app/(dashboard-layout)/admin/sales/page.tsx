'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, Printer, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useSales, useSalesStats } from '@/hooks/use-sales';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Sale, SaleFilterDto } from '@/types/sale';
import { format } from 'date-fns';

export default function SalesPage() {
  const [filters, setFilters] = useState<SaleFilterDto>({
    page: 1,
    limit: 10,
  });

  const { data: salesData, isLoading } = useSales(filters);
  const { data: stats } = useSalesStats();

  const sales = salesData?.data || [];
  const meta = salesData?.meta;

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search, page: 1 });
  };

  const handleStatusFilter = (status: string) => {
    setFilters({ ...filters, status: status === 'all' ? undefined : status as any, page: 1 });
  };

  const handleDateFilter = (date: string) => {
    if (date) {
      setFilters({ ...filters, startDate: date, endDate: date, page: 1 });
    } else {
      const { startDate, endDate, ...rest } = filters;
      setFilters(rest);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-muted-foreground">Manage all sales & invoices</p>
        </div>
        <Link href="/admin/sales/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <h3 className="text-2xl font-bold mt-1">৳{stats?.totalSales.toLocaleString() || 0}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳{stats?.totalPaid.toLocaleString() || 0}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Due</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">৳{stats?.totalDue.toLocaleString() || 0}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <h3 className="text-2xl font-bold mt-1">{stats?.totalInvoices || 0}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by invoice, customer, phone..." 
              className="pl-10" 
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial_paid">Partial Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="date" 
            className="w-[180px]" 
            onChange={(e) => handleDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Invoice No</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Phone</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-right p-4 font-semibold">Paid</th>
                <th className="text-right p-4 font-semibold">Due</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((sale: Sale, index: number) => (
                  <motion.tr
                    key={sale.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 font-mono font-medium">{sale.invoiceNo}</td>
                    <td className="p-4">{format(new Date(sale.saleDate), 'dd MMM yyyy')}</td>
                    <td className="p-4 font-medium">{sale.customer.name}</td>
                    <td className="p-4 text-muted-foreground">{sale.customer.phone}</td>
                    <td className="p-4 text-right font-semibold">৳{sale.grandTotal.toLocaleString()}</td>
                    <td className="p-4 text-right text-green-600">৳{sale.paidAmount.toLocaleString()}</td>
                    <td className="p-4 text-right text-red-600">৳{sale.dueAmount.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sale.status === 'paid' ? 'bg-green-100 text-green-700' :
                        sale.status === 'partial_paid' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {sale.status === 'paid' ? 'Paid' : sale.status === 'partial_paid' ? 'Partial' : 'Due'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/sales/${sale.id}`}>
                          <Button variant="ghost" size="icon" title="View details">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/sales/invoice/${sale.invoiceNo}`}>
                          <Button variant="ghost" size="icon" title="Print invoice">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/sales/returns/new?saleId=${sale.id}`}>
                          <Button variant="ghost" size="icon" title="Create return">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-muted-foreground">
                    No sales found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === 1}
                onClick={() => setFilters({ ...filters, page: meta.page - 1 })}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.page === meta.totalPages}
                onClick={() => setFilters({ ...filters, page: meta.page + 1 })}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
