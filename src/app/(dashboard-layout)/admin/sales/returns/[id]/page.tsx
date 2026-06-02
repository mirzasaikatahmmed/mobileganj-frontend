'use client';

import { use, useState } from 'react';
import { useSaleReturn, useUpdateSaleReturn, useDeleteSaleReturn } from '@/hooks/use-sale-returns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function ReturnDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: saleReturn, isLoading } = useSaleReturn(parseInt(id));
  const updateReturn = useUpdateSaleReturn();
  const deleteReturn = useDeleteSaleReturn();

  const [status, setStatus] = useState('');
  const [refundMethod, setRefundMethod] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [notes, setNotes] = useState('');

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!saleReturn) return <div className="p-6">Return not found</div>;

  const statusColors = {
    pending: 'bg-yellow-500',
    approved: 'bg-blue-500',
    rejected: 'bg-red-500',
    completed: 'bg-green-500',
  };

  const handleUpdate = () => {
    const dto: any = {};
    if (status) dto.status = status;
    if (refundMethod) dto.refundMethod = refundMethod;
    if (refundAmount) dto.refundAmount = parseFloat(refundAmount);
    if (notes) dto.notes = notes;

    updateReturn.mutate({ id: saleReturn.id, dto });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this return?')) {
      deleteReturn.mutate(saleReturn.id, {
        onSuccess: () => router.push('/admin/sales/returns'),
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales/returns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{saleReturn.returnNumber}</h1>
            <p className="text-muted-foreground">
              Invoice: {saleReturn.sale?.invoiceNumber}
            </p>
          </div>
        </div>
        {saleReturn.status === 'pending' && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Return Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={statusColors[saleReturn.status as keyof typeof statusColors]}>
                {saleReturn.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span>{saleReturn.customer?.name || 'Walk-in'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{format(new Date(saleReturn.createdAt), 'dd MMM yyyy, hh:mm a')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-bold">৳{Number(saleReturn.totalAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Refund Amount:</span>
              <span className="font-bold text-green-600">
                ৳{Number(saleReturn.refundAmount).toLocaleString()}
              </span>
            </div>
            {saleReturn.refundMethod && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Refund Method:</span>
                <span className="capitalize">{saleReturn.refundMethod.replace('_', ' ')}</span>
              </div>
            )}
            <div className="pt-3 border-t">
              <div className="text-sm text-muted-foreground mb-1">Reason:</div>
              <div>{saleReturn.reason}</div>
            </div>
            {saleReturn.notes && (
              <div className="pt-3 border-t">
                <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                <div>{saleReturn.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Return</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Status</Label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select status...</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <Label>Refund Method</Label>
              <select
                value={refundMethod}
                onChange={(e) => setRefundMethod(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select method...</option>
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="store_credit">Store Credit</option>
              </select>
            </div>
            <div>
              <Label>Refund Amount</Label>
              <Input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="Enter refund amount..."
              />
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
            <Button onClick={handleUpdate} disabled={updateReturn.isPending} className="w-full">
              {updateReturn.isPending ? 'Updating...' : 'Update Return'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Product</th>
                <th className="text-center p-3">Quantity</th>
                <th className="text-right p-3">Unit Price</th>
                <th className="text-right p-3">Total</th>
                <th className="text-left p-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {saleReturn.items?.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.product?.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">৳{Number(item.unitPrice).toLocaleString()}</td>
                  <td className="p-3 text-right">৳{Number(item.totalPrice).toLocaleString()}</td>
                  <td className="p-3 text-sm text-muted-foreground">{item.reason || '-'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan={3} className="p-3 text-right">
                  Total:
                </td>
                <td className="p-3 text-right">৳{Number(saleReturn.totalAmount).toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
