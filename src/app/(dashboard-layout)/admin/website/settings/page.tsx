"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Mobile GANJ",
    tagline: "Your Trusted Mobile Shop",
    email: "info@mobileganj.com",
    phone: "+880 1712-345678",
    address: "Dhaka, Bangladesh",
    metaTitle: "Mobile GANJ - Buy & Sell Phones",
    metaDescription: "Best mobile shop in Bangladesh. Buy new phones, sell old phones, accessories with warranty.",
    metaKeywords: "mobile, phone, smartphone, buy phone, sell phone, accessories",
    facebook: "https://facebook.com/mobileganj",
    instagram: "https://instagram.com/mobileganj",
    youtube: "https://youtube.com/@mobileganj",
    maintenanceMode: false,
    allowRegistration: true,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Website Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure general website settings</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5" />
            <h2 className="text-lg font-semibold">General Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">SEO Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Meta Title</label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Meta Description</label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Meta Keywords</label>
              <input
                type="text"
                value={settings.metaKeywords}
                onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">Separate keywords with commas</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Social Media Links</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Facebook</label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Instagram</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">YouTube</label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  value={settings.youtube}
                  onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">System Settings</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Maintenance Mode</label>
                <p className="text-xs text-muted-foreground">Put website under maintenance</p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Allow Registration</label>
                <p className="text-xs text-muted-foreground">Allow new user registration</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
