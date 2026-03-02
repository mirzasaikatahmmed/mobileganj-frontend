'use client';

import { Phone, Plus, Edit, Trash2, Eye, Mail, MapPin, Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ContactPageManagementPage() {
  const [activeTab, setActiveTab] = useState('info');

  const contactMethods = [
    { id: 1, type: 'phone', label: 'Main Phone', value: '+880 1234-567890', primary: true },
    { id: 2, type: 'phone', label: 'Support', value: '+880 1234-567891', primary: false },
    { id: 3, type: 'email', label: 'Sales Email', value: 'sales@mobileganj.com', primary: true },
    { id: 4, type: 'email', label: 'Support Email', value: 'support@mobileganj.com', primary: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Contact Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage contact information and form settings
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
            { id: 'info', label: 'Contact Info', icon: Phone },
            { id: 'form', label: 'Form Settings', icon: Settings },
            { id: 'location', label: 'Location & Map', icon: MapPin },
            { id: 'hours', label: 'Business Hours', icon: Clock },
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
          {/* Contact Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Contact Methods</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Contact
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Label</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Value</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Primary</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMethods.map((contact) => (
                      <tr key={contact.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-xs capitalize">
                            {contact.type === 'phone' ? <Phone className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                            {contact.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">{contact.label}</td>
                        <td className="px-4 py-3 text-sm">{contact.value}</td>
                        <td className="px-4 py-3 text-center">
                          {contact.primary && (
                            <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                              Primary
                            </span>
                          )}
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

          {/* Form Settings Tab */}
          {activeTab === 'form' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Contact Form Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Form Title</Label>
                  <Input placeholder="Get in Touch" defaultValue="Get in Touch" />
                </div>
                <div className="space-y-2">
                  <Label>Form Description</Label>
                  <Textarea placeholder="We'd love to hear from you..." rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input type="email" placeholder="info@mobileganj.com" defaultValue="info@mobileganj.com" />
                  <p className="text-xs text-muted-foreground">Receive form submissions at this email</p>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Enable Contact Form</p>
                    <p className="text-sm text-muted-foreground">Allow customers to send messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Require Phone Number</p>
                    <p className="text-sm text-muted-foreground">Make phone field mandatory</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <Button className="w-full">Save Form Settings</Button>
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Location & Map</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input placeholder="123 Main Street" />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input placeholder="Gulshan, Dhaka" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="Dhaka" />
                  </div>
                  <div className="space-y-2">
                    <Label>Postal Code</Label>
                    <Input placeholder="1212" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Google Maps Embed URL</Label>
                  <Input placeholder="https://maps.google.com/..." />
                  <p className="text-xs text-muted-foreground">Paste Google Maps embed iframe URL</p>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Show Map</p>
                    <p className="text-sm text-muted-foreground">Display Google Maps on contact page</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <Button className="w-full">Save Location</Button>
              </div>
            </div>
          )}

          {/* Business Hours Tab */}
          {activeTab === 'hours' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Business Hours</h3>
              
              <div className="space-y-3">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-24 font-medium">{day}</div>
                    <Input type="time" defaultValue="10:00" className="w-32" />
                    <span className="text-muted-foreground">to</span>
                    <Input type="time" defaultValue="22:00" className="w-32" />
                    <label className="ml-auto flex items-center gap-2">
                      <input type="checkbox" defaultChecked={day !== 'Friday'} />
                      <span className="text-sm">Open</span>
                    </label>
                  </div>
                ))}
              </div>
              <Button className="w-full">Save Business Hours</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
