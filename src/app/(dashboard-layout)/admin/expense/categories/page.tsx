'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockCategories = [
  { id: '1', name: 'Shop Rent', totalExpense: 150000, count: 3 },
  { id: '2', name: 'Staff Salary', totalExpense: 105000, count: 3 },
  { id: '3', name: 'Electricity Bill', totalExpense: 12000, count: 3 },
  { id: '4', name: 'Transport', totalExpense: 8500, count: 12 },
];

export default function ExpenseCategoriesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Expense Categories</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage expense categories</p>
        </div>
        <Button size="lg" onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Add New Category</h2>
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input placeholder="e.g., Office Supplies" />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 sm:flex-initial">Save</Button>
            <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 sm:flex-initial">Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {mockCategories.map((cat) => (
          <div key={cat.id} className="bg-card border rounded-lg p-4 sm:p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">{cat.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{cat.count} expenses</p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs sm:text-sm text-muted-foreground">Total Spent</p>
              <p className="text-lg sm:text-xl font-bold">৳{cat.totalExpense.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
