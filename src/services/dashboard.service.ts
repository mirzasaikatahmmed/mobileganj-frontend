import apiClient from '@/lib/axios';

export interface DashboardStats {
  totalSales: number;
  instantPaid: number;
  totalDueSale: number;
  duePaid: number;
  totalReturn: number;
  totalExpense: number;
  totalProfit: number;
  supplierDue: number;
  mobileServiceProfit: number;
}

export interface RecentSale {
  id: string;
  invoiceNo: string;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
  customer: {
    id: string;
    name: string;
  };
}

export interface DueItem {
  id: string;
  invoiceNo: string;
  dueAmount: number;
  customer: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export const dashboardService = {
  async getStats(params?: {
    branchId?: string;
    dateFilter?: 'today' | 'last_7_days' | 'this_month' | 'custom';
    startDate?: string;
    endDate?: string;
  }): Promise<DashboardStats> {
    const response = await apiClient.get('/dashboard/stats', { params });
    return response.data;
  },

  async getRecentSales(limit: number = 10): Promise<RecentSale[]> {
    const response = await apiClient.get('/dashboard/recent-sales', {
      params: { limit },
    });
    return response.data;
  },

  async getDueList(limit: number = 10): Promise<DueItem[]> {
    const response = await apiClient.get('/dashboard/due-list', {
      params: { limit },
    });
    return response.data;
  },
};
