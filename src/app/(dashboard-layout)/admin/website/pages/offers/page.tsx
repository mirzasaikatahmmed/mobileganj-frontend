'use client';

import { Tag, Plus, Edit, Trash2, Eye, Percent, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function OffersPageManagementPage() {
  const [activeTab, setActiveTab] = useState('active');

  const activeOffers = [
    { id: 1, title: 'Flash Sale - 20% Off', products: 15, discount: 20, type: 'percentage', startDate: '2024-01-15', endDate: '2024-01-31', status: 'active' },
    { id: 2, title: 'New Year Special', products: 8, discount: 5000, type: 'fixed', startDate: '2024-01-01', endDate: '2024-01-15', status: 'active' },
  ];

  const expiredOffers = [
    { id: 3, title: 'Winter Sale', products: 12, discount: 15, type: 'percentage', startDate: '2023-12-01', endDate: '2023-12-31', status: 'expired' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Offers Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage deals, discounts and promotional offers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Offer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Active Offers</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Products on Sale</p>
          <p className="text-2xl font-bold mt-1">45</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Avg Discount</p>
          <p className="text-2xl font-bold mt-1">18%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Scheduled</p>
          <p className="text-2xl font-bold mt-1">5</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'active', label: 'Active Offers', count: 12 },
            { id: 'scheduled', label: 'Scheduled', count: 5 },
            { id: 'expired', label: 'Expired', count: 8 },
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
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-muted text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Active Offers Tab */}
          {activeTab === 'active' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Active Offers</h3>
              </div>

              <div className="space-y-3">
                {activeOffers.map((offer) => (
                  <div key={offer.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{offer.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {offer.products} products
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {offer.startDate} to {offer.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                        <Percent className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">
                          {offer.type === 'percentage' ? `${offer.discount}% OFF` : `৳${offer.discount} OFF`}
                        </span>
                      </div>
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scheduled Tab */}
          {activeTab === 'scheduled' && (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Scheduled offers will appear here</p>
              <p className="text-sm mt-1">Offers that will start in the future</p>
            </div>
          )}

          {/* Expired Tab */}
          {activeTab === 'expired' && (
            <div className="space-y-3">
              {expiredOffers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4 opacity-60">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{offer.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{offer.products} products</span>
                        <span>{offer.startDate} to {offer.endDate}</span>
                      </div>
                    </div>
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-gray-50 dark:bg-gray-950/30 text-gray-600 text-xs font-medium">
                      Expired
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Offers Page Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input placeholder="Special Offers & Deals" defaultValue="Special Offers & Deals" />
                </div>
                <div className="space-y-2">
                  <Label>Page Description</Label>
                  <Textarea placeholder="Browse our latest offers..." rows={2} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Countdown Timer</p>
                    <p className="text-sm text-muted-foreground">Display countdown for limited time offers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Discount Badge</p>
                    <p className="text-sm text-muted-foreground">Display discount percentage on product cards</p>
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
