'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSaleByInvoice } from '@/hooks/use-sales';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { format } from 'date-fns';

export default function InvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: sale, isLoading } = useSaleByInvoice(params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Invoice not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

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
              <p className="text-xl font-bold">{sale.invoiceNo}</p>
              <p className="text-sm text-muted-foreground mt-2">Date</p>
              <p className="font-medium">{format(new Date(sale.saleDate), 'dd MMM yyyy')}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">BILL TO</h3>
            <p className="font-semibold text-lg">{sale.customer.name}</p>
            <p className="text-sm">{sale.customer.phone}</p>
            {sale.customer.address && (
              <p className="text-sm text-muted-foreground">{sale.customer.address}</p>
            )}
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
                {sale.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <p className="font-medium">{item.product.title}</p>
                      {item.imei && <p className="text-xs text-muted-foreground">IMEI: {item.imei}</p>}
                      {item.warrantyMonths && (
                        <p className="text-xs text-muted-foreground">{item.warrantyMonths} Months Warranty</p>
                      )}
                      {item.customWarrantyText && (
                        <p className="text-xs text-muted-foreground">{item.customWarrantyText}</p>
                      )}
                    </td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">৳{item.unitPrice.toLocaleString()}</td>
                    <td className="p-3 text-right font-medium">৳{item.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">৳{sale.subtotal.toLocaleString()}</span>
              </div>
              {sale.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-medium text-red-600">-৳{sale.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Grand Total:</span>
                <span className="text-primary">৳{sale.grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Paid:</span>
                <span className="font-medium text-green-600">৳{sale.paidAmount.toLocaleString()}</span>
              </div>
              {sale.dueAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium text-red-600">৳{sale.dueAmount.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium capitalize">{sale.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  sale.status === 'paid' ? 'bg-green-100 text-green-700' :
                  sale.status === 'partial_paid' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {sale.status === 'paid' ? 'Paid' : sale.status === 'partial_paid' ? 'Partial Paid' : 'Due'}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Warranty & Terms Section ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 border rounded-xl bg-card/30">
            {/* Warranty Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Warranty Policy</h4>
              </div>
              <ul className="space-y-2 text-[11px] text-muted-foreground list-disc pl-4 leading-relaxed">
                <li>Warranty is applicable as per company rules and regulations.</li>
                <li>Warranty will be effective based on the IMEI number provided at the time of purchase.</li>
                <li>Warranty is only applicable for hardware manufacturing defects.</li>
                <li>Software-related issues and OS modifications are not covered under warranty.</li>
                <li>No services will be provided after the warranty period expires.</li>
              </ul>
            </div>

            {/* Terms Column */}
            <div className="md:border-l md:pl-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <h4 className="font-bold text-sm uppercase tracking-wider">Terms & Conditions</h4>
              </div>
              <ul className="space-y-2 text-[11px] text-muted-foreground list-disc pl-4 leading-relaxed">
                <li>Any physical damage (broken, water damage, etc.) will void the warranty.</li>
                <li>Warranty will be void if the device is serviced by an unauthorized person.</li>
                <li>Product exchange or return is only acceptable within the specified time limit.</li>
                <li>All complaints will be accepted only upon presentation of the original bill.</li>
                <li>The company's decision will be considered final in all matters.</li>
              </ul>
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
