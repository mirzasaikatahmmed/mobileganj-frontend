import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { saleReturnService } from '@/services/sale-return.service';
import { CreateSaleReturnDto, UpdateSaleReturnDto } from '@/types/sale-return';
import { toast } from 'sonner';

export const useSaleReturns = (filters?: any) => {
  return useQuery({
    queryKey: ['sale-returns', filters],
    queryFn: () => saleReturnService.getAll(filters),
  });
};

export const useSaleReturn = (id: number) => {
  return useQuery({
    queryKey: ['sale-return', id],
    queryFn: () => saleReturnService.getById(id),
    enabled: !!id,
  });
};

export const useCreateSaleReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSaleReturnDto) => saleReturnService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sale-returns'] });
      queryClient.invalidateQueries({ queryKey: ['sale-return-stats'] });
      toast.success('Return created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create return');
    },
  });
};

export const useUpdateSaleReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateSaleReturnDto }) =>
      saleReturnService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sale-returns'] });
      queryClient.invalidateQueries({ queryKey: ['sale-return'] });
      queryClient.invalidateQueries({ queryKey: ['sale-return-stats'] });
      toast.success('Return updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update return');
    },
  });
};

export const useDeleteSaleReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => saleReturnService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sale-returns'] });
      queryClient.invalidateQueries({ queryKey: ['sale-return-stats'] });
      toast.success('Return deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete return');
    },
  });
};

export const useSaleReturnStats = () => {
  return useQuery({
    queryKey: ['sale-return-stats'],
    queryFn: () => saleReturnService.getStats(),
  });
};
