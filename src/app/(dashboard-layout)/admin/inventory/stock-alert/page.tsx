'use client';

import { Bell, AlertTriangle, Search, Settings, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StockAlertPage() {
  const alerts = [
    { id: 1, product: 'MacBook Pro M3', sku: 'MBP-M3-16', current: 3, threshold: 10, status: 'critical', branch: 'Main Branch' },
    { id: 2, product: 'Samsung S24 Ultra', sku: 'SS24U-512', current: 8, threshold: 15, status: 'warning', branch: 'Main Branch' },
    { id: 3, product: 'iPad Pro 12.9', sku: 'IPP-129-256', current: 5, threshold: 12, status: 'warning', branch: 'Branch 1' },
    { id: 4, product: 'Apple Watch Ultra 2', sku: 'AWU2-TIT', current: 2, threshold: 8, status: 'critical', branch: 'Branch 2' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'critical') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Critical
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-600 text-xs font-medium">
        <Bell className="w-3 h-3" />
        Warning
        </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Stock Alert Quantity
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Monitor low stock items and set alert thresholds
          </p>
        </div>
        <Button className="gap-2">
          <Settings className="w-4 h-4" />
          Alert Settings
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Critical Alerts</p>
          </div>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Warnings</p>
          </div>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Monitored</p>
          </div>
          <p className="text-2xl font-bold">156</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Status</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
          </select>
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
            <option value="branch2">Branch 2</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">SKU</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Current Stock</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Alert Threshold</th>
                <th className="text-left px-4 py-3 text-sm font-semibold">Branch</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{alert.product}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{alert.sku}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full text-sm font-medium ${
                      alert.status === 'critical' 
                        ? 'bg-red-50 dark:bg-red-950/30 text-red-600' 
                        : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600'
                    }`}>
                      {alert.current}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{alert.threshold}</td>
                  <td className="px-4 py-3 text-sm">{alert.branch}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(alert.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="outline" size="sm">
                      Restock
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
