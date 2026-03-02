'use client';

import { Smartphone, Plus, Edit, Trash2, Eye, Image, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function BuyPhonePageManagementPage() {
  const [activeTab, setActiveTab] = useState('banner');

  const featuredPhones = [
    { id: 1, name: 'iPhone 15 Pro Max', brand: 'Apple', price: 150000, stock: 25, featured: true },
    { id: 2, name: 'Samsung S24 Ultra', brand: 'Samsung', price: 130000, stock: 18, featured: true },
    { id: 3, name: 'Google Pixel 8 Pro', brand: 'Google', price: 95000, stock: 12, featured: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Buy Phone Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage buy phone page content and settings
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
            { id: 'banner', label: 'Page Banner', icon: Image },
            { id: 'featured', label: 'Featured Phones', icon: Smartphone },
            { id: 'filters', label: 'Filters', icon: Filter },
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
          {/* Banner Tab */}
          {activeTab === 'banner' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Page Banner</h3>
              
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Image className="w-16 h-16 mx-auto mb-3 text-muted-foreground opacity-30" />
                <p className="text-sm text-muted-foreground mb-3">Current banner image</p>
                <Button variant="outline">Change Banner</Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Banner Title</Label>
                  <Input placeholder="Buy Latest Smartphones" defaultValue="Buy Latest Smartphones" />
                </div>
                <div className="space-y-2">
                  <Label>Banner Subtitle</Label>
                  <Textarea placeholder="Find your perfect phone..." rows={2} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Banner</p>
                    <p className="text-sm text-muted-foreground">Display banner on page</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <Button className="w-full">Save Banner Settings</Button>
              </div>
            </div>
          )}

          {/* Featured Phones Tab */}
          {activeTab === 'featured' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Featured Phones</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Phone
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Phone</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Brand</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold">Price</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Stock</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredPhones.map((phone) => (
                      <tr key={phone.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{phone.name}</td>
                        <td className="px-4 py-3 text-sm">{phone.brand}</td>
                        <td className="px-4 py-3 text-right">৳{phone.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">{phone.stock}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            phone.featured
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                              : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                          }`}>
                            {phone.featured ? 'Featured' : 'Not Featured'}
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

          {/* Filters Tab */}
          {activeTab === 'filters' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Phone Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Brand Filter', enabled: true },
                  { label: 'Price Range', enabled: true },
                  { label: 'Storage', enabled: true },
                  { label: 'RAM', enabled: true },
                  { label: 'Camera', enabled: false },
                  { label: 'Battery', enabled: false },
                ].map((filter, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">{filter.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={filter.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
              <Button className="w-full">Save Filter Settings</Button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Page Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Products Per Page</Label>
                  <Input type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label>Default Sorting</Label>
                  <select className="w-full h-10 px-3 rounded-md border bg-background">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Selling</option>
                  </select>
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
