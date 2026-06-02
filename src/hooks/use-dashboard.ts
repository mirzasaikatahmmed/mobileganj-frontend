import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboardStats(params?: {
  branchId?: string;
  dateFilter?: 'today' | 'last_7_days' | 'this_month' | 'custom';
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ['dashboard-stats', params],
    queryFn: () => dashboardService.getStats(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRecentSales(limit: number = 10) {
  return useQuery({
    queryKey: ['recent-sales', limit],
    queryFn: () => dashboardService.getRecentSales(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useDueList(limit: number = 10) {
  return useQuery({
    queryKey: ['due-list', limit],
    queryFn: () => dashboardService.getDueList(limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
