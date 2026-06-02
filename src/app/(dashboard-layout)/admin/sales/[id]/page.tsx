'use client';

import { use } from 'react';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSale } from '@/hooks/use-sales';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { format } from 'date-fns';

export default function SaleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: sale, isLoading } = useSale(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!sale) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Sale not found</h2>
        <Link href="/admin/sales">
          <Button>Back to Sales</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Invoice Details</h1>
            <p className="text-muted-foreground">{sale.invoiceNo}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/sales/invoice/${sale.invoiceNo}`}>
            <Button>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="card-base p-8 space-y-6">
        <div className="flex justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold">Mobile GANJ</h2>
            <p className="text-sm text-muted-foreground mt-1">Dhaka, Bangladesh</p>
            <p className="text-sm text-muted-foreground">Phone: 01712345678</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Invoice No</p>
            <p className="text-xl font-bold">{sale.invoiceNo}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Date: {format(new Date(sale.saleDate), 'dd MMM yyyy')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <p className="text-sm">{sale.customer.name}</p>
          <p className="text-sm text-muted-foreground">Phone: {sale.customer.phone}</p>
          {sale.customer.address && (
            <p className="text-sm text-muted-foreground">Address: {sale.customer.address}</p>
          )}
        </div>

        <div>
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">
                    <p className="font-medium">{item.product.title}</p>
                    {item.imei && (
                      <p className="text-xs text-muted-foreground">IMEI: {item.imei}</p>
                    )}
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">৳{item.unitPrice.toLocaleString()}</td>
                  <td className="text-right font-semibold">৳{item.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{sale.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>৳{sale.discountAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Grand Total</span>
              <span>৳{sale.grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Paid</span>
              <span>৳{sale.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Due</span>
              <span>৳{sale.dueAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-medium capitalize">{sale.paymentMethod}</p>
          </div>
          <div>
            <span className={`px-4 py-2 rounded-full font-medium ${
              sale.status === 'paid' ? 'bg-green-100 text-green-700' :
              sale.status === 'partial_paid' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {sale.status === 'paid' ? 'Paid' : sale.status === 'partial_paid' ? 'Partial Paid' : 'Due'}
            </span>
          </div>
        </div>

        {sale.note && (
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Note</p>
            <p className="text-sm">{sale.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
