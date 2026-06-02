import { axiosClient } from '@/lib/axios';

export enum ProductSettingType {
  PHONE_TYPE = 'phone_type',
  ACCESSORY_TYPE = 'accessory_type',
  CONDITION = 'condition',
  REGION = 'region',
  UNIT = 'unit',
}

export interface ProductSetting {
  id: string;
  type: ProductSettingType;
  name: string;
  value: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSettingsResponse {
  phoneTypes: ProductSetting[];
  accessoryTypes: ProductSetting[];
  conditions: ProductSetting[];
  regions: ProductSetting[];
  units: ProductSetting[];
}

export interface CreateProductSettingDto {
  type: ProductSettingType;
  name: string;
  value: string;
}

export interface UpdateProductSettingDto {
  name?: string;
  value?: string;
}

export const productSettingsService = {
  getAll: async (): Promise<ProductSettingsResponse> => {
    const { data } = await axiosClient.get('/product-settings');
    return data;
  },

  getByType: async (type: ProductSettingType): Promise<ProductSetting[]> => {
    const { data } = await axiosClient.get(`/product-settings/type/${type}`);
    return data;
  },

  getById: async (id: string): Promise<ProductSetting> => {
    const { data } = await axiosClient.get(`/product-settings/${id}`);
    return data;
  },

  create: async (dto: CreateProductSettingDto): Promise<ProductSetting> => {
    const { data } = await axiosClient.post('/product-settings', dto);
    return data;
  },

  update: async (id: string, dto: UpdateProductSettingDto): Promise<ProductSetting> => {
    const { data } = await axiosClient.patch(`/product-settings/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/product-settings/${id}`);
  },
};
