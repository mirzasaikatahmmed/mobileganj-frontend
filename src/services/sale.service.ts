import apiClient from '@/lib/axios';
import { Sale, CreateSaleDto, SaleFilterDto, SalesStats } from '@/types/sale';

export const salesService = {
  getAll: async (filters?: SaleFilterDto) => {
    const { data } = await apiClient.get('/sales', { params: filters });
    return data;
  },

  getById: async (id: string): Promise<Sale> => {
    const { data } = await apiClient.get(`/sales/${id}`);
    return data;
  },

  getByInvoice: async (invoiceNo: string): Promise<Sale> => {
    const { data } = await apiClient.get(`/sales/invoice/${invoiceNo}`);
    return data;
  },

  getRecent: async (limit: number = 10): Promise<Sale[]> => {
    const { data } = await apiClient.get('/sales/recent', { params: { limit } });
    return data;
  },

  getDueList: async (limit: number = 10): Promise<Sale[]> => {
    const { data } = await apiClient.get('/sales/due-list', { params: { limit } });
    return data;
  },

  create: async (saleData: CreateSaleDto): Promise<Sale> => {
    const { data } = await apiClient.post('/sales', saleData);
    return data;
  },

  getStats: async (): Promise<SalesStats> => {
    const { data } = await apiClient.get('/sales', { params: { limit: 1000 } });
    const sales = data.data || [];
    
    const stats: SalesStats = {
      totalSales: 0,
      totalPaid: 0,
      totalDue: 0,
      totalInvoices: data.meta?.total || 0,
    };

    sales.forEach((sale: Sale) => {
      stats.totalSales += Number(sale.grandTotal) || 0;
      stats.totalPaid += Number(sale.paidAmount) || 0;
      stats.totalDue += Number(sale.dueAmount) || 0;
    });

    return stats;
  },
};
