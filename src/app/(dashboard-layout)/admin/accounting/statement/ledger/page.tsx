'use client';
import { BookText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LedgerReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2"><BookText className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />Ledger Report</h1><p className="text-muted-foreground text-sm sm:text-base mt-1">Account-wise transaction ledger</p></div>
        <Button className="gap-2"><Download className="w-4 h-4" />Export</Button>
      </div>
      <div className="bg-card border rounded-lg p-4"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"><select className="h-10 px-3 rounded-md border bg-background"><option>Select Account</option><option>Cash</option><option>Bank</option><option>Sales</option><option>Purchase</option></select><Input type="date" className="h-10" /><Input type="date" className="h-10" /><Button>Generate</Button></div></div>
      <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground"><BookText className="w-16 h-16 mx-auto mb-3 opacity-30" /><p>Select account to view ledger</p></div>
    </div>
  );
}
