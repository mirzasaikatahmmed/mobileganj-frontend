'use client';

import { Send, Plus, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateTransferPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Send className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          Create Transfer [B2B, B2G]
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Transfer stock between branches or to godown
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Info */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-lg">Transfer Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transfer-type">Transfer Type *</Label>
                <select id="transfer-type" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
                  <option value="">Select type...</option>
                  <option value="b2b">Branch to Branch (B2B)</option>
                  <option value="b2g">Branch to Godown (B2G)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="transfer-date">Transfer Date *</Label>
                <Input id="transfer-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-location">From Location *</Label>
                <select id="from-location" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
                  <option value="">Select location...</option>
                  <option value="main">Main Branch</option>
                  <option value="branch1">Branch 1</option>
                  <option value="branch2">Branch 2</option>
                </select>
              </div>
              <div>
                <Label htmlFor="to-location">To Location *</Label>
                <select id="to-location" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
                  <option value="">Select location...</option>
                  <option value="main">Main Branch</option>
                  <option value="branch1">Branch 1</option>
                  <option value="godown">Godown</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea id="note" placeholder="Additional notes..." rows={3} className="mt-1.5" />
            </div>
          </div>

          {/* Products */}
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="font-semibold text-lg">Products to Transfer</h2>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Product Entry Form */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div>
                <Label htmlFor="product">Select Product *</Label>
                <select id="product" className="w-full h-10 px-3 rounded-md border bg-background mt-1.5">
                  <option value="">Choose product...</option>
                  <option value="1">iPhone 15 Pro Max - 256GB</option>
                  <option value="2">Samsung Galaxy S24 Ultra</option>
                  <option value="3">AirPods Pro 2</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="available">Available Stock</Label>
                  <Input id="available" value="25" disabled className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="quantity">Transfer Quantity *</Label>
                  <Input id="quantity" type="number" placeholder="0" className="mt-1.5" />
                </div>
              </div>

              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Add to Transfer List
              </Button>
            </div>

            {/* Empty State */}
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-3 text-muted-foreground opacity-30" />
              <p className="text-muted-foreground">No products added yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add products to create transfer</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6 space-y-4 sticky top-6">
            <h3 className="font-semibold text-lg pb-4 border-b">Transfer Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Items:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Quantity:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transfer Type:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">-</span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <Button className="w-full gap-2" size="lg">
                <Send className="w-4 h-4" />
                Create Transfer
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
