"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Calculator, FileText } from "lucide-react";

export default function EMIPolicyPage() {
  const [emiInfo, setEmiInfo] = useState({
    enabled: true,
    minAmount: 20000,
    maxDuration: 12,
    interestRate: 0,
    processingFee: 0,
    description: "Get your favorite phone with 0% EMI facility",
  });

  const durations = [
    { months: 3, downPayment: 30 },
    { months: 6, downPayment: 25 },
    { months: 9, downPayment: 20 },
    { months: 12, downPayment: 15 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">EMI Information</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage EMI policy and calculator settings</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5" />
            <h2 className="text-lg font-semibold">EMI Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable EMI</label>
              <input type="checkbox" checked={emiInfo.enabled} onChange={(e) => setEmiInfo({...emiInfo, enabled: e.target.checked})} className="w-4 h-4" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Minimum Amount (৳)</label>
              <input type="number" value={emiInfo.minAmount} onChange={(e) => setEmiInfo({...emiInfo, minAmount: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Max Duration (Months)</label>
              <input type="number" value={emiInfo.maxDuration} onChange={(e) => setEmiInfo({...emiInfo, maxDuration: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Interest Rate (%)</label>
              <input type="number" value={emiInfo.interestRate} onChange={(e) => setEmiInfo({...emiInfo, interestRate: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Processing Fee (৳)</label>
              <input type="number" value={emiInfo.processingFee} onChange={(e) => setEmiInfo({...emiInfo, processingFee: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold">EMI Durations</h2>
          </div>

          <div className="space-y-3">
            {durations.map((duration) => (
              <div key={duration.months} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{duration.months} Months</div>
                  <div className="text-sm text-muted-foreground">Down Payment: {duration.downPayment}%</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">Add Duration</Button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">EMI Description</h2>
        <textarea value={emiInfo.description} onChange={(e) => setEmiInfo({...emiInfo, description: e.target.value})} rows={6} className="w-full px-4 py-2 border rounded-lg" placeholder="Enter EMI information..." />
      </div>
    </div>
  );
}
