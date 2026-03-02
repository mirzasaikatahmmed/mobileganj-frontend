'use client';
import { Package, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StockReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2"><Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />Stock Report</h1><p className="text-muted-foreground text-sm sm:text-base mt-1">Inventory movement analytics</p></div>
        <Button className="gap-2"><Download className="w-4 h-4" />Export</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4"><div className="flex items-center gap-2 mb-2"><Package className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Total Stock</p></div><p className="text-2xl font-bold">3,245</p></div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4"><div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Stock In</p></div><p className="text-2xl font-bold">+856</p></div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4"><div className="flex items-center gap-2 mb-2"><TrendingDown className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Stock Out</p></div><p className="text-2xl font-bold">-689</p></div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4"><div className="flex items-center gap-2 mb-2"><Package className="w-5 h-5 opacity-90" /><p className="text-sm opacity-90">Net Change</p></div><p className="text-2xl font-bold">+167</p></div>
      </div>
      <div className="bg-card border rounded-lg p-4"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"><Input type="date" className="h-10" /><Input type="date" className="h-10" /><Button>Generate</Button></div></div>
      <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground"><Package className="w-16 h-16 mx-auto mb-3 opacity-30" /><p>Stock movement details will appear here</p></div>
    </div>
  );
}
