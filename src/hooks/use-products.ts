import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, ProductFilter, CreateProductPayload, CreateBrandPayload, CreateDamagePayload } from '@/services/product.service';
import { showToast } from '@/lib/toast';

export const PRODUCTS_KEY = ['products'];
export const BRANDS_KEY = ['brands'];
export const DAMAGES_KEY = ['damages'];

// Products
export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, filter],
    queryFn: () => productService.getAll(filter),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}

export function useProductSummary() {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, 'summary'],
    queryFn: productService.getSummary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductPayload) => productService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
      showToast.success('Product created successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to create product'),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductPayload> }) =>
      productService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
      showToast.success('Product updated successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to update product'),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
      showToast.success('Product deleted successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to delete product'),
  });
}

export function useSearchProductByImei(imei: string) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, 'imei', imei],
    queryFn: () => productService.searchByImei(imei),
    enabled: !!imei && imei.length >= 10,
  });
}

export function useSearchProductByBarcode(barcode: string) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, 'barcode', barcode],
    queryFn: () => productService.searchByBarcode(barcode),
    enabled: !!barcode && barcode.length >= 5,
  });
}

// Brands
export function useBrands() {
  return useQuery({
    queryKey: BRANDS_KEY,
    queryFn: productService.getAllBrands,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBrandPayload) => productService.createBrand(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANDS_KEY });
      showToast.success('Brand created successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to create brand'),
  });
}

export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateBrandPayload }) =>
      productService.updateBrand(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANDS_KEY });
      showToast.success('Brand updated successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to update brand'),
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.deleteBrand(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BRANDS_KEY });
      showToast.success('Brand deleted successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to delete brand'),
  });
}

// Damages
export function useDamages(productId?: string) {
  return useQuery({
    queryKey: [...DAMAGES_KEY, productId],
    queryFn: () => productService.getAllDamages(productId),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useCreateDamage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDamagePayload) => productService.createDamage(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DAMAGES_KEY });
      qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
      showToast.success('Damage report created successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to create damage report'),
  });
}

export function useUpdateDamage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateDamagePayload> & { isReturned?: boolean } }) =>
      productService.updateDamage(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DAMAGES_KEY });
      qc.invalidateQueries({ queryKey: PRODUCTS_KEY });
      showToast.success('Damage report updated successfully');
    },
    onError: (err: Error) => showToast.error(err.message || 'Failed to update damage report'),
  });
}
