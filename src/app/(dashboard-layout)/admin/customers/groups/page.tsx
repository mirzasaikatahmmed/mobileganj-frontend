'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const mockGroups = [
  { id: '1', name: 'High Value Customers', description: 'Customers with 100k+ purchases', members: 45, color: 'purple' },
  { id: '2', name: 'Frequent Buyers', description: 'Monthly repeat customers', members: 128, color: 'blue' },
  { id: '3', name: 'New Customers', description: 'Joined in last 30 days', members: 67, color: 'green' },
  { id: '4', name: 'Inactive', description: 'No purchase in 6 months', members: 89, color: 'orange' },
];

export default function CustomerGroupsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const filtered = mockGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Groups</h1>
          <p className="text-muted-foreground">Organize customers into segments</p>
        </div>
        <Button size="lg" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Create New Group</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input
                placeholder="e.g., Premium Members"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe this customer group..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button>Create Group</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((group) => (
          <div key={group.id} className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${group.color}-500/10 flex items-center justify-center`}>
                  <Users className={`w-6 h-6 text-${group.color}-500`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm font-medium">{group.members} members</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
