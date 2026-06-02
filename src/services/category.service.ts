import apiClient from '@/lib/axios';
import { Category, CategoryFormData } from '@/types/category';

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

  getTree: async (): Promise<Category[]> => {
    const { data } = await apiClient.get('/categories/tree');
    return data;
  },

  getById: async (id: string): Promise<Category> => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data;
  },

  create: async (categoryData: CategoryFormData): Promise<Category> => {
    const { data } = await apiClient.post('/categories', categoryData);
    return data;
  },

  update: async (id: string, categoryData: Partial<CategoryFormData>): Promise<Category> => {
    const { data } = await apiClient.patch(`/categories/${id}`, categoryData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },

  reorder: async (id: string, order: number): Promise<Category> => {
    const { data } = await apiClient.patch(`/categories/${id}/reorder`, { order });
    return data;
  },
};
