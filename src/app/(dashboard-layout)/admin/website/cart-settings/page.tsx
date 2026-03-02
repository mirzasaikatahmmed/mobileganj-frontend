"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, ShoppingCart } from "lucide-react";

export default function CartSettingsPage() {
  const [settings, setSettings] = useState({
    enableCart: true,
    cartExpiry: 24,
    minOrderAmount: 1000,
    maxOrderAmount: 500000,
    allowGuestCheckout: true,
    showStockCount: true,
    autoApplyCoupon: false,
    enableWishlist: true,
    cartNotification: true,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Cart Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure shopping cart behavior and checkout</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Cart Configuration</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable Shopping Cart</label>
                <p className="text-xs text-muted-foreground">Allow customers to add items to cart</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableCart}
                onChange={(e) => setSettings({ ...settings, enableCart: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Cart Expiry (Hours)</label>
              <input
                type="number"
                value={settings.cartExpiry}
                onChange={(e) => setSettings({ ...settings, cartExpiry: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">Cart items will be removed after this time</p>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Minimum Order Amount (৳)</label>
              <input
                type="number"
                value={settings.minOrderAmount}
                onChange={(e) => setSettings({ ...settings, minOrderAmount: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Maximum Order Amount (৳)</label>
              <input
                type="number"
                value={settings.maxOrderAmount}
                onChange={(e) => setSettings({ ...settings, maxOrderAmount: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Checkout Options</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Guest Checkout</label>
                <p className="text-xs text-muted-foreground">Allow checkout without registration</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowGuestCheckout}
                onChange={(e) => setSettings({ ...settings, allowGuestCheckout: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Show Stock Count</label>
                <p className="text-xs text-muted-foreground">Display available quantity</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showStockCount}
                onChange={(e) => setSettings({ ...settings, showStockCount: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto Apply Coupon</label>
                <p className="text-xs text-muted-foreground">Automatically apply best coupon</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoApplyCoupon}
                onChange={(e) => setSettings({ ...settings, autoApplyCoupon: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable Wishlist</label>
                <p className="text-xs text-muted-foreground">Allow customers to save items</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableWishlist}
                onChange={(e) => setSettings({ ...settings, enableWishlist: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Cart Notifications</label>
                <p className="text-xs text-muted-foreground">Show cart update notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.cartNotification}
                onChange={(e) => setSettings({ ...settings, cartNotification: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
