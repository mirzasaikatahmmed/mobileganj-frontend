import apiClient from '@/lib/axios';
import { WarrantyTemplate, TermsCondition, CreateWarrantyDto, CreateTermsDto } from '@/types/invoice-settings';

export const invoiceSettingsService = {
  // Warranties
  getAllWarranties: async (): Promise<WarrantyTemplate[]> => {
    const { data } = await apiClient.get('/invoice-settings/warranties');
    return data;
  },

  createWarranty: async (dto: CreateWarrantyDto): Promise<WarrantyTemplate> => {
    const { data } = await apiClient.post('/invoice-settings/warranties', dto);
    return data;
  },

  updateWarranty: async (id: string, dto: Partial<CreateWarrantyDto>): Promise<WarrantyTemplate> => {
    const { data } = await apiClient.put(`/invoice-settings/warranties/${id}`, dto);
    return data;
  },

  deleteWarranty: async (id: string): Promise<void> => {
    await apiClient.delete(`/invoice-settings/warranties/${id}`);
  },

  // Terms
  getAllTerms: async (): Promise<TermsCondition[]> => {
    const { data } = await apiClient.get('/invoice-settings/terms');
    return data;
  },

  createTerms: async (dto: CreateTermsDto): Promise<TermsCondition> => {
    const { data } = await apiClient.post('/invoice-settings/terms', dto);
    return data;
  },

  updateTerms: async (id: string, dto: Partial<CreateTermsDto>): Promise<TermsCondition> => {
    const { data } = await apiClient.put(`/invoice-settings/terms/${id}`, dto);
    return data;
  },

  deleteTerms: async (id: string): Promise<void> => {
    await apiClient.delete(`/invoice-settings/terms/${id}`);
  },
};
