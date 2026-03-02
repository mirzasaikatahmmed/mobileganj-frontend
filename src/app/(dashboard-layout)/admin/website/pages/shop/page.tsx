'use client';

import { Store, Plus, Edit, Trash2, Eye, Filter, Settings, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function ShopPageManagementPage() {
  const [activeTab, setActiveTab] = useState('filters');

  const filters = [
    { id: 1, name: 'Price Range', type: 'range', enabled: true, order: 1 },
    { id: 2, name: 'Brand', type: 'checkbox', enabled: true, order: 2 },
    { id: 3, name: 'Category', type: 'checkbox', enabled: true, order: 3 },
    { id: 4, name: 'Storage', type: 'checkbox', enabled: true, order: 4 },
    { id: 5, name: 'RAM', type: 'checkbox', enabled: false, order: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Store className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Shop Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Configure shop page filters and display
          </p>
        </div>
        <Button className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Shop
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'filters', label: 'Filters', icon: Filter },
            { id: 'sorting', label: 'Sorting Options', icon: List },
            { id: 'display', label: 'Display Settings', icon: Grid },
            { id: 'seo', label: 'SEO Settings', icon: Settings },
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
          {/* Filters Tab */}
          {activeTab === 'filters' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Product Filters</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Filter
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Filter Name</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Order</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filters.map((filter) => (
                      <tr key={filter.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{filter.name}</td>
                        <td className="px-4 py-3 text-sm capitalize">{filter.type}</td>
                        <td className="px-4 py-3 text-center">{filter.order}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            filter.enabled
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                              : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                          }`}>
                            {filter.enabled ? 'Enabled' : 'Disabled'}
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

          {/* Sorting Tab */}
          {activeTab === 'sorting' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sorting Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Price: Low to High', enabled: true },
                  { label: 'Price: High to Low', enabled: true },
                  { label: 'Newest First', enabled: true },
                  { label: 'Best Selling', enabled: true },
                  { label: 'Most Popular', enabled: false },
                  { label: 'Rating', enabled: false },
                ].map((option, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">{option.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={option.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
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
                    <Label>Default View</Label>
                    <select className="w-full h-10 px-3 rounded-md border bg-background">
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Grid Columns</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="columns" id="col2" />
                      <label htmlFor="col2">2 Columns</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="columns" id="col3" defaultChecked />
                      <label htmlFor="col3">3 Columns</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="columns" id="col4" />
                      <label htmlFor="col4">4 Columns</label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Quick View</p>
                    <p className="text-sm text-muted-foreground">Enable quick view button on products</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <Button className="w-full">Save Display Settings</Button>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">SEO Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input placeholder="Shop - Mobile GANJ" defaultValue="Shop - Mobile GANJ" />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Input placeholder="Browse our collection..." />
                </div>
                <Button>Save SEO Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
