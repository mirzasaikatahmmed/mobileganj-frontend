'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock data - Replace with API
const mockBrands = [
  { id: '1', name: 'Apple', productCount: 45, createdAt: '2024-01-15' },
  { id: '2', name: 'Samsung', productCount: 38, createdAt: '2024-01-10' },
  { id: '3', name: 'Google', productCount: 12, createdAt: '2024-01-05' },
  { id: '4', name: 'OnePlus', productCount: 8, createdAt: '2024-01-01' },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState(mockBrands);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [brandName, setBrandName] = useState('');

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      toast.error('Brand name is required');
      return;
    }

    if (editingBrand) {
      setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, name: brandName } : b));
      toast.success('Brand updated successfully');
    } else {
      const newBrand = {
        id: Date.now().toString(),
        name: brandName,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBrands([newBrand, ...brands]);
      toast.success('Brand created successfully');
    }

    setIsOpen(false);
    setBrandName('');
    setEditingBrand(null);
  };

  const handleEdit = (brand: any) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter(b => b.id !== id));
      toast.success('Brand deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className="text-muted-foreground">Manage product brands</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingBrand(null); setBrandName(''); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Brand Name</Label>
                <Input
                  id="name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBrand ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Brands</p>
          <h3 className="text-2xl font-bold mt-1">{brands.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">{brands.reduce((sum, b) => sum + b.productCount, 0)}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Active Brands</p>
          <h3 className="text-2xl font-bold mt-1">{brands.filter(b => b.productCount > 0).length}</h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search brands..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBrands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-base p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.productCount} products</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(brand)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDelete(brand.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Created: {new Date(brand.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="card-base p-12 text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No brands found</h3>
          <p className="text-muted-foreground mb-4">
            {search ? 'Try a different search term' : 'Get started by adding your first brand'}
          </p>
          {!search && (
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
