'use client';

import { useState } from 'react';
import { Search, DollarSign, AlertCircle, CheckCircle, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const mockDues = [
  { id: '1', supplierName: 'Tech Supplies Ltd', phone: '01711223344', purchaseNo: 'PUR-001234', totalAmount: 450000, paidAmount: 300000, dueAmount: 150000, dueDate: '2024-02-15', status: 'Overdue' },
  { id: '2', supplierName: 'Gadget Hub', phone: '01911223344', purchaseNo: 'PUR-001235', totalAmount: 285000, paidAmount: 200000, dueAmount: 85000, dueDate: '2024-02-20', status: 'Due' },
];

export default function SupplierPaymentDuePage() {
  const [search, setSearch] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedDue, setSelectedDue] = useState<any>(null);

  const filtered = mockDues.filter(d => 
    d.supplierName.toLowerCase().includes(search.toLowerCase()) || 
    d.phone.includes(search)
  );

  const totalDue = mockDues.reduce((sum, d) => sum + d.dueAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Due</h1>
        <p className="text-muted-foreground">Track supplier payment dues</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Due</p>
              <p className="text-2xl font-bold text-red-600">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-bold">{mockDues.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by supplier or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Supplier</th>
              <th className="text-left p-4 font-semibold">Purchase No</th>
              <th className="text-left p-4 font-semibold">Total</th>
              <th className="text-left p-4 font-semibold">Paid</th>
              <th className="text-left p-4 font-semibold">Due</th>
              <th className="text-left p-4 font-semibold">Due Date</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-right p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((due) => (
              <tr key={due.id} className="border-t hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{due.supplierName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {due.phone}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-mono text-sm">{due.purchaseNo}</p>
                </td>
                <td className="p-4">
                  <p className="font-semibold">৳{due.totalAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <p className="text-green-600 font-medium">৳{due.paidAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <p className="text-red-600 font-bold">৳{due.dueAmount.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {due.dueDate}
                  </p>
                </td>
                <td className="p-4">
                  <Badge variant={due.status === 'Overdue' ? 'destructive' : 'default'}>
                    {due.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => { setSelectedDue(due); setShowPayModal(true); }}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Pay
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPayModal && selectedDue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold">Make Payment</h2>
            
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supplier:</span>
                <span className="font-medium">{selectedDue.supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase:</span>
                <span className="font-mono">{selectedDue.purchaseNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Amount:</span>
                <span className="font-bold text-red-600">৳{selectedDue.dueAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Amount</Label>
              <Input type="number" placeholder="Enter amount" defaultValue={selectedDue.dueAmount} />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <select className="w-full h-12 px-4 rounded-md border bg-background">
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => setShowPayModal(false)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Payment
              </Button>
              <Button variant="outline" onClick={() => setShowPayModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
