export interface Sale {
  id: string;
  invoiceNo: string;
  saleDate: string;
  customerId: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    address?: string;
  };
  branchId?: string;
  branch?: {
    id: string;
    name: string;
  };
  items: SaleItem[];
  subtotal: number;
  discountType?: 'fixed' | 'percentage';
  discountValue?: number;
  discountAmount: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  dueDate?: string;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'bank';
  status: 'paid' | 'partial_paid' | 'due';
  note?: string;
  payments?: Payment[];
  createdBy?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  product: {
    id: string;
    title: string;
    barcode: string;
    category: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imei?: string;
  warrantyMonths?: number;
  customWarrantyText?: string;
  batteryHealth?: number;
}

export interface Payment {
  id: string;
  saleId: string;
  amount: number;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'bank';
  paymentDate: string;
  receivedById: string;
  note?: string;
}

export interface CreateSaleDto {
  customerName?: string;
  customerPhone: string;
  customerAddress?: string;
  branchId?: string;
  items: CreateSaleItemDto[];
  discountType?: 'fixed' | 'percentage';
  discountValue?: number;
  paidAmount: number;
  dueDate?: string;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'bank';
  note?: string;
}

export interface CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  imei?: string;
  warrantyMonths?: number;
  customWarrantyText?: string;
  batteryHealth?: number;
}

export interface SaleFilterDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'paid' | 'partial_paid' | 'due';
  customerId?: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
}

export interface SalesStats {
  totalSales: number;
  totalPaid: number;
  totalDue: number;
  totalInvoices: number;
}
