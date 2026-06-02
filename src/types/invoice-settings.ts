export interface WarrantyTemplate {
  id: string;
  name: string;
  durationMonths: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TermsCondition {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWarrantyDto {
  name: string;
  durationMonths: number;
  description?: string;
  isActive?: boolean;
}

export interface CreateTermsDto {
  title: string;
  content: string;
  isActive?: boolean;
  order?: number;
}
