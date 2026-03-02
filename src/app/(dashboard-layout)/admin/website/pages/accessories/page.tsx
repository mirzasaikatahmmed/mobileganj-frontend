'use client';

import { Headphones, Plus, Edit, Trash2, Eye, Image, FolderTree, Settings, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function AccessoriesPageManagementPage() {
  const [activeTab, setActiveTab] = useState('categories');

  const categories = [
    { id: 1, name: 'Earphones & Headphones', products: 45, enabled: true, order: 1 },
    { id: 2, name: 'Phone Cases', products: 128, enabled: true, order: 2 },
    { id: 3, name: 'Screen Protectors', products: 89, enabled: true, order: 3 },
    { id: 4, name: 'Chargers & Cables', products: 67, enabled: true, order: 4 },
    { id: 5, name: 'Power Banks', products: 34, enabled: true, order: 5 },
    { id: 6, name: 'Smart Watches', products: 23, enabled: false, order: 6 },
  ];

  const featuredAccessories = [
    { id: 1, name: 'AirPods Pro 2', category: 'Earphones', price: 30000, stock: 45, featured: true },
    { id: 2, name: 'Samsung Galaxy Buds 2', category: 'Earphones', price: 12000, stock: 32, featured: true },
    { id: 3, name: 'Anker PowerCore 20000', category: 'Power Banks', price: 3500, stock: 28, featured: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Accessories Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage accessories categories and featured items
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
            { id: 'categories', label: 'Categories', icon: FolderTree },
            { id: 'featured', label: 'Featured Items', icon: Headphones },
            { id: 'banner', label: 'Page Banner', icon: Image },
            { id: 'display', label: 'Display Settings', icon: Grid },
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
          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Accessory Categories</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Category
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Category Name</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Products</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Order</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{category.name}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[60px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-sm font-medium">
                            {category.products}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">{category.order}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            category.enabled
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                              : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                          }`}>
                            {category.enabled ? 'Enabled' : 'Disabled'}
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

          {/* Featured Items Tab */}
          {activeTab === 'featured' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Featured Accessories</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Category</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold">Price</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Stock</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredAccessories.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-sm">{item.category}</td>
                        <td className="px-4 py-3 text-right">৳{item.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">{item.stock}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                            Featured
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
                  <Input placeholder="Phone Accessories" defaultValue="Phone Accessories" />
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

          {/* Display Settings Tab */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Display Settings</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Category Filter</p>
                    <p className="text-sm text-muted-foreground">Enable category sidebar filter</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <Button className="w-full">Save Display Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
