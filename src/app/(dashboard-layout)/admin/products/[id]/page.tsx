'use client';

import { ArrowLeft, Edit2, Trash2, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, use } from 'react';
import { useProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/use-products';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    purchasePrice: 0,
    sellingPrice: 0,
    offerPrice: 0,
    stockQty: 0,
    lowStockAlertQty: 0,
    warrantyMonths: 0,
    note: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        offerPrice: product.offerPrice || 0,
        stockQty: product.stockQty,
        lowStockAlertQty: product.lowStockAlertQty || 0,
        warrantyMonths: product.warrantyMonths || 0,
        note: product.note || '',
      });
    }
  }, [product]);

  const handleSave = () => {
    updateProduct.mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id, {
        onSuccess: () => {
          router.push('/admin/products');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <Link href="/admin/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground">
              {product.category} • {product.barcode}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteProduct.isPending}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSave} disabled={updateProduct.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {updateProduct.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 card-base p-6 space-y-6">
          <h3 className="font-semibold text-lg">Product Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Product Name</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Brand</Label>
              <Input value={product.brand?.name || 'N/A'} disabled />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={product.category} disabled className="capitalize" />
            </div>
            <div>
              <Label>Type</Label>
              <Input value={product.phoneType || 'N/A'} disabled className="capitalize" />
            </div>
            {product.imei1 && (
              <div>
                <Label>IMEI 1</Label>
                <Input value={product.imei1} disabled />
              </div>
            )}
            {product.imei2 && (
              <div>
                <Label>IMEI 2</Label>
                <Input value={product.imei2} disabled />
              </div>
            )}
            <div>
              <Label>Barcode</Label>
              <Input value={product.barcode} disabled />
            </div>
            <div>
              <Label>Status</Label>
              <Input value={product.status} disabled className="capitalize" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Purchase Price (৳)</Label>
              <Input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Selling Price (৳)</Label>
              <Input
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Offer Price (৳)</Label>
              <Input
                type="number"
                value={formData.offerPrice}
                onChange={(e) => setFormData({ ...formData, offerPrice: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                value={formData.stockQty}
                onChange={(e) => setFormData({ ...formData, stockQty: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Low Stock Alert</Label>
              <Input
                type="number"
                value={formData.lowStockAlertQty}
                onChange={(e) => setFormData({ ...formData, lowStockAlertQty: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Warranty (Months)</Label>
              <Input
                type="number"
                value={formData.warrantyMonths}
                onChange={(e) => setFormData({ ...formData, warrantyMonths: Number(e.target.value) })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-base p-4">
            <h4 className="font-semibold mb-3">Additional Info</h4>
            <div className="space-y-2 text-sm">
              {product.storage && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span className="font-medium">{product.storage}</span>
                </div>
              )}
              {product.ram && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-medium">{product.ram}</span>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
              )}
              {product.region && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium capitalize">{product.region}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition:</span>
                <span className="font-medium capitalize">{product.condition.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          <div className="card-base p-4">
            <h4 className="font-semibold mb-3">Timestamps</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span>
                <p className="font-medium">{new Date(product.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Updated:</span>
                <p className="font-medium">{new Date(product.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
