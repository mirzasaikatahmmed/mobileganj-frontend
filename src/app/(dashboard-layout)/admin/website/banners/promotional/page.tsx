'use client';

import { Megaphone, Plus, Edit, Trash2, Eye, Calendar, MapPin, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function PromotionalBannersPage() {
  const [activeTab, setActiveTab] = useState('active');

  const activeBanners = [
    { id: 1, title: 'Flash Sale Banner', placement: 'Homepage Top', startDate: '2024-01-15', endDate: '2024-01-31', clicks: 1245, impressions: 15680, status: 'active' },
    { id: 2, title: 'New Arrival Banner', placement: 'Shop Page', startDate: '2024-01-10', endDate: '2024-02-10', clicks: 856, impressions: 9870, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Promotional Banners
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage promotional banners across the website
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Banner
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Active Banners</p>
          <p className="text-2xl font-bold mt-1">8</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Clicks</p>
          <p className="text-2xl font-bold mt-1">12.5K</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Impressions</p>
          <p className="text-2xl font-bold mt-1">145K</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Avg CTR</p>
          <p className="text-2xl font-bold mt-1">8.6%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'active', label: 'Active', count: 8 },
            { id: 'scheduled', label: 'Scheduled', count: 3 },
            { id: 'expired', label: 'Expired', count: 12 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="ml-1 px-2 py-0.5 rounded-full bg-muted text-xs">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'active' && (
            <div className="space-y-4">
              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Banner Title</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Placement</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Duration</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Clicks</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Impressions</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">CTR</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeBanners.map((banner) => (
                      <tr key={banner.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{banner.title}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-xs">
                            <MapPin className="w-3 h-3" />
                            {banner.placement}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">
                          <div className="flex flex-col gap-0.5">
                            <span>{banner.startDate}</span>
                            <span className="text-muted-foreground">to {banner.endDate}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-medium">{banner.clicks.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{banner.impressions.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                            {((banner.clicks / banner.impressions) * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <BarChart3 className="w-4 h-4" />
                            </Button>
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

          {activeTab === 'scheduled' && (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Scheduled promotional banners</p>
            </div>
          )}

          {activeTab === 'expired' && (
            <div className="text-center py-12 text-muted-foreground">
              <Megaphone className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Expired promotional banners</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
