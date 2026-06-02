import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  productSettingsService,
  ProductSettingType,
  CreateProductSettingDto,
  UpdateProductSettingDto,
} from '@/services/product-settings.service';
import { showToast } from '@/lib/toast';

const QUERY_KEY = 'product-settings';

export const useProductSettings = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: productSettingsService.getAll,
  });
};

export const useProductSettingsByType = (type: ProductSettingType) => {
  return useQuery({
    queryKey: [QUERY_KEY, type],
    queryFn: () => productSettingsService.getByType(type),
  });
};

export const useCreateProductSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateProductSettingDto) => productSettingsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      showToast.success('Added successfully');
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || 'Failed to add');
    },
  });
};

export const useUpdateProductSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateProductSettingDto }) =>
      productSettingsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      showToast.success('Updated successfully');
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || 'Failed to update');
    },
  });
};

export const useDeleteProductSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productSettingsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      showToast.success('Deleted successfully');
    },
    onError: (error: any) => {
      showToast.error(error.response?.data?.message || 'Failed to delete');
    },
  });
};
