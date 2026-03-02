"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";

export default function ReturnPolicyPage() {
  const [policy, setPolicy] = useState({
    enabled: true,
    returnDays: 7,
    refundDays: 14,
    conditions: "Product must be in original condition with all accessories...",
    content: "We offer hassle-free returns within 7 days...",
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Return Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage return and refund policy</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Return Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Returns</label>
              <input type="checkbox" checked={policy.enabled} onChange={(e) => setPolicy({...policy, enabled: e.target.checked})} className="w-4 h-4" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Return Period (Days)</label>
              <input type="number" value={policy.returnDays} onChange={(e) => setPolicy({...policy, returnDays: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Refund Period (Days)</label>
              <input type="number" value={policy.refundDays} onChange={(e) => setPolicy({...policy, refundDays: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Return Conditions</h2>
            <textarea value={policy.conditions} onChange={(e) => setPolicy({...policy, conditions: e.target.value})} rows={6} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter return conditions..." />
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Return Policy Content</h2>
            <textarea value={policy.content} onChange={(e) => setPolicy({...policy, content: e.target.value})} rows={8} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter return policy..." />
          </div>
        </div>
      </div>
    </div>
  );
}
