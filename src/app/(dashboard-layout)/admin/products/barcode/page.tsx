'use client';

import { useState } from 'react';
import { Search, Printer, Download, Barcode as BarcodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/use-products';
import { productService } from '@/services/product.service';
import { showToast } from '@/lib/toast';

export default function BarcodePage() {
  const { data: productsData, isLoading } = useProducts({ limit: 100 });
  const products = productsData?.data || [];
  
  const [search, setSearch] = useState('');
  const [labelSize, setLabelSize] = useState('40x25');
  const [showPrice, setShowPrice] = useState(true);
  const [showName, setShowName] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const handlePrint = () => {
    if (selectedProducts.length === 0) {
      showToast.error('Please select at least one product');
      return;
    }
    showToast.success(`Printing ${selectedProducts.length} barcode(s)...`);
  };

  const handleDownload = () => {
    if (selectedProducts.length === 0) {
      showToast.error('Please select at least one product');
      return;
    }
    showToast.success(`Downloading ${selectedProducts.length} barcode(s)...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Print Barcode/Labels</h1>
          <p className="text-muted-foreground">Generate and print product barcodes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload} disabled={selectedProducts.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Download ({selectedProducts.length})
          </Button>
          <Button onClick={handlePrint} disabled={selectedProducts.length === 0}>
            <Printer className="w-4 h-4 mr-2" />
            Print ({selectedProducts.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings */}
        <div className="card-base p-6 space-y-6">
          <h3 className="font-semibold text-lg">Label Settings</h3>
          
          <div className="space-y-2">
            <Label>Label Size</Label>
            <Select value={labelSize} onValueChange={setLabelSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="40x25">40mm x 25mm</SelectItem>
                <SelectItem value="50x30">50mm x 30mm</SelectItem>
                <SelectItem value="60x40">60mm x 40mm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Display Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="showName" checked={showName} onCheckedChange={(checked) => setShowName(checked as boolean)} />
              <label htmlFor="showName" className="text-sm cursor-pointer">
                Show Product Name
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="showPrice" checked={showPrice} onCheckedChange={(checked) => setShowPrice(checked as boolean)} />
              <label htmlFor="showPrice" className="text-sm cursor-pointer">
                Show Price
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <BarcodeIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-xs text-muted-foreground">Label Preview</p>
            {showName && <p className="text-sm font-medium mt-2">Product Name</p>}
            <div className="my-2 h-12 bg-muted rounded flex items-center justify-center">
              <span className="text-xs font-mono">||||||||||||||||</span>
            </div>
            {showPrice && <p className="text-sm font-semibold">৳ 00,000</p>}
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-base p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or barcode..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="card-base p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">
                      <Checkbox
                        checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={toggleAll}
                      />
                    </th>
                    <th className="text-left p-4 font-semibold">Product Name</th>
                    <th className="text-left p-4 font-semibold">Barcode</th>
                    <th className="text-right p-4 font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedIds.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                      </td>
                      <td className="p-4 font-medium">{product.title}</td>
                      <td className="p-4 font-mono text-sm">{product.barcode}</td>
                      <td className="p-4 text-right">৳{product.sellingPrice.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
