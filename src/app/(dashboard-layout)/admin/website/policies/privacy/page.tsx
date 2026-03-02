"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Shield, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("Privacy Policy for Mobile GANJ\n\nWe collect and process your personal information...");

  const sections = [
    { id: 1, title: "Information Collection", enabled: true },
    { id: 2, title: "How We Use Information", enabled: true },
    { id: 3, title: "Data Security", enabled: true },
    { id: 4, title: "Cookies Policy", enabled: true },
    { id: 5, title: "Third-Party Services", enabled: true },
    { id: 6, title: "Your Rights", enabled: true },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage privacy policy and data protection terms</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Sections</h2>
          </div>
          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="text-sm font-medium">{section.title}</div>
                <input type="checkbox" checked={section.enabled} className="w-4 h-4" readOnly />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-card rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Privacy Policy Content</h2>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={24}
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
            placeholder="Enter privacy policy content..."
          />
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Ensure your privacy policy complies with GDPR, CCPA, and local data protection laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
