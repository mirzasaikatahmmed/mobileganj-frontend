'use client';

import { Calendar, Download, Wrench, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ServiceReportsPage() {
  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Service Reports</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Generate service reports</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Jobs</p>
              <p className="text-xl sm:text-2xl font-bold">156</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Service Income</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">৳3,85,000</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
              <p className="text-xl sm:text-2xl font-bold">45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
