'use client';

import { useState } from 'react';
import { Search, DollarSign, AlertCircle, CheckCircle, Clock, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const mockDues = [
  { id: '1', customerName: 'Karim Ahmed', phone: '01711223344', invoiceNo: 'INV-001234', totalAmount: 85000, paidAmount: 50000, dueAmount: 35000, dueDate: '2024-02-15', status: 'Overdue' },
  { id: '2', customerName: 'Rahim Uddin', phone: '01811223344', invoiceNo: 'INV-001235', totalAmount: 125000, paidAmount: 100000, dueAmount: 25000, dueDate: '2024-02-20', status: 'Due' },
  { id: '3', customerName: 'Fatema Begum', phone: '01911223344', invoiceNo: 'INV-001236', totalAmount: 65000, paidAmount: 40000, dueAmount: 25000, dueDate: '2024-02-25', status: 'Upcoming' },
];

export default function DueCollectionPage() {
  const [search, setSearch] = useState('');
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [selectedDue, setSelectedDue] = useState<any>(null);
  const [collectAmount, setCollectAmount] = useState('');

  const filtered = mockDues.filter(d => 
    d.customerName.toLowerCase().includes(search.toLowerCase()) || 
    d.phone.includes(search) ||
    d.invoiceNo.includes(search)
  );

  const totalDue = mockDues.reduce((sum, d) => sum + d.dueAmount, 0);
  const overdueDue = mockDues.filter(d => d.status === 'Overdue').reduce((sum, d) => sum + d.dueAmount, 0);

  const handleCollect = (due: any) => {
    setSelectedDue(due);
    setCollectAmount(due.dueAmount.toString());
    setShowCollectModal(true);
  };

  const handleSubmitCollection = () => {
    console.log('Collecting:', { due: selectedDue, amount: collectAmount });
    setShowCollectModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Due Collection</h1>
          <p className="text-muted-foreground">Track and collect customer dues</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Due</p>
              <p className="text-2xl font-bold">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-2xl font-bold">৳{overdueDue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Invoices</p>
              <p className="text-2xl font-bold">{mockDues.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by customer, phone, or invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Customer</th>
              <th className="text-left p-4 font-semibold">Invoice</th>
              <th className="text-left p-4 font-semibold">Total Amount</th>
              <th className="text-left p-4 font-semibold">Paid</th>
              <th className="text-left p-4 font-semibold">Due Amount</th>
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
                    <p className="font-medium">{due.customerName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {due.phone}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-mono text-sm">{due.invoiceNo}</p>
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
                  <Badge variant={
                    due.status === 'Overdue' ? 'destructive' : 
                    due.status === 'Due' ? 'default' : 
                    'secondary'
                  }>
                    {due.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => handleCollect(due)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Collect
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Collection Modal */}
      {showCollectModal && selectedDue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold">Collect Payment</h2>
            
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{selectedDue.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice:</span>
                <span className="font-mono">{selectedDue.invoiceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Due:</span>
                <span className="font-bold text-red-600">৳{selectedDue.dueAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectAmount">Collection Amount</Label>
              <Input
                id="collectAmount"
                type="number"
                placeholder="Enter amount"
                value={collectAmount}
                onChange={(e) => setCollectAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select id="paymentMethod" className="w-full h-12 px-4 rounded-md border bg-background">
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input id="note" placeholder="Payment note..." />
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={handleSubmitCollection}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Collection
              </Button>
              <Button variant="outline" onClick={() => setShowCollectModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
