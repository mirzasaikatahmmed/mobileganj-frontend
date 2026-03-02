'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children?: Category[];
  productCount: number;
}

const mockCategories: Category[] = [
  { 
    id: '1', 
    name: 'Phone', 
    slug: 'phone', 
    parentId: null, 
    productCount: 45,
    children: [
      { id: '1-1', name: 'Overseas Phone', slug: 'overseas-phone', parentId: '1', productCount: 30 },
      { id: '1-2', name: 'Local Phone', slug: 'local-phone', parentId: '1', productCount: 15 },
    ]
  },
  { 
    id: '2', 
    name: 'Accessories', 
    slug: 'accessories', 
    parentId: null, 
    productCount: 120,
    children: [
      { id: '2-1', name: 'Charger', slug: 'charger', parentId: '2', productCount: 35 },
      { id: '2-2', name: 'Earphone', slug: 'earphone', parentId: '2', productCount: 40 },
      { id: '2-3', name: 'Cover', slug: 'cover', parentId: '2', productCount: 25 },
      { id: '2-4', name: 'Glass', slug: 'glass', parentId: '2', productCount: 15 },
      { id: '2-5', name: 'Power Bank', slug: 'power-bank', parentId: '2', productCount: 5 },
    ]
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState<string>('none');
  const [expandedIds, setExpandedIds] = useState<string[]>(['1', '2']);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');
    
    if (editingCategory) {
      // Update logic
      toast.success('Category updated successfully');
    } else {
      // Create logic
      const newCategory: Category = {
        id: Date.now().toString(),
        name,
        slug,
        parentId: parentId === 'none' ? null : parentId,
        productCount: 0,
      };
      toast.success('Category created successfully');
    }

    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setParentId('none');
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setParentId(category.parentId || 'none');
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure? This will delete all subcategories too.')) {
      toast.success('Category deleted successfully');
    }
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedIds.includes(category.id);

    return (
      <div key={category.id}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
            level > 0 ? 'ml-8' : ''
          }`}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpand(category.id)} className="p-1">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FolderTree className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium">{category.name}</h4>
            <p className="text-sm text-muted-foreground">
              {category.productCount} products • {category.slug}
            </p>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => handleDelete(category.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {hasChildren && isExpanded && (
          <div>
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const flatCategories = (cats: Category[]): Category[] => {
    return cats.reduce((acc: Category[], cat) => {
      acc.push(cat);
      if (cat.children) {
        acc.push(...flatCategories(cat.children));
      }
      return acc;
    }, []);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage product categories (nested support)</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Smartphones"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="parent">Parent Category</Label>
                <Select value={parentId} onValueChange={setParentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Root Category)</SelectItem>
                    {flatCategories(categories).map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.parentId ? '— ' : ''}{cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave as "None" to create a root category
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Categories</p>
          <h3 className="text-2xl font-bold mt-1">{flatCategories(categories).length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Root Categories</p>
          <h3 className="text-2xl font-bold mt-1">{categories.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">
            {flatCategories(categories).reduce((sum, c) => sum + c.productCount, 0)}
          </h3>
        </div>
      </div>

      <div className="card-base p-6 space-y-2">
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  );
}
