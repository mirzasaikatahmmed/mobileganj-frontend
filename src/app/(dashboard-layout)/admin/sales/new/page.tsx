'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Printer, Package, CreditCard, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CustomerSearch from '../_components/CustomerSearch';
import ProductList from '../_components/ProductList';
import ProductCart from '../_components/ProductCart';
import PaymentSummary from '../_components/PaymentSummary';
import WarrantySettings from '../_components/WarrantySettings';
import { useCreateSale } from '@/hooks/use-sales';
import { CreateSaleDto } from '@/types/sale';

function getNow() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

interface CartItem {
  id: string;
  name: string;
  imei?: string;
  qty: number;
  price: number;
  stock: number;
  warrantyId?: string;
  batteryHealth?: number;
}

export default function NewSalePage() {
  const router = useRouter();
  const createSaleMutation = useCreateSale();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<'products' | 'cart' | 'payment' | null>(null);
  const [saleDateTime, setSaleDateTime] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bkash' | 'nagad' | 'bank'>('cash');
  const [paidAmount, setPaidAmount] = useState(0);
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [discountValue, setDiscountValue] = useState(0);

  const addToCart = (product: { id: string; name: string; price: number; stock: number; imei?: string }) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
      }
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        imei: product.imei,
        qty: 1,
        price: product.price,
        stock: product.stock,
      }]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, Math.min(item.stock, item.qty + delta)) } : item
    ));
  };

  const updateWarranty = (id: string, warrantyId: string) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, warrantyId } : item
    ));
  };

  const updateBatteryHealth = (id: string, batteryHealth: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, batteryHealth } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSave = async (printAfter = false) => {
    if (!customerPhone) {
      alert('Please enter customer phone number');
      return;
    }
    if (cart.length === 0) {
      alert('Please add products to cart');
      return;
    }

    const saleData: CreateSaleDto = {
      customerPhone,
      customerName: customerName || undefined,
      customerAddress: customerAddress || undefined,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.qty,
        unitPrice: item.price,
        imei: item.imei,
        batteryHealth: item.batteryHealth,
      })),
      paidAmount,
      paymentMethod,
      discountType: discountValue > 0 ? discountType : undefined,
      discountValue: discountValue > 0 ? discountValue : undefined,
    };

    try {
      const sale = await createSaleMutation.mutateAsync(saleData);
      if (printAfter) {
        router.push(`/admin/sales/invoice/${sale.invoiceNo}`);
      } else {
        router.push(`/admin/sales/${sale.id}`);
      }
    } catch (error) {
      console.error('Failed to create sale:', error);
    }
  };

  useEffect(() => { setSaleDateTime(getNow()); }, []);

  return (
    <div className="space-y-4 px-0 sm:px-0">
      <div className="card-base p-2 sticky top-0 z-30 bg-background/95 backdrop-blur border-x-0 sm:border-x">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center justify-between lg:justify-start gap-2 shrink-0">
            <div className="flex items-center gap-1">
              <Link href="/admin/sales">
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent shrink-0 -ml-1">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <h1 className="text-base sm:text-lg font-bold leading-none py-1 mb-0 whitespace-nowrap">New Sale</h1>
            </div>
          </div>

          <div className="flex-1 w-full">
            <CustomerSearch minimal />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-md border border-border/50 h-9 shrink-0">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Date</span>
              <input
                type="datetime-local"
                value={saleDateTime}
                onChange={(e) => setSaleDateTime(e.target.value)}
                className="bg-transparent border-none text-[11px] font-medium focus:ring-0 flex-1 lg:w-[165px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        <ProductCart
          cart={cart}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
          onUpdateWarranty={updateWarranty}
          onUpdateBatteryHealth={updateBatteryHealth}
        />
        <WarrantySettings />
      </div>

      <div className="lg:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-40">
        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setActiveDrawer('products')}>
          <Package className="w-6 h-6" />
        </Button>
        <Button size="lg" className="rounded-full w-14 h-14 shadow-lg" onClick={() => setActiveDrawer('payment')}>
          <CreditCard className="w-6 h-6" />
        </Button>
      </div>

      {activeDrawer && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setActiveDrawer(null)} />
      )}

      <div className={`lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${activeDrawer === 'products' ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Products</h2>
          <Button variant="ghost" size="icon" onClick={() => setActiveDrawer(null)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          <ProductList onAddToCart={addToCart} />
        </div>
      </div>

      <div className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${activeDrawer === 'payment' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Payment</h2>
          <Button variant="ghost" size="icon" onClick={() => setActiveDrawer(null)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-4">
          <PaymentSummary subtotal={subtotal} />
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => handleSave(false)} disabled={createSaleMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {createSaleMutation.isPending ? 'Saving...' : 'Save Sale'}
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => handleSave(true)} disabled={createSaleMutation.isPending}>
              <Printer className="w-4 h-4 mr-2" />
              Save & Print
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <ProductList onAddToCart={addToCart} />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <ProductCart
            cart={cart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onUpdateWarranty={updateWarranty}
            onUpdateBatteryHealth={updateBatteryHealth}
          />
          <WarrantySettings />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <PaymentSummary subtotal={subtotal} />

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => handleSave(false)} disabled={createSaleMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {createSaleMutation.isPending ? 'Saving...' : 'Save Sale'}
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => handleSave(true)} disabled={createSaleMutation.isPending}>
              <Printer className="w-4 h-4 mr-2" />
              Save & Print
            </Button>
            <Link href="/admin/sales" className="block">
              <Button variant="ghost" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
