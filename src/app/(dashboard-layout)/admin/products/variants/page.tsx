'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import Link from 'next/link';

const mockVariants = [
  { id: '1', productName: 'iPhone 15 Pro Max', storage: '256GB', ram: '8GB', color: 'Blue Titanium', region: 'USA', price: 145000, stock: 5 },
  { id: '2', productName: 'iPhone 15 Pro Max', storage: '512GB', ram: '8GB', color: 'Natural Titanium', region: 'USA', price: 165000, stock: 3 },
  { id: '3', productName: 'Samsung S24 Ultra', storage: '256GB', ram: '12GB', color: 'Titanium Gray', region: 'UK', price: 135000, stock: 8 },
  { id: '4', productName: 'Samsung S24 Ultra', storage: '512GB', ram: '12GB', color: 'Titanium Black', region: 'UK', price: 155000, stock: 4 },
];

export default function VariantsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredVariants = mockVariants.filter(v =>
    v.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Product Variants</h1>
          <p className="text-muted-foreground">Manage product variations</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Variant
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Variants</p>
          <h3 className="text-2xl font-bold mt-1">{mockVariants.length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Stock</p>
          <h3 className="text-2xl font-bold mt-1">{mockVariants.reduce((sum, v) => sum + v.stock, 0)}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">In Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">{mockVariants.filter(v => v.stock > 0).length}</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">{mockVariants.filter(v => v.stock === 0).length}</h3>
        </div>
      </div>

      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by product name..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Variants</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">SL</th>
                <th className="text-left p-4 font-semibold">Product Name</th>
                <th className="text-left p-4 font-semibold">Storage</th>
                <th className="text-left p-4 font-semibold">RAM</th>
                <th className="text-left p-4 font-semibold">Color</th>
                <th className="text-left p-4 font-semibold">Region</th>
                <th className="text-right p-4 font-semibold">Price</th>
                <th className="text-center p-4 font-semibold">Stock</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVariants.map((variant, index) => (
                <motion.tr
                  key={variant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{variant.productName}</td>
                  <td className="p-4">{variant.storage}</td>
                  <td className="p-4">{variant.ram}</td>
                  <td className="p-4">{variant.color}</td>
                  <td className="p-4">{variant.region}</td>
                  <td className="p-4 text-right">৳{variant.price.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      variant.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {variant.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
