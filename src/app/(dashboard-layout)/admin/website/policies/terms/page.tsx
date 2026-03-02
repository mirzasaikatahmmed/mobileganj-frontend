"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, FileText, Plus } from "lucide-react";

export default function TermsConditionsPage() {
  const [content, setContent] = useState("Terms and Conditions for Mobile GANJ...");

  const sections = [
    { id: 1, title: "General Terms", order: 1 },
    { id: 2, title: "User Responsibilities", order: 2 },
    { id: 3, title: "Payment Terms", order: 3 },
    { id: 4, title: "Shipping & Delivery", order: 4 },
    { id: 5, title: "Limitation of Liability", order: 5 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage website terms and conditions</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sections</h2>
            <Button size="sm"><Plus className="w-4 h-4" /></Button>
          </div>
          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="font-medium text-sm">{section.title}</div>
                <div className="text-xs text-muted-foreground">Order: {section.order}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Content Editor</h2>
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={20} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" placeholder="Enter terms and conditions..." />
        </div>
      </div>
    </div>
  );
}
