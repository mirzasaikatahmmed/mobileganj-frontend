'use client';

import { Image, Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function HeroBannersManagementPage() {
  const [activeTab, setActiveTab] = useState('banners');

  const banners = [
    { id: 1, title: 'iPhone 15 Pro Max', subtitle: 'Titanium. So strong. So light.', ctaText: 'Shop Now', ctaLink: '/product/iphone-15', order: 1, active: true },
    { id: 2, title: 'Samsung Galaxy S24 Ultra', subtitle: 'AI is here', ctaText: 'Pre-Order', ctaLink: '/pre-order', order: 2, active: true },
    { id: 3, title: 'Special Offer', subtitle: 'Up to 20% off on accessories', ctaText: 'View Offers', ctaLink: '/offers', order: 3, active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Image className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Hero Banners Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage homepage hero slider banners
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Banner
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'banners', label: 'Banners', count: 3 },
            { id: 'settings', label: 'Slider Settings', icon: Settings },
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
          {/* Banners Tab */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Hero Slider Banners</h3>
                <p className="text-sm text-muted-foreground">Drag to reorder</p>
              </div>

              <div className="space-y-3">
                {banners.map((banner, index) => (
                  <div key={banner.id} className="border rounded-lg overflow-hidden">
                    <div className="flex items-start gap-4 p-4">
                      {/* Image Preview */}
                      <div className="w-32 h-20 bg-muted rounded flex items-center justify-center shrink-0">
                        <Image className="w-8 h-8 text-muted-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-lg">{banner.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{banner.subtitle}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600">
                            CTA: {banner.ctaText}
                          </span>
                          <span className="text-xs text-muted-foreground">→ {banner.ctaLink}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="h-8 w-8" disabled={index === 0}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8" disabled={index === banners.length - 1}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="px-4 py-2 bg-muted/30 border-t flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Order: {banner.order}</span>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          banner.active
                            ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                            : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                        }`}>
                          {banner.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={banner.active} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Slider Settings</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Auto-play Speed (seconds)</Label>
                    <Input type="number" defaultValue="5" min="1" max="10" />
                    <p className="text-xs text-muted-foreground">Time between slide transitions</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Transition Speed (ms)</Label>
                    <Input type="number" defaultValue="500" min="100" max="2000" step="100" />
                    <p className="text-xs text-muted-foreground">Animation duration</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Transition Effect</Label>
                  <select className="w-full h-10 px-3 rounded-md border bg-background">
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto-play</p>
                    <p className="text-sm text-muted-foreground">Automatically cycle through slides</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Navigation Arrows</p>
                    <p className="text-sm text-muted-foreground">Display prev/next arrows</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Pagination Dots</p>
                    <p className="text-sm text-muted-foreground">Display slide indicators</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Pause on Hover</p>
                    <p className="text-sm text-muted-foreground">Stop auto-play when hovering</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <Button className="w-full">Save Slider Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
