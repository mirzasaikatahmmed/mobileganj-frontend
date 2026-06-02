import apiClient from '@/lib/axios';
import { SaleReturn, CreateSaleReturnDto, UpdateSaleReturnDto, SaleReturnStats } from '@/types/sale-return';

export const saleReturnService = {
  getAll: async (filters?: any) => {
    const { data } = await apiClient.get('/sale-returns', { params: filters });
    return data;
  },

  getById: async (id: number): Promise<SaleReturn> => {
    const { data } = await apiClient.get(`/sale-returns/${id}`);
    return data;
  },

  create: async (dto: CreateSaleReturnDto): Promise<SaleReturn> => {
    const { data } = await apiClient.post('/sale-returns', dto);
    return data;
  },

  update: async (id: number, dto: UpdateSaleReturnDto): Promise<SaleReturn> => {
    const { data } = await apiClient.put(`/sale-returns/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/sale-returns/${id}`);
  },

  getStats: async (): Promise<SaleReturnStats> => {
    const { data } = await apiClient.get('/sale-returns/stats');
    return data;
  },
};
