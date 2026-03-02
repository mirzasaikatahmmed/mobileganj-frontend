'use client';

import { ClipboardList, Upload, Download, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BulkOpeningStockPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          Set Bulk Opening Stock
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Add multiple opening stock entries at once
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Upload */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold">Upload CSV File</h2>
              <p className="text-sm text-muted-foreground">Import bulk data from CSV</p>
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-3">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <p className="font-medium">Drop CSV file here or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">Supported format: .csv, .xlsx</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Choose File
            </Button>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Download className="w-4 h-4" />
            Download Sample CSV Template
          </Button>
        </div>

        {/* Manual Entry */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold">Manual Entry</h2>
              <p className="text-sm text-muted-foreground">Add items one by one</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label>Select Product *</Label>
              <select className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
                <option value="">Choose product...</option>
                <option value="1">iPhone 15 Pro Max</option>
                <option value="2">Samsung Galaxy S24</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Quantity *</Label>
                <Input type="number" placeholder="0" className="mt-1.5" />
              </div>
              <div>
                <Label>Purchase Price *</Label>
                <Input type="number" placeholder="0" className="mt-1.5" />
              </div>
            </div>

            <div>
              <Label>Date *</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1.5" />
            </div>

            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add to List
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Preview (0 items)</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>

        <div className="p-12 text-center text-muted-foreground">
          <ClipboardList className="w-16 h-16 mx-auto mb-3 opacity-30" />
          <p>No items added yet</p>
          <p className="text-sm mt-1">Upload CSV or add items manually to see preview</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" className="flex-1 gap-2">
          <Upload className="w-4 h-4" />
          Save Opening Stock
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
