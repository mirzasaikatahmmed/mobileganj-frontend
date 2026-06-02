'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProduct, useBrands } from '@/hooks/use-products';
import { useBranches } from '@/hooks/use-branches';

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const { data: brands } = useBrands();
  const { data: branches } = useBranches();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'phone' as 'phone' | 'accessories',
    phoneType: 'overseas' as 'overseas' | 'local' | undefined,
    accessoryType: '' as any,
    brandId: '',
    imei1: '',
    imei2: '',
    purchasePrice: 0,
    sellingPrice: 0,
    offerPrice: 0,
    stockQty: 1,
    lowStockAlertQty: 5,
    condition: 'brand_new' as any,
    region: '',
    storage: '',
    ram: '',
    color: '',
    note: '',
    warrantyMonths: 12,
    branchId: '',
    supplierName: '',
    supplierPhone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: any = {
      title: formData.title,
      category: formData.category,
      purchasePrice: formData.purchasePrice,
      sellingPrice: formData.sellingPrice,
      stockQty: formData.stockQty,
      condition: formData.condition,
    };

    if (formData.category === 'phone') {
      payload.phoneType = formData.phoneType;
      payload.imei1 = formData.imei1;
      payload.imei2 = formData.imei2;
      payload.storage = formData.storage;
      payload.ram = formData.ram;
      payload.region = formData.region;
      
      if (formData.phoneType === 'overseas') {
        payload.supplierName = formData.supplierName;
        payload.supplierPhone = formData.supplierPhone;
      }
    } else {
      payload.accessoryType = formData.accessoryType;
    }

    if (formData.brandId) payload.brandId = formData.brandId;
    if (formData.offerPrice) payload.offerPrice = formData.offerPrice;
    if (formData.lowStockAlertQty) payload.lowStockAlertQty = formData.lowStockAlertQty;
    if (formData.color) payload.color = formData.color;
    if (formData.note) payload.note = formData.note;
    if (formData.warrantyMonths) payload.warrantyMonths = formData.warrantyMonths;
    if (formData.branchId) payload.branchId = formData.branchId;

    createProduct.mutate(payload, {
      onSuccess: () => {
        router.push('/admin/products');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground">Stock in new product to inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-base p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Name *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., iPhone 15 Pro Max"
              required
            />
          </div>

          <div>
            <Label>Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: any) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.category === 'phone' && (
            <div>
              <Label>Phone Type *</Label>
              <Select
                value={formData.phoneType}
                onValueChange={(value: any) => setFormData({ ...formData, phoneType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overseas">Overseas</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.category === 'accessories' && (
            <div>
              <Label>Accessory Type *</Label>
              <Select
                value={formData.accessoryType}
                onValueChange={(value: any) => setFormData({ ...formData, accessoryType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="charger">Charger</SelectItem>
                  <SelectItem value="earphone">Earphone</SelectItem>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="power_bank">Power Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Brand</Label>
            <Select
              value={formData.brandId}
              onValueChange={(value) => setFormData({ ...formData, brandId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Branch</Label>
            <Select
              value={formData.branchId}
              onValueChange={(value) => setFormData({ ...formData, branchId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches?.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.category === 'phone' && (
            <>
              <div>
                <Label>IMEI 1</Label>
                <Input
                  value={formData.imei1}
                  onChange={(e) => setFormData({ ...formData, imei1: e.target.value })}
                  placeholder="15 digits"
                />
              </div>
              <div>
                <Label>IMEI 2</Label>
                <Input
                  value={formData.imei2}
                  onChange={(e) => setFormData({ ...formData, imei2: e.target.value })}
                  placeholder="15 digits"
                />
              </div>
              <div>
                <Label>Storage</Label>
                <Input
                  value={formData.storage}
                  onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                  placeholder="e.g., 256GB"
                />
              </div>
              <div>
                <Label>RAM</Label>
                <Input
                  value={formData.ram}
                  onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                  placeholder="e.g., 8GB"
                />
              </div>
              <div>
                <Label>Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => setFormData({ ...formData, region: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="uk">UK</SelectItem>
                    <SelectItem value="european">European</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label>Color</Label>
            <Input
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="e.g., Black, White"
            />
          </div>

          <div>
            <Label>Purchase Price (৳) *</Label>
            <Input
              type="number"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label>Selling Price (৳) *</Label>
            <Input
              type="number"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label>Offer Price (৳)</Label>
            <Input
              type="number"
              value={formData.offerPrice}
              onChange={(e) => setFormData({ ...formData, offerPrice: Number(e.target.value) })}
            />
          </div>

          <div>
            <Label>Stock Quantity *</Label>
            <Input
              type="number"
              value={formData.stockQty}
              onChange={(e) => setFormData({ ...formData, stockQty: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label>Low Stock Alert</Label>
            <Input
              type="number"
              value={formData.lowStockAlertQty}
              onChange={(e) => setFormData({ ...formData, lowStockAlertQty: Number(e.target.value) })}
            />
          </div>

          <div>
            <Label>Warranty (Months)</Label>
            <Input
              type="number"
              value={formData.warrantyMonths}
              onChange={(e) => setFormData({ ...formData, warrantyMonths: Number(e.target.value) })}
            />
          </div>

          {formData.category === 'phone' && formData.phoneType === 'overseas' && (
            <>
              <div>
                <Label>Supplier Name</Label>
                <Input
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  placeholder="Supplier name"
                />
              </div>
              <div>
                <Label>Supplier Phone</Label>
                <Input
                  value={formData.supplierPhone}
                  onChange={(e) => setFormData({ ...formData, supplierPhone: e.target.value })}
                  placeholder="Supplier phone"
                />
              </div>
            </>
          )}

          <div className="col-span-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={createProduct.isPending}>
            {createProduct.isPending ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
