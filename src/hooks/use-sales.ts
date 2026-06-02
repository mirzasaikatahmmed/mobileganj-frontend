import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salesService } from '@/services/sale.service';
import { CreateSaleDto, SaleFilterDto } from '@/types/sale';
import { toast } from 'sonner';

export const useSales = (filters?: SaleFilterDto) => {
  return useQuery({
    queryKey: ['sales', filters],
    queryFn: () => salesService.getAll(filters),
  });
};

export const useSale = (id: string) => {
  return useQuery({
    queryKey: ['sales', id],
    queryFn: () => salesService.getById(id),
    enabled: !!id,
  });
};

export const useSaleByInvoice = (invoiceNo: string) => {
  return useQuery({
    queryKey: ['sales', 'invoice', invoiceNo],
    queryFn: () => salesService.getByInvoice(invoiceNo),
    enabled: !!invoiceNo,
  });
};

export const useRecentSales = (limit: number = 10) => {
  return useQuery({
    queryKey: ['sales', 'recent', limit],
    queryFn: () => salesService.getRecent(limit),
  });
};

export const useDueSales = (limit: number = 10) => {
  return useQuery({
    queryKey: ['sales', 'due', limit],
    queryFn: () => salesService.getDueList(limit),
  });
};

export const useSalesStats = () => {
  return useQuery({
    queryKey: ['sales', 'stats'],
    queryFn: salesService.getStats,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSaleDto) => salesService.create(data),
    onSuccess: (sale) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success(`Sale created successfully! Invoice: ${sale.invoiceNo}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create sale');
    },
  });
};
