'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Setting {
  id: string;
  name: string;
  value: string;
}

const mockPhoneTypes: Setting[] = [
  { id: '1', name: 'Overseas', value: 'overseas' },
  { id: '2', name: 'Local', value: 'local' },
];

const mockAccessoryTypes: Setting[] = [
  { id: '1', name: 'Charger', value: 'charger' },
  { id: '2', name: 'Earphone', value: 'earphone' },
  { id: '3', name: 'Cover', value: 'cover' },
  { id: '4', name: 'Glass', value: 'glass' },
  { id: '5', name: 'Power Bank', value: 'power_bank' },
];

const mockConditions: Setting[] = [
  { id: '1', name: 'Brand New', value: 'brand_new' },
  { id: '2', name: 'Used', value: 'used' },
  { id: '3', name: 'Like New', value: 'like_new' },
];

const mockRegions: Setting[] = [
  { id: '1', name: 'USA', value: 'usa' },
  { id: '2', name: 'Japan', value: 'japan' },
  { id: '3', name: 'Australia', value: 'australia' },
  { id: '4', name: 'UK', value: 'uk' },
  { id: '5', name: 'European', value: 'european' },
  { id: '6', name: 'Other', value: 'other' },
];

const mockUnits: Setting[] = [
  { id: '1', name: 'Piece', value: 'piece' },
  { id: '2', name: 'Box', value: 'box' },
  { id: '3', name: 'Set', value: 'set' },
  { id: '4', name: 'Pair', value: 'pair' },
];

function SettingSection({ 
  title, 
  description, 
  items, 
  onAdd, 
  onEdit, 
  onDelete 
}: { 
  title: string;
  description: string;
  items: Setting[];
  onAdd: () => void;
  onEdit: (item: Setting) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="card-base p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{item.value}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(item)}>
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ProductSettingsPage() {
  const [phoneTypes, setPhoneTypes] = useState(mockPhoneTypes);
  const [accessoryTypes, setAccessoryTypes] = useState(mockAccessoryTypes);
  const [conditions, setConditions] = useState(mockConditions);
  const [regions, setRegions] = useState(mockRegions);
  const [units, setUnits] = useState(mockUnits);

  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<'phone' | 'accessory' | 'condition' | 'region' | 'unit'>('phone');
  const [editingItem, setEditingItem] = useState<Setting | null>(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = (type: typeof currentType) => {
    setCurrentType(type);
    setEditingItem(null);
    setName('');
    setValue('');
    setIsOpen(true);
  };

  const handleEdit = (item: Setting, type: typeof currentType) => {
    setCurrentType(type);
    setEditingItem(item);
    setName(item.name);
    setValue(item.value);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) {
      toast.error('All fields are required');
      return;
    }

    const newItem: Setting = {
      id: editingItem?.id || Date.now().toString(),
      name,
      value: value.toLowerCase().replace(/\s+/g, '_'),
    };

    if (editingItem) {
      toast.success('Updated successfully');
    } else {
      toast.success('Added successfully');
    }

    setIsOpen(false);
  };

  const handleDelete = (id: string, type: typeof currentType) => {
    if (confirm('Are you sure you want to delete this item?')) {
      toast.success('Deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Settings</h1>
          <p className="text-muted-foreground">Manage product types, conditions, regions & units</p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Display Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Brand New"
                required
              />
            </div>
            <div>
              <Label htmlFor="value">Value (slug) *</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., brand_new"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use lowercase with underscores
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="phone" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="phone">Phone Types</TabsTrigger>
          <TabsTrigger value="accessory">Accessory Types</TabsTrigger>
          <TabsTrigger value="condition">Conditions</TabsTrigger>
          <TabsTrigger value="region">Regions</TabsTrigger>
          <TabsTrigger value="unit">Units</TabsTrigger>
        </TabsList>

        <TabsContent value="phone" className="card-base p-6">
          <SettingSection
            title="Phone Types"
            description="Types of phones (Overseas, Local, etc.)"
            items={phoneTypes}
            onAdd={() => handleAdd('phone')}
            onEdit={(item) => handleEdit(item, 'phone')}
            onDelete={(id) => handleDelete(id, 'phone')}
          />
        </TabsContent>

        <TabsContent value="accessory" className="card-base p-6">
          <SettingSection
            title="Accessory Types"
            description="Types of accessories (Charger, Earphone, etc.)"
            items={accessoryTypes}
            onAdd={() => handleAdd('accessory')}
            onEdit={(item) => handleEdit(item, 'accessory')}
            onDelete={(id) => handleDelete(id, 'accessory')}
          />
        </TabsContent>

        <TabsContent value="condition" className="card-base p-6">
          <SettingSection
            title="Product Conditions"
            description="Condition states (Brand New, Used, etc.)"
            items={conditions}
            onAdd={() => handleAdd('condition')}
            onEdit={(item) => handleEdit(item, 'condition')}
            onDelete={(id) => handleDelete(id, 'condition')}
          />
        </TabsContent>

        <TabsContent value="region" className="card-base p-6">
          <SettingSection
            title="Phone Regions"
            description="Import regions (USA, Japan, UK, etc.)"
            items={regions}
            onAdd={() => handleAdd('region')}
            onEdit={(item) => handleEdit(item, 'region')}
            onDelete={(id) => handleDelete(id, 'region')}
          />
        </TabsContent>

        <TabsContent value="unit" className="card-base p-6">
          <SettingSection
            title="Unit Types"
            description="Measurement units (Piece, Box, Set, etc.)"
            items={units}
            onAdd={() => handleAdd('unit')}
            onEdit={(item) => handleEdit(item, 'unit')}
            onDelete={(id) => handleDelete(id, 'unit')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
