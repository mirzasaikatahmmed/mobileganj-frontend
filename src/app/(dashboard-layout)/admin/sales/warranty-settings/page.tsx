'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface WarrantyTemplate {
  id: string;
  name: string;
  months: number;
  description: string;
  isDefault: boolean;
}

const mockWarranties: WarrantyTemplate[] = [
  { id: '1', name: '1 Year Official Warranty', months: 12, description: '1 year official warranty from manufacturer', isDefault: true },
  { id: '2', name: '6 Months Warranty', months: 6, description: '6 months warranty from shop', isDefault: false },
  { id: '3', name: '3 Months Warranty', months: 3, description: '3 months warranty for used products', isDefault: false },
  { id: '4', name: 'No Warranty', months: 0, description: 'Sold as-is without warranty', isDefault: false },
];

export default function WarrantySettingsPage() {
  const [warranties, setWarranties] = useState(mockWarranties);
  const [isOpen, setIsOpen] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState<WarrantyTemplate | null>(null);
  const [name, setName] = useState('');
  const [months, setMonths] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Warranty name is required');
      return;
    }

    if (editingWarranty) {
      setWarranties(warranties.map(w => 
        w.id === editingWarranty.id 
          ? { ...w, name, months, description }
          : w
      ));
      toast.success('Warranty updated successfully');
    } else {
      const newWarranty: WarrantyTemplate = {
        id: Date.now().toString(),
        name,
        months,
        description,
        isDefault: false,
      };
      setWarranties([...warranties, newWarranty]);
      toast.success('Warranty created successfully');
    }

    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setMonths(0);
    setDescription('');
    setEditingWarranty(null);
  };

  const handleEdit = (warranty: WarrantyTemplate) => {
    setEditingWarranty(warranty);
    setName(warranty.name);
    setMonths(warranty.months);
    setDescription(warranty.description);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this warranty template?')) {
      setWarranties(warranties.filter(w => w.id !== id));
      toast.success('Warranty deleted successfully');
    }
  };

  const setAsDefault = (id: string) => {
    setWarranties(warranties.map(w => ({
      ...w,
      isDefault: w.id === id,
    })));
    toast.success('Default warranty updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Warranty Settings</h1>
          <p className="text-muted-foreground">Manage warranty templates for sales</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Warranty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingWarranty ? 'Edit Warranty' : 'Add New Warranty'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Warranty Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., 1 Year Official Warranty"
                  required
                />
              </div>
              <div>
                <Label htmlFor="months">Duration (Months) *</Label>
                <Input
                  id="months"
                  type="number"
                  value={months || ''}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  placeholder="e.g., 12"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Warranty details..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingWarranty ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Templates</p>
          <h3 className="text-2xl font-bold mt-1">{warranties.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Default Warranty</p>
          <h3 className="text-lg font-bold mt-1">
            {warranties.find(w => w.isDefault)?.name || 'None'}
          </h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Avg Duration</p>
          <h3 className="text-2xl font-bold mt-1">
            {Math.round(warranties.reduce((sum, w) => sum + w.months, 0) / warranties.length)} months
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warranties.map((warranty, index) => (
          <motion.div
            key={warranty.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`card-base p-6 hover:shadow-lg transition-shadow ${
              warranty.isDefault ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  warranty.isDefault ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{warranty.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {warranty.months} {warranty.months === 1 ? 'month' : 'months'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(warranty)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDelete(warranty.id)}
                  disabled={warranty.isDefault}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{warranty.description}</p>
            
            <div className="flex gap-2">
              {!warranty.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setAsDefault(warranty.id)}
                >
                  Set as Default
                </Button>
              )}
              {warranty.isDefault && (
                <div className="flex-1 text-center py-2 text-sm font-medium text-primary">
                  ✓ Default Warranty
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
