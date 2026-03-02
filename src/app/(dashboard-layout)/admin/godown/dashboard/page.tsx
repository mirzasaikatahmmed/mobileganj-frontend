'use client';

import { LayoutGrid, Package, TrendingUp, TrendingDown, ArrowRightLeft, AlertTriangle, Eye, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GodownDashboardPage() {
  const recentTransfers = [
    { id: 'TRF-045', date: '2024-01-20', to: 'Main Branch', items: 5, status: 'completed' },
    { id: 'TRF-044', date: '2024-01-19', to: 'Branch 1', items: 3, status: 'pending' },
  ];

  const lowStockItems = [
    { product: 'iPhone 15 Pro Max', quantity: 8, threshold: 20 },
    { product: 'Samsung S24 Ultra', quantity: 5, threshold: 15 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          Godown Dashboard
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Central warehouse management overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Stock</p>
          </div>
          <p className="text-2xl font-bold">2,845</p>
          <p className="text-xs opacity-75 mt-1">156 Products</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Stock In (Month)</p>
          </div>
          <p className="text-2xl font-bold">+456</p>
          <p className="text-xs opacity-75 mt-1">From suppliers</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Stock Out (Month)</p>
          </div>
          <p className="text-2xl font-bold">-289</p>
          <p className="text-xs opacity-75 mt-1">To branches</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Pending Transfers</p>
          </div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs opacity-75 mt-1">Awaiting approval</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/admin/godown/current-stock">
            <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
              <Package className="w-6 h-6" />
              <span className="text-sm">View Stock</span>
            </Button>
          </Link>
          <Link href="/admin/godown/stock-transfer">
            <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
              <Send className="w-6 h-6" />
              <span className="text-sm">Transfer Stock</span>
            </Button>
          </Link>
          <Link href="/admin/godown/transfer-invoices">
            <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
              <Eye className="w-6 h-6" />
              <span className="text-sm">View Invoices</span>
            </Button>
          </Link>
          <Link href="/admin/godown/stock-report">
            <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Stock Report</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transfers */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent Transfers</h2>
            <Link href="/admin/godown/stock-transfer">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransfers.map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">{transfer.id}</p>
                  <p className="text-sm text-muted-foreground">To: {transfer.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{transfer.items} items</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    transfer.status === 'completed' 
                      ? 'bg-green-50 dark:bg-green-950/30 text-green-600' 
                      : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600'
                  }`}>
                    {transfer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Low Stock Alert
            </h2>
            <Link href="/admin/godown/current-stock">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{item.product}</p>
                  <span className="text-sm font-medium text-orange-600">{item.quantity} left</span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-900 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${(item.quantity / item.threshold) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Threshold: {item.threshold}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
