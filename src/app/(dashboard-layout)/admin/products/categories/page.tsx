'use client';

import { useState } from 'react';
import { Plus, FolderTree, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryDialog } from './_components/CategoryDialog';
import { CategoryTree } from './_components/CategoryTree';
import { Category, CategoryFormData } from '@/types/category';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/use-categories';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentIdForNew, setParentIdForNew] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  const handleCreate = () => {
    setEditingCategory(null);
    setParentIdForNew(null);
    setDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setParentIdForNew(null);
    setDialogOpen(true);
  };

  const handleAddChild = (parentId: string) => {
    setEditingCategory(null);
    setParentIdForNew(parentId);
    setDialogOpen(true);
  };

  const handleSave = (data: CategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      const payload = parentIdForNew ? { ...data, parentId: parentIdForNew } : data;
      createMutation.mutate(payload);
    }
    setDialogOpen(false);
  };

  const handleDelete = (category: Category) => {
    setDeleteCategory(category);
  };

  const confirmDelete = () => {
    if (deleteCategory) {
      deleteMutation.mutate(deleteCategory.id);
      setDeleteCategory(null);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rootCategories = filteredCategories.filter(c => !c.parentId);
  const totalCategories = categories.length;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Categories</h1>
          <p className="text-muted-foreground">Manage multi-level product categories</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Category
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Categories</p>
          <h3 className="text-2xl font-bold mt-1">{totalCategories}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Root Categories</p>
          <h3 className="text-2xl font-bold mt-1">{rootCategories.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Active Categories</p>
          <h3 className="text-2xl font-bold mt-1">{categories.filter(c => c.isActive).length}</h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="card-base p-6">
        {filteredCategories.length > 0 ? (
          <CategoryTree
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddChild={handleAddChild}
          />
        ) : (
          <div className="text-center py-12">
            <FolderTree className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">Create your first category to get started</p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Create Category
            </Button>
          </div>
        )}
      </div>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        categories={categories}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteCategory}
        onOpenChange={(open) => !open && setDeleteCategory(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleteCategory?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
