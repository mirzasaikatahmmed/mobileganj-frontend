'use client';

import { useState } from 'react';
import { AlertTriangle, Plus, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDamages, useCreateDamage, useUpdateDamage, useSearchProductByImei } from '@/hooks/use-products';
import { format } from 'date-fns';

export default function ProductDamagePage() {
  const { data: damages, isLoading } = useDamages();
  const createDamage = useCreateDamage();
  const updateDamage = useUpdateDamage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [imeiSearch, setImeiSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [damageDate, setDamageDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { data: searchedProduct } = useSearchProductByImei(imeiSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !reason) return;

    createDamage.mutate(
      {
        productId: selectedProductId,
        reason,
        description,
        damageDate,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          resetForm();
        },
      }
    );
  };

  const resetForm = () => {
    setImeiSearch('');
    setSelectedProductId('');
    setReason('');
    setDescription('');
    setDamageDate(new Date().toISOString().split('T')[0]);
  };

  const handleMarkReturned = (id: string) => {
    updateDamage.mutate({ id, data: { isReturned: true } });
  };

  const pendingCount = damages?.filter(d => !d.isReturned).length || 0;
  const returnedCount = damages?.filter(d => d.isReturned).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            Product Damage Tracking
          </h1>
          <p className="text-muted-foreground">Track damaged products & returns</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Report Damage
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Damaged</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">{damages?.length || 0}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">{pendingCount}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Returned</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">{returnedCount}</h3>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Product</th>
                  <th className="text-left p-4 font-semibold">Reason</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Reported By</th>
                  <th className="text-center p-4 font-semibold">Status</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {damages && damages.length > 0 ? (
                  damages.map((damage) => (
                    <tr key={damage.id} className="border-t hover:bg-muted/30">
                      <td className="p-4 font-medium">{damage.product?.title || 'N/A'}</td>
                      <td className="p-4">{damage.reason}</td>
                      <td className="p-4">{format(new Date(damage.damageDate), 'dd MMM yyyy')}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {damage.reportedBy?.name || 'N/A'}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            damage.isReturned
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}
                        >
                          {damage.isReturned ? 'Returned' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {!damage.isReturned && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkReturned(damage.id)}
                            disabled={updateDamage.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Returned
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                      No damage reports found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Damage Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Product Damage</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Search Product by IMEI *</Label>
              <Input
                placeholder="Enter IMEI"
                value={imeiSearch}
                onChange={(e) => {
                  setImeiSearch(e.target.value);
                  if (searchedProduct) {
                    setSelectedProductId(searchedProduct.id);
                  }
                }}
                required
              />
              {searchedProduct && (
                <p className="text-sm text-green-600 mt-1">
                  Found: {searchedProduct.title}
                </p>
              )}
            </div>

            <div>
              <Label>Reason *</Label>
              <Input
                placeholder="e.g., Screen Crack, Water Damage"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Damage Date *</Label>
              <Input
                type="date"
                value={damageDate}
                onChange={(e) => setDamageDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe the damage..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createDamage.isPending || !selectedProductId}>
                {createDamage.isPending ? 'Reporting...' : 'Report Damage'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
