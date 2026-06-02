'use client';

import { useState } from 'react';
import { useSales } from '@/hooks/use-sales';
import { useCreateSaleReturn } from '@/hooks/use-sale-returns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreateSaleReturnDto } from '@/types/sale-return';

export default function NewReturnPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [returnItems, setReturnItems] = useState<any[]>([]);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const { data: salesData } = useSales({ search, limit: 10 });
  const createReturn = useCreateSaleReturn();

  const handleSelectSale = (sale: any) => {
    setSelectedSale(sale);
    setReturnItems(
      sale.items.map((item: any) => ({
        saleItemId: item.id,
        productId: item.productId,
        productName: item.product?.name,
        maxQuantity: item.quantity,
        quantity: 0,
        unitPrice: item.unitPrice,
        reason: '',
      }))
    );
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updated = [...returnItems];
    updated[index].quantity = Math.min(quantity, updated[index].maxQuantity);
    setReturnItems(updated);
  };

  const handleSubmit = () => {
    const items = returnItems.filter((item) => item.quantity > 0);

    if (!selectedSale || items.length === 0 || !reason) {
      return;
    }

    const dto: CreateSaleReturnDto = {
      saleId: selectedSale.id,
      items: items.map((item) => ({
        saleItemId: item.saleItemId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        reason: item.reason,
      })),
      reason,
      notes,
    };

    createReturn.mutate(dto, {
      onSuccess: () => {
        router.push('/admin/sales/returns');
      },
    });
  };

  const totalAmount = returnItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/sales/returns">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">New Return</h1>
      </div>

      {!selectedSale ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Sale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by invoice number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              {salesData?.data?.map((sale: any) => (
                <div
                  key={sale.id}
                  onClick={() => handleSelectSale(sale)}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{sale.invoiceNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        {sale.customer?.name || 'Walk-in'} • {sale.items?.length} items
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">৳{Number(sale.totalAmount).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(sale.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sale: {selectedSale.invoiceNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Customer:</span>{' '}
                  {selectedSale.customer?.name || 'Walk-in'}
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>{' '}
                  {new Date(selectedSale.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-center p-2">Max Qty</th>
                    <th className="text-center p-2">Return Qty</th>
                    <th className="text-right p-2">Unit Price</th>
                    <th className="text-right p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {returnItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.productName}</td>
                      <td className="p-2 text-center">{item.maxQuantity}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          min="0"
                          max={item.maxQuantity}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                          className="w-20 mx-auto"
                        />
                      </td>
                      <td className="p-2 text-right">৳{Number(item.unitPrice).toLocaleString()}</td>
                      <td className="p-2 text-right">
                        ৳{(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-bold">
                    <td colSpan={4} className="p-2 text-right">
                      Total:
                    </td>
                    <td className="p-2 text-right">৳{totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Return Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Reason *</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter return reason..."
                  rows={3}
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setSelectedSale(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={returnItems.filter((i) => i.quantity > 0).length === 0 || !reason || createReturn.isPending}
            >
              {createReturn.isPending ? 'Creating...' : 'Create Return'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
