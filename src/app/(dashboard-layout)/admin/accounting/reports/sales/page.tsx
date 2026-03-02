'use client';

import { FileBarChart, Download, TrendingUp, ShoppingCart, DollarSign, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SalesReportPage() {
  const salesData = [
    { date: '2024-01-20', invoices: 45, quantity: 128, revenue: 18500000, profit: 3700000, customers: 38 },
    { date: '2024-01-19', invoices: 52, quantity: 145, revenue: 21200000, profit: 4240000, customers: 42 },
    { date: '2024-01-18', invoices: 38, quantity: 98, revenue: 14800000, profit: 2960000, customers: 31 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <FileBarChart className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Sales Report
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Comprehensive sales performance analytics
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Total Sales</p>
          </div>
          <p className="text-2xl font-bold">1,245</p>
          <p className="text-xs opacity-75 mt-1">This month</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Revenue</p>
          </div>
          <p className="text-2xl font-bold">৳125M</p>
          <p className="text-xs opacity-75 mt-1">+12.5% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Profit</p>
          </div>
          <p className="text-2xl font-bold">৳25M</p>
          <p className="text-xs opacity-75 mt-1">20% margin</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 opacity-90" />
            <p className="text-sm opacity-90">Customers</p>
          </div>
          <p className="text-2xl font-bold">856</p>
          <p className="text-xs opacity-75 mt-1">Unique buyers</p>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input type="date" className="h-10" placeholder="From Date" />
          <Input type="date" className="h-10" placeholder="To Date" />
          <select className="h-10 px-3 rounded-md border bg-background">
            <option value="">All Branches</option>
            <option value="main">Main Branch</option>
            <option value="branch1">Branch 1</option>
          </select>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Invoices</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Quantity</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Revenue</th>
                <th className="text-right px-4 py-3 text-sm font-semibold">Profit</th>
                <th className="text-center px-4 py-3 text-sm font-semibold">Customers</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, i) => (
                <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.date}</td>
                  <td className="px-4 py-3 text-center">{row.invoices}</td>
                  <td className="px-4 py-3 text-center">{row.quantity}</td>
                  <td className="px-4 py-3 text-right font-medium">৳{row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">৳{row.profit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">{row.customers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
