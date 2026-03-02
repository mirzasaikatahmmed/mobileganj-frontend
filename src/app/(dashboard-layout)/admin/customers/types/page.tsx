'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Tag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const mockTypes = [
  { id: '1', name: 'Regular', discount: 0, color: 'gray', customers: 1089 },
  { id: '2', name: 'VIP', discount: 5, color: 'purple', customers: 89 },
  { id: '3', name: 'Wholesale', discount: 10, color: 'blue', customers: 45 },
  { id: '4', name: 'Corporate', discount: 15, color: 'green', customers: 11 },
];

export default function CustomerTypesPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', discount: 0, color: 'gray' });

  const filtered = mockTypes.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Types</h1>
          <p className="text-muted-foreground">Manage customer categories and discounts</p>
        </div>
        <Button size="lg" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Type
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add New Type</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Type Name</Label>
              <Input
                placeholder="e.g., Premium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Discount (%)</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Badge Color</Label>
              <select
                className="w-full h-12 px-4 rounded-md border bg-background"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              >
                <option value="gray">Gray</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>Save Type</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filtered.map((type) => (
          <div key={type.id} className="bg-card border rounded-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-lg bg-${type.color}-500/10 flex items-center justify-center`}>
                <Tag className={`w-6 h-6 text-${type.color}-500`} />
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{type.name}</h3>
              <p className="text-sm text-muted-foreground">{type.customers} customers</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t">
              <Percent className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{type.discount}% Discount</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
