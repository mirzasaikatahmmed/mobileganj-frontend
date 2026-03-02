'use client';

import { TrendingDown, Download, DollarSign, Receipt, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ExpenseReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7 text-destructive" />
            Expense Report
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Track and analyze business expenses</p>
        </div>
        <Button className="gap-2"><Download className="w-4 h-4" />Export</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Total Expenses</p></div>
          <p className="text-2xl font-bold">৳12.5M</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2"><Receipt className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Fixed Expenses</p></div>
          <p className="text-2xl font-bold">৳8.2M</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2"><PieChart className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Variable</p></div>
          <p className="text-2xl font-bold">৳4.3M</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2"><Receipt className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Categories</p></div>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
      <div className="bg-card border rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input type="date" className="h-10" />
          <Input type="date" className="h-10" />
          <select className="h-10 px-3 rounded-md border bg-background"><option>All Categories</option></select>
          <Button>Generate</Button>
        </div>
      </div>
      <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground">
        <TrendingDown className="w-16 h-16 mx-auto mb-3 opacity-30" />
        <p>Select filters to view expense breakdown</p>
      </div>
    </div>
  );
}
