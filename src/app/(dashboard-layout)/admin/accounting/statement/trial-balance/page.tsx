'use client';
import { Scale, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrialBalancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2"><Scale className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />Trial Balance</h1><p className="text-muted-foreground text-sm sm:text-base mt-1">Debit and credit balance verification</p></div>
        <Button className="gap-2"><Download className="w-4 h-4" />Export</Button>
      </div>
      <div className="bg-card border rounded-lg p-4"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"><Input type="date" className="h-10" placeholder="As of Date" defaultValue={new Date().toISOString().split('T')[0]} /><select className="h-10 px-3 rounded-md border bg-background"><option>All Accounts</option></select><Button>Generate</Button></div></div>
      <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground"><Scale className="w-16 h-16 mx-auto mb-3 opacity-30" /><p>Trial balance statement will appear here</p></div>
    </div>
  );
}
