'use client';

import { Plane, Plus, Edit, Trash2, Eye, Package, Clock, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function PreOrderPageManagementPage() {
  const [activeTab, setActiveTab] = useState('products');

  const preOrderProducts = [
    { id: 1, name: 'iPhone 16 Pro Max', source: 'Dubai', price: 165000, deliveryDays: '3-7', status: 'available', orders: 12 },
    { id: 2, name: 'Samsung S25 Ultra', source: 'Singapore', price: 145000, deliveryDays: '5-10', status: 'available', orders: 8 },
    { id: 3, name: 'Google Pixel 9 Pro', source: 'Dubai', price: 105000, deliveryDays: '3-7', status: 'coming-soon', orders: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Pre-Order Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage pre-order products and delivery information
          </p>
        </div>
        <Button className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Page
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'products', label: 'Pre-Order Products', icon: Package },
            { id: 'delivery', label: 'Delivery Info', icon: MapPin },
            { id: 'orders', label: 'Orders', icon: Clock },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Pre-Order Products</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Source</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold">Price</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Delivery</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Orders</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preOrderProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-xs">
                            <Plane className="w-3 h-3" />
                            {product.source}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">৳{product.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-sm">{product.deliveryDays} days</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[50px] px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 text-sm font-medium">
                            {product.orders}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.status === 'available'
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                              : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600'
                          }`}>
                            {product.status === 'available' ? 'Available' : 'Coming Soon'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Delivery Info Tab */}
          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Delivery Information</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dubai Delivery Time</Label>
                    <Input placeholder="3-7 days" defaultValue="3-7 days" />
                  </div>
                  <div className="space-y-2">
                    <Label>Singapore Delivery Time</Label>
                    <Input placeholder="5-10 days" defaultValue="5-10 days" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Process Description</Label>
                  <Textarea 
                    placeholder="Explain the pre-order and delivery process..." 
                    rows={4}
                    defaultValue="We import products directly from Dubai and Singapore. Once you place a pre-order, we'll process it within 24 hours and deliver to your doorstep within the estimated time."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Textarea 
                    placeholder="Payment terms and conditions..." 
                    rows={3}
                    defaultValue="50% advance payment required. Remaining 50% on delivery. Full refund if delivery exceeds promised time."
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Delivery Timeline</p>
                    <p className="text-sm text-muted-foreground">Display step-by-step delivery process</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <Button className="w-full">Save Delivery Info</Button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Pre-Order Submissions</h3>
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p>Pre-order submissions will appear here</p>
                <p className="text-sm mt-1">Track and manage customer pre-orders</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Page Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input placeholder="Pre-Order - Import from Dubai" defaultValue="Pre-Order - Import from Dubai" />
                </div>
                <div className="space-y-2">
                  <Label>Page Description</Label>
                  <Textarea placeholder="Pre-order latest phones..." rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Minimum Advance Payment (%)</Label>
                  <Input type="number" defaultValue="50" />
                  <p className="text-xs text-muted-foreground">Percentage of total price required as advance</p>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Enable Pre-Orders</p>
                    <p className="text-sm text-muted-foreground">Allow customers to place pre-orders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <Button className="w-full">Save Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
