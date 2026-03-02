'use client';

import { DollarSign, Plus, Edit, Trash2, Eye, Settings, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function SellPhonePageManagementPage() {
  const [activeTab, setActiveTab] = useState('form');

  const formFields = [
    { id: 1, label: 'Phone Model', type: 'select', required: true, enabled: true, order: 1 },
    { id: 2, label: 'Phone Condition', type: 'select', required: true, enabled: true, order: 2 },
    { id: 3, label: 'Storage', type: 'select', required: true, enabled: true, order: 3 },
    { id: 4, label: 'RAM', type: 'select', required: false, enabled: true, order: 4 },
    { id: 5, label: 'IMEI Number', type: 'text', required: true, enabled: true, order: 5 },
    { id: 6, label: 'Purchase Date', type: 'date', required: false, enabled: true, order: 6 },
  ];

  const pricingRules = [
    { id: 1, condition: 'Excellent', percentage: 85, description: 'Like new, no scratches' },
    { id: 2, condition: 'Good', percentage: 70, description: 'Minor scratches, fully functional' },
    { id: 3, condition: 'Fair', percentage: 55, description: 'Visible wear, works properly' },
    { id: 4, condition: 'Poor', percentage: 35, description: 'Heavy damage, may have issues' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Sell Phone Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Configure sell phone form and pricing
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
            { id: 'form', label: 'Form Fields', icon: FileText },
            { id: 'pricing', label: 'Pricing Rules', icon: Calculator },
            { id: 'submissions', label: 'Submissions', icon: DollarSign },
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
          {/* Form Fields Tab */}
          {activeTab === 'form' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Form Fields</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Field
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Field Label</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Order</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Required</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formFields.map((field) => (
                      <tr key={field.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{field.label}</td>
                        <td className="px-4 py-3 text-sm capitalize">{field.type}</td>
                        <td className="px-4 py-3 text-center">{field.order}</td>
                        <td className="px-4 py-3 text-center">
                          {field.required ? (
                            <span className="text-red-600 font-medium">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            field.enabled
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-600'
                              : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                          }`}>
                            {field.enabled ? 'Enabled' : 'Disabled'}
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

          {/* Pricing Rules Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Pricing Rules by Condition</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Rule
                </Button>
              </div>

              <div className="space-y-3">
                {pricingRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{rule.condition}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Price Percentage:</span>
                      <span className="text-lg font-bold text-primary">{rule.percentage}%</span>
                      <span className="text-sm text-muted-foreground">of market value</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Submissions</h3>
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p>Sell phone submissions will appear here</p>
                <p className="text-sm mt-1">View and manage customer sell requests</p>
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
                  <Input placeholder="Sell Your Phone" defaultValue="Sell Your Phone" />
                </div>
                <div className="space-y-2">
                  <Label>Page Description</Label>
                  <Textarea placeholder="Get instant cash for your old phone..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input type="email" placeholder="sales@mobileganj.com" />
                  <p className="text-xs text-muted-foreground">Receive notifications when someone submits a sell request</p>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto-Calculate Price</p>
                    <p className="text-sm text-muted-foreground">Show estimated price based on condition</p>
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
