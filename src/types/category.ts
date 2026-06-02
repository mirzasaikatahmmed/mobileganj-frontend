export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string | null;
  level: number;
  order: number;
  isActive: boolean;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string | null;
  isActive: boolean;
}
