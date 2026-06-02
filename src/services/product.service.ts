import apiClient from '@/lib/axios';

export interface Product {
  id: string;
  title: string;
  category: 'phone' | 'accessories';
  phoneType?: 'overseas' | 'local';
  accessoryType?: string;
  brandId?: string;
  brand?: Brand;
  imei1?: string;
  imei2?: string;
  barcode: string;
  purchasePrice: number;
  sellingPrice: number;
  offerPrice?: number;
  stockQty: number;
  lowStockAlertQty?: number;
  status: 'in_stock' | 'out_of_stock' | 'sold' | 'damaged';
  condition: 'brand_new' | 'used' | 'like_new';
  region?: string;
  storage?: string;
  ram?: string;
  color?: string;
  photo?: string;
  note?: string;
  invoiceReference?: string;
  warrantyMonths?: number;
  customWarrantyText?: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  isPreOrder: boolean;
  supplierId?: string;
  supplier?: any;
  localSellerId?: string;
  localSeller?: any;
  branchId?: string;
  branch?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDamage {
  id: string;
  productId: string;
  product?: Product;
  reason: string;
  description?: string;
  damageDate: string;
  isReturned: boolean;
  reportedById: string;
  reportedBy?: any;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  phoneType?: string;
  status?: string;
  condition?: string;
  brandId?: string;
  supplierId?: string;
  imei?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProductSummary {
  totalProducts: number;
  totalStockQty: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export interface CreateProductPayload {
  title: string;
  category: 'phone' | 'accessories';
  phoneType?: 'overseas' | 'local';
  accessoryType?: string;
  brandId?: string;
  imei1?: string;
  imei2?: string;
  purchasePrice: number;
  sellingPrice: number;
  offerPrice?: number;
  stockQty?: number;
  lowStockAlertQty?: number;
  condition?: string;
  region?: string;
  storage?: string;
  ram?: string;
  color?: string;
  photo?: string;
  note?: string;
  invoiceReference?: string;
  warrantyMonths?: number;
  customWarrantyText?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isPreOrder?: boolean;
  supplierId?: string;
  supplierName?: string;
  supplierPhone?: string;
  localSellerInfo?: {
    name: string;
    phone: string;
    address?: string;
    nid?: string;
  };
  branchId?: string;
}

export interface CreateBrandPayload {
  name: string;
  logo?: string;
  isActive?: boolean;
}

export interface CreateDamagePayload {
  productId: string;
  reason: string;
  description?: string;
  damageDate: string;
}

export const productService = {
  // Products
  async getAll(filter?: ProductFilter) {
    const response = await apiClient.get<{
      data: Product[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>('/products', { params: filter });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductPayload) {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateProductPayload>) {
    const response = await apiClient.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete<{ message: string }>(`/products/${id}`);
    return response.data;
  },

  async getSummary() {
    const response = await apiClient.get<ProductSummary>('/products/summary');
    return response.data;
  },

  async searchByImei(imei: string) {
    const response = await apiClient.get<Product>(`/products/search/imei/${imei}`);
    return response.data;
  },

  async searchByBarcode(barcode: string) {
    const response = await apiClient.get<Product>(`/products/search/barcode/${barcode}`);
    return response.data;
  },

  // Brands
  async getAllBrands() {
    const response = await apiClient.get<Brand[]>('/products/brands');
    return response.data;
  },

  async createBrand(data: CreateBrandPayload) {
    const response = await apiClient.post<Brand>('/products/brands', data);
    return response.data;
  },

  async updateBrand(id: string, data: CreateBrandPayload) {
    const response = await apiClient.patch<Brand>(`/products/brands/${id}`, data);
    return response.data;
  },

  async deleteBrand(id: string) {
    const response = await apiClient.delete<{ message: string }>(`/products/brands/${id}`);
    return response.data;
  },

  // Damages
  async getAllDamages(productId?: string) {
    const response = await apiClient.get<ProductDamage[]>('/products/damages/all', {
      params: productId ? { productId } : {},
    });
    return response.data;
  },

  async createDamage(data: CreateDamagePayload) {
    const response = await apiClient.post<ProductDamage>('/products/damages', data);
    return response.data;
  },

  async updateDamage(id: string, data: Partial<CreateDamagePayload> & { isReturned?: boolean }) {
    const response = await apiClient.patch<ProductDamage>(`/products/damages/${id}`, data);
    return response.data;
  },

  // Barcode
  generateBarcodeUrl(value: string, format: 'png' | 'svg' = 'png') {
    return `${apiClient.defaults.baseURL}/products/barcode/generate?value=${value}&format=${format}`;
  },
};
