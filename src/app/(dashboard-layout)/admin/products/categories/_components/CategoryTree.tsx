'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from 'lucide-react';
import { Category } from '@/types/category';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryTreeProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentId: string) => void;
}

interface CategoryNodeProps {
  category: Category;
  children: Category[];
  level: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentId: string) => void;
}

function CategoryNode({ category, children, level, onEdit, onDelete, onAddChild }: CategoryNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = children.length > 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors ${
          level > 0 ? 'ml-8' : ''
        }`}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-accent rounded"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        ) : (
          <div className="w-6" />
        )}

        {category.color && (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{category.name}</h4>
            {!category.isActive && <Badge variant="secondary">Inactive</Badge>}
            <Badge variant="outline" className="text-xs">Level {category.level}</Badge>
          </div>
          {category.description && (
            <p className="text-sm text-muted-foreground">{category.description}</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onAddChild(category.id)}
            title="Add subcategory"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(category)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(category)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 mt-2"
          >
            {children.map((child) => (
              <CategoryTreeItem
                key={child.id}
                category={child}
                allCategories={[]}
                level={level + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryTreeItem({
  category,
  allCategories,
  level,
  onEdit,
  onDelete,
  onAddChild,
}: {
  category: Category;
  allCategories: Category[];
  level: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentId: string) => void;
}) {
  const children = allCategories.filter((c) => c.parentId === category.id);
  return (
    <CategoryNode
      category={category}
      children={children}
      level={level}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddChild={onAddChild}
    />
  );
}

export function CategoryTree({ categories, onEdit, onDelete, onAddChild }: CategoryTreeProps) {
  const rootCategories = categories.filter((c) => !c.parentId);

  return (
    <div className="space-y-2">
      {rootCategories.map((category) => (
        <CategoryTreeItem
          key={category.id}
          category={category}
          allCategories={categories}
          level={0}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
}
