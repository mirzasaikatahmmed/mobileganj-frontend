export interface SaleReturnItem {
  id: number;
  saleReturnId: number;
  saleItemId: number;
  productId: number;
  product?: {
    id: number;
    name: string;
    sku: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  reason?: string;
}

export interface SaleReturn {
  id: number;
  returnNumber: string;
  saleId: number;
  sale?: {
    id: number;
    invoiceNumber: string;
    totalAmount: number;
  };
  customerId?: number;
  customer?: {
    id: number;
    name: string;
    phone: string;
  };
  items: SaleReturnItem[];
  totalAmount: number;
  refundAmount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  refundMethod?: 'cash' | 'bank_transfer' | 'store_credit';
  notes?: string;
  processedBy?: number;
  processedByUser?: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSaleReturnItemDto {
  saleItemId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  reason?: string;
}

export interface CreateSaleReturnDto {
  saleId: number;
  items: CreateSaleReturnItemDto[];
  reason: string;
  notes?: string;
}

export interface UpdateSaleReturnDto {
  status?: 'pending' | 'approved' | 'rejected' | 'completed';
  refundMethod?: 'cash' | 'bank_transfer' | 'store_credit';
  refundAmount?: number;
  notes?: string;
}

export interface SaleReturnStats {
  total: number;
  pending: number;
  approved: number;
  completed: number;
  totalAmount: number;
  refundedAmount: number;
}
