'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useWarranties, useCreateWarranty, useUpdateWarranty, useDeleteWarranty, useTerms, useCreateTerms, useUpdateTerms, useDeleteTerms } from '@/hooks/use-invoice-settings';
import { WarrantyTemplate, TermsCondition, CreateWarrantyDto, CreateTermsDto } from '@/types/invoice-settings';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

export default function InvoiceSettingsPage() {
  const { data: warranties = [], isLoading: loadingWarranties } = useWarranties();
  const { data: terms = [], isLoading: loadingTerms } = useTerms();
  
  const createWarrantyMutation = useCreateWarranty();
  const updateWarrantyMutation = useUpdateWarranty();
  const deleteWarrantyMutation = useDeleteWarranty();
  
  const createTermsMutation = useCreateTerms();
  const updateTermsMutation = useUpdateTerms();
  const deleteTermsMutation = useDeleteTerms();

  const [warrantyDialog, setWarrantyDialog] = useState(false);
  const [termsDialog, setTermsDialog] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState<WarrantyTemplate | null>(null);
  const [editingTerms, setEditingTerms] = useState<TermsCondition | null>(null);
  const [deleteWarranty, setDeleteWarranty] = useState<WarrantyTemplate | null>(null);
  const [deleteTerms, setDeleteTerms] = useState<TermsCondition | null>(null);

  const [warrantyForm, setWarrantyForm] = useState<CreateWarrantyDto>({ name: '', durationMonths: 12 });
  const [termsForm, setTermsForm] = useState<CreateTermsDto>({ title: '', content: '' });

  const handleWarrantySubmit = () => {
    if (editingWarranty) {
      updateWarrantyMutation.mutate({ id: editingWarranty.id, data: warrantyForm });
    } else {
      createWarrantyMutation.mutate(warrantyForm);
    }
    setWarrantyDialog(false);
    setEditingWarranty(null);
    setWarrantyForm({ name: '', durationMonths: 12 });
  };

  const handleTermsSubmit = () => {
    if (editingTerms) {
      updateTermsMutation.mutate({ id: editingTerms.id, data: termsForm });
    } else {
      createTermsMutation.mutate(termsForm);
    }
    setTermsDialog(false);
    setEditingTerms(null);
    setTermsForm({ title: '', content: '' });
  };

  const openEditWarranty = (warranty: WarrantyTemplate) => {
    setEditingWarranty(warranty);
    setWarrantyForm({ name: warranty.name, durationMonths: warranty.durationMonths, description: warranty.description });
    setWarrantyDialog(true);
  };

  const openEditTerms = (term: TermsCondition) => {
    setEditingTerms(term);
    setTermsForm({ title: term.title, content: term.content });
    setTermsDialog(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Invoice Settings</h1>
        <p className="text-muted-foreground">Manage warranty templates and terms & conditions</p>
      </div>

      <Tabs defaultValue="warranty" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="warranty">Warranty Templates</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="warranty" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-8" />
            </div>
            <Dialog open={warrantyDialog} onOpenChange={setWarrantyDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingWarranty(null); setWarrantyForm({ name: '', durationMonths: 12 }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Warranty
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingWarranty ? 'Edit' : 'Add'} Warranty Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Template Name</Label>
                    <Input value={warrantyForm.name} onChange={(e) => setWarrantyForm({ ...warrantyForm, name: e.target.value })} placeholder="e.g. 1 Year Official Warranty" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (Months)</Label>
                    <Input type="number" value={warrantyForm.durationMonths} onChange={(e) => setWarrantyForm({ ...warrantyForm, durationMonths: parseInt(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea value={warrantyForm.description || ''} onChange={(e) => setWarrantyForm({ ...warrantyForm, description: e.target.value })} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleWarrantySubmit}>{editingWarranty ? 'Update' : 'Save'} Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {loadingWarranties ? <LoadingSpinner /> : (
            <div className="bg-card border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold text-center">Duration</th>
                    <th className="p-4 font-semibold text-center">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {warranties.map((warranty) => (
                    <tr key={warranty.id} className="hover:bg-muted/30">
                      <td className="p-4 font-medium">{warranty.name}</td>
                      <td className="p-4 text-center">{warranty.durationMonths} Months</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${warranty.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {warranty.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => openEditWarranty(warranty)}>
                            <Edit className="w-4 h-4"/>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={() => setDeleteWarranty(warranty)}>
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="terms" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search terms..." className="pl-8" />
            </div>
            <Dialog open={termsDialog} onOpenChange={setTermsDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingTerms(null); setTermsForm({ title: '', content: '' }); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add T&C
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingTerms ? 'Edit' : 'Add'} Terms & Conditions</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={termsForm.title} onChange={(e) => setTermsForm({ ...termsForm, title: e.target.value })} placeholder="e.g. Standard Return Policy" />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea value={termsForm.content} onChange={(e) => setTermsForm({ ...termsForm, content: e.target.value })} placeholder="Write your terms and conditions here..." className="min-h-[150px]" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleTermsSubmit}>{editingTerms ? 'Update' : 'Save'} T&C</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {loadingTerms ? <LoadingSpinner /> : (
            <div className="bg-card border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-4 font-semibold w-1/3">Title</th>
                    <th className="p-4 font-semibold">Content Preview</th>
                    <th className="p-4 font-semibold text-center w-24">Status</th>
                    <th className="p-4 font-semibold text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {terms.map((term) => (
                    <tr key={term.id} className="hover:bg-muted/30">
                      <td className="p-4 font-medium">{term.title}</td>
                      <td className="p-4 text-muted-foreground truncate max-w-[200px]">{term.content}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${term.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {term.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => openEditTerms(term)}>
                            <Edit className="w-4 h-4"/>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={() => setDeleteTerms(term)}>
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={!!deleteWarranty}
        onOpenChange={(open) => !open && setDeleteWarranty(null)}
        onConfirm={() => { deleteWarrantyMutation.mutate(deleteWarranty!.id); setDeleteWarranty(null); }}
        title="Delete Warranty Template"
        description={`Are you sure you want to delete "${deleteWarranty?.name}"?`}
      />

      <ConfirmDialog
        open={!!deleteTerms}
        onOpenChange={(open) => !open && setDeleteTerms(null)}
        onConfirm={() => { deleteTermsMutation.mutate(deleteTerms!.id); setDeleteTerms(null); }}
        title="Delete Terms & Conditions"
        description={`Are you sure you want to delete "${deleteTerms?.title}"?`}
      />
    </div>
  );
}
