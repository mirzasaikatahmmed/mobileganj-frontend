import { Branch, CreateBranchPayload, UpdateBranchPayload } from '@/types/branch';
import apiClient from '@/lib/axios';

export const branchService = {
  getAll: async () => {
    const response = await apiClient.get<Branch[]>('/branches');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<Branch>(`/branches/${id}`);
    return response.data;
  },
  create: async (data: CreateBranchPayload) => {
    const response = await apiClient.post<Branch>('/branches', data);
    return response.data;
  },
  update: async (id: string, data: UpdateBranchPayload) => {
    const response = await apiClient.patch<Branch>(`/branches/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete<void>(`/branches/${id}`);
    return response.data;
  },
};
