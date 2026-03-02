"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Shield, Plus } from "lucide-react";

export default function WarrantyPolicyPage() {
  const [policy, setPolicy] = useState({
    enabled: true,
    defaultMonths: 12,
    content: "All products come with manufacturer warranty...",
  });

  const warrantyTypes = [
    { id: 1, name: "1 Year Warranty", months: 12, description: "Full replacement warranty", active: true },
    { id: 2, name: "6 Months Warranty", months: 6, description: "Service warranty", active: true },
    { id: 3, name: "3 Months Warranty", months: 3, description: "Limited warranty", active: true },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Warranty Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage warranty terms and conditions</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Warranty Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enable Warranty</label>
                <input type="checkbox" checked={policy.enabled} onChange={(e) => setPolicy({...policy, enabled: e.target.checked})} className="w-4 h-4" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Default Warranty (Months)</label>
                <input type="number" value={policy.defaultMonths} onChange={(e) => setPolicy({...policy, defaultMonths: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Warranty Policy Content</h2>
            <textarea value={policy.content} onChange={(e) => setPolicy({...policy, content: e.target.value})} rows={12} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter warranty policy..." />
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Warranty Types</h2>
            <Button size="sm"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-3">
            {warrantyTypes.map((type) => (
              <div key={type.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium">{type.name}</div>
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">{type.description}</div>
                <div className="text-xs text-muted-foreground">{type.months} months</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
