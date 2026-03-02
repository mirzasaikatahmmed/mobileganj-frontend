'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Printer, Package, ShoppingCart, CreditCard, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CustomerSearch from '../_components/CustomerSearch';
import ProductList from '../_components/ProductList';
import ProductCart from '../_components/ProductCart';
import PaymentSummary from '../_components/PaymentSummary';
import WarrantySettings from '../_components/WarrantySettings';

interface CartItem {
  id: string;
  name: string;
  imei?: string;
  qty: number;
  price: number;
  stock: number;
}

export default function NewSalePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<'products' | 'cart' | 'payment' | null>(null);

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

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleSave = () => {
    const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
    console.log('Saving sale...', { cart, subtotal, invoiceNo });
    window.location.href = `/admin/sales/invoice/${invoiceNo}`;
  };

  const handleSaveAndPrint = () => {
    const invoiceNo = `INV-${Date.now().toString().slice(-6)}`;
    console.log('Saving and printing...', { cart, subtotal, invoiceNo });
    window.location.href = `/admin/sales/invoice/${invoiceNo}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">New Sale</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Create new invoice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">Invoice No:</span>
          <span className="font-mono font-bold text-sm sm:text-base">INV-{Date.now().toString().slice(-6)}</span>
        </div>
      </div>

      {/* Customer Search */}
      <CustomerSearch />

      {/* Mobile: Cart visible on screen */}
      <div className="lg:hidden space-y-4">
        <ProductCart 
          cart={cart}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
        />
        <WarrantySettings />
      </div>

      {/* Mobile: Floating Action Buttons */}
      <div className="lg:hidden fixed bottom-4 right-4 flex flex-col gap-3 z-40">
        <Button 
          size="lg" 
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setActiveDrawer('products')}
        >
          <Package className="w-6 h-6" />
        </Button>
        <Button 
          size="lg" 
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setActiveDrawer('payment')}
        >
          <CreditCard className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile: Drawer Overlay */}
      {activeDrawer && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setActiveDrawer(null)}
        />
      )}

      {/* Mobile: Product List Drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${
        activeDrawer === 'products' ? 'translate-x-0' : '-translate-x-full'
      }`}>
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

      {/* Mobile: Payment Drawer */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background shadow-xl z-50 transform transition-transform duration-300 ${
        activeDrawer === 'payment' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Payment</h2>
          <Button variant="ghost" size="icon" onClick={() => setActiveDrawer(null)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-4">
          <PaymentSummary subtotal={subtotal} />
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Sale
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleSaveAndPrint}>
              <Printer className="w-4 h-4 mr-2" />
              Save & Print
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: 3 Column Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6">
        {/* Left: Product List */}
        <div className="lg:col-span-3">
          <ProductList onAddToCart={addToCart} />
        </div>

        {/* Middle: Cart & Warranty */}
        <div className="lg:col-span-6 space-y-6">
          <ProductCart 
            cart={cart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
          />
          <WarrantySettings />
        </div>

        {/* Right: Payment Summary */}
        <div className="lg:col-span-3 space-y-6">
          <PaymentSummary subtotal={subtotal} />
          
          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Sale
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleSaveAndPrint}>
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
