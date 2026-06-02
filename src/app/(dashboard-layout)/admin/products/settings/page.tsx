'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import {
  useProductSettings,
  useCreateProductSetting,
  useUpdateProductSetting,
  useDeleteProductSetting,
} from '@/hooks/use-product-settings';
import {
  ProductSetting,
  ProductSettingType,
} from '@/services/product-settings.service';



function SettingSection({
  title,
  description,
  items,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
}: {
  title: string;
  description: string;
  items: ProductSetting[];
  onAdd: () => void;
  onEdit: (item: ProductSetting) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No items found
          </div>
        ) : (
          items.map((item, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default function ProductSettingsPage() {
  const { data: settings, isLoading } = useProductSettings();
  const createMutation = useCreateProductSetting();
  const updateMutation = useUpdateProductSetting();
  const deleteMutation = useDeleteProductSetting();

  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<ProductSettingType>(ProductSettingType.PHONE_TYPE);
  const [editingItem, setEditingItem] = useState<ProductSetting | null>(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = (type: ProductSettingType) => {
    setCurrentType(type);
    setEditingItem(null);
    setName('');
    setValue('');
    setIsOpen(true);
  };

  const handleEdit = (item: ProductSetting, type: ProductSettingType) => {
    setCurrentType(type);
    setEditingItem(item);
    setName(item.name);
    setValue(item.value);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;

    const dto = {
      type: currentType,
      name: name.trim(),
      value: value.trim().toLowerCase().replace(/\s+/g, '_'),
    };

    if (editingItem) {
      await updateMutation.mutateAsync({ id: editingItem.id, dto });
    } else {
      await createMutation.mutateAsync(dto);
    }

    setIsOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMutation.mutateAsync(id);
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
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : editingItem ? (
                  'Update'
                ) : (
                  'Create'
                )}
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
            items={settings?.phoneTypes || []}
            onAdd={() => handleAdd(ProductSettingType.PHONE_TYPE)}
            onEdit={(item) => handleEdit(item, ProductSettingType.PHONE_TYPE)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="accessory" className="card-base p-6">
          <SettingSection
            title="Accessory Types"
            description="Types of accessories (Charger, Earphone, etc.)"
            items={settings?.accessoryTypes || []}
            onAdd={() => handleAdd(ProductSettingType.ACCESSORY_TYPE)}
            onEdit={(item) => handleEdit(item, ProductSettingType.ACCESSORY_TYPE)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="condition" className="card-base p-6">
          <SettingSection
            title="Product Conditions"
            description="Condition states (Brand New, Used, etc.)"
            items={settings?.conditions || []}
            onAdd={() => handleAdd(ProductSettingType.CONDITION)}
            onEdit={(item) => handleEdit(item, ProductSettingType.CONDITION)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="region" className="card-base p-6">
          <SettingSection
            title="Phone Regions"
            description="Import regions (USA, Japan, UK, etc.)"
            items={settings?.regions || []}
            onAdd={() => handleAdd(ProductSettingType.REGION)}
            onEdit={(item) => handleEdit(item, ProductSettingType.REGION)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="unit" className="card-base p-6">
          <SettingSection
            title="Unit Types"
            description="Measurement units (Piece, Box, Set, etc.)"
            items={settings?.units || []}
            onAdd={() => handleAdd(ProductSettingType.UNIT)}
            onEdit={(item) => handleEdit(item, ProductSettingType.UNIT)}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
