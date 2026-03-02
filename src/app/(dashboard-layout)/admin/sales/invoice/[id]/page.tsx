'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockInvoice = {
  invoiceNo: 'INV-001234',
  date: '2024-01-29',
  customer: {
    name: 'Karim Ahmed',
    phone: '01712345678',
    address: 'Dhaka, Bangladesh',
  },
  items: [
    { id: '1', name: 'iPhone 15 Pro Max', imei: '123456789012345', qty: 1, price: 145000, warranty: '1 Year Official Warranty' },
    { id: '2', name: 'AirPods Pro 2', qty: 2, price: 25500, warranty: '6 Months Warranty' },
  ],
  subtotal: 196000,
  discount: 1000,
  grandTotal: 195000,
  paid: 195000,
  due: 0,
  paymentMethod: 'Cash',
  status: 'Paid',
};

export default function InvoicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-background border-b p-4 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" />
              Print Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 print:shadow-none">
          <div className="flex items-start justify-between mb-8 pb-6 border-b-2">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">INVOICE</h1>
              <p className="text-sm text-muted-foreground">Mobile GANJ</p>
              <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
              <p className="text-sm text-muted-foreground">Phone: 01700000000</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Invoice No</p>
              <p className="text-xl font-bold">{mockInvoice.invoiceNo}</p>
              <p className="text-sm text-muted-foreground mt-2">Date</p>
              <p className="font-medium">{new Date(mockInvoice.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">BILL TO</h3>
            <p className="font-semibold text-lg">{mockInvoice.customer.name}</p>
            <p className="text-sm">{mockInvoice.customer.phone}</p>
            <p className="text-sm text-muted-foreground">{mockInvoice.customer.address}</p>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-semibold text-sm">SL</th>
                  <th className="text-left p-3 font-semibold text-sm">Product</th>
                  <th className="text-center p-3 font-semibold text-sm">Qty</th>
                  <th className="text-right p-3 font-semibold text-sm">Price</th>
                  <th className="text-right p-3 font-semibold text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoice.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <p className="font-medium">{item.name}</p>
                      {item.imei && <p className="text-xs text-muted-foreground">IMEI: {item.imei}</p>}
                      <p className="text-xs text-muted-foreground">{item.warranty}</p>
                    </td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-right">৳{item.price.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium">৳{(item.price * item.qty).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">৳{mockInvoice.subtotal.toLocaleString()}</span>
              </div>
              {mockInvoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-medium text-red-600">-৳{mockInvoice.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Grand Total:</span>
                <span className="text-primary">৳{mockInvoice.grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Paid:</span>
                <span className="font-medium text-green-600">৳{mockInvoice.paid.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">{mockInvoice.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {mockInvoice.status}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p className="mb-2">Thank you for your business!</p>
            <p>For any queries, contact us at info@mobileganj.com</p>
          </div>

          <div className="flex justify-between mt-12 pt-8 border-t">
            <div className="text-center">
              <div className="border-t border-foreground w-40 mb-2"></div>
              <p className="text-sm">Customer Signature</p>
            </div>
            <div className="text-center">
              <div className="border-t border-foreground w-40 mb-2"></div>
              <p className="text-sm">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
