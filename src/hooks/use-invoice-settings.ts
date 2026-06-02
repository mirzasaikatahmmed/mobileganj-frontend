import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceSettingsService } from '@/services/invoice-settings.service';
import { CreateWarrantyDto, CreateTermsDto } from '@/types/invoice-settings';
import { toast } from 'sonner';

// Warranties
export const useWarranties = () => {
  return useQuery({
    queryKey: ['warranties'],
    queryFn: invoiceSettingsService.getAllWarranties,
  });
};

export const useCreateWarranty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWarrantyDto) => invoiceSettingsService.createWarranty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warranties'] });
      toast.success('Warranty template created');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create warranty');
    },
  });
};

export const useUpdateWarranty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateWarrantyDto> }) =>
      invoiceSettingsService.updateWarranty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warranties'] });
      toast.success('Warranty template updated');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update warranty');
    },
  });
};

export const useDeleteWarranty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoiceSettingsService.deleteWarranty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warranties'] });
      toast.success('Warranty template deleted');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete warranty');
    },
  });
};

// Terms
export const useTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: invoiceSettingsService.getAllTerms,
  });
};

export const useCreateTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTermsDto) => invoiceSettingsService.createTerms(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms & Conditions created');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create terms');
    },
  });
};

export const useUpdateTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTermsDto> }) =>
      invoiceSettingsService.updateTerms(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms & Conditions updated');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update terms');
    },
  });
};

export const useDeleteTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => invoiceSettingsService.deleteTerms(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Terms & Conditions deleted');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete terms');
    },
  });
};
