'use client';

import { Calendar, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ExpenseReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Expense Reports</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Generate expense reports</p>
      </div>

      <div className="bg-card border rounded-lg p-4 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Generate Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input type="date" />
          </div>
        </div>
        <Button className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
              <p className="text-xl sm:text-2xl font-bold">৳87,500</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Last Month</p>
              <p className="text-xl sm:text-2xl font-bold">৳95,200</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">This Year</p>
              <p className="text-xl sm:text-2xl font-bold">৳1,85,000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Month</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Fixed</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Unfixed</th>
                <th className="text-left p-3 sm:p-4 font-semibold text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-muted/50">
                <td className="p-3 sm:p-4 text-sm">January 2024</td>
                <td className="p-3 sm:p-4 text-sm font-semibold">৳85,000</td>
                <td className="p-3 sm:p-4 text-sm font-semibold">৳2,500</td>
                <td className="p-3 sm:p-4 text-sm font-bold">৳87,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
