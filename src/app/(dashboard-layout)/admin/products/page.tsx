'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Plus, Search, Eye, Edit, Trash2, AlertTriangle, Smartphone, Headphones, Globe, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useProducts, useProductSummary, useDeleteProduct } from '@/hooks/use-products';
import { Product } from '@/services/product.service';

type TabKey = 'all' | 'overseas' | 'local' | 'accessories';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'all',         label: 'All Products',    icon: <Package className="w-4 h-4" />,     color: 'text-foreground' },
  { key: 'overseas',   label: 'Overseas Phone',   icon: <Globe className="w-4 h-4" />,       color: 'text-blue-600 dark:text-blue-400' },
  { key: 'local',      label: 'Local Phone',      icon: <Smartphone className="w-4 h-4" />,  color: 'text-green-600 dark:text-green-400' },
  { key: 'accessories',label: 'Accessories',      icon: <Headphones className="w-4 h-4" />,  color: 'text-purple-600 dark:text-purple-400' },
];

function getStatusBadge(status: string) {
  if (status === 'in_stock') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">In Stock</span>;
  } else if (status === 'out_of_stock') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Out of Stock</span>;
  } else if (status === 'sold') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Sold</span>;
  } else if (status === 'damaged') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Damaged</span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">{status}</span>;
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Build filter based on active tab
  const filter = useMemo(() => {
    const f: any = { page, limit: 20, search: searchQuery || undefined };
    
    if (activeTab === 'overseas') {
      f.category = 'phone';
      f.phoneType = 'overseas';
    } else if (activeTab === 'local') {
      f.category = 'phone';
      f.phoneType = 'local';
    } else if (activeTab === 'accessories') {
      f.category = 'accessories';
    }
    
    if (statusFilter !== 'all') {
      f.status = statusFilter;
    }
    
    return f;
  }, [activeTab, searchQuery, statusFilter, page]);

  const { data: productsData, isLoading, error } = useProducts(filter);
  const { data: summary } = useProductSummary();
  const deleteProduct = useDeleteProduct();

  const products = productsData?.data || [];
  const meta = productsData?.meta;

  // Calculate counts for tabs
  const counts = useMemo(() => ({
    all: summary?.totalProducts || 0,
    overseas: products.filter(p => p.category === 'phone' && p.phoneType === 'overseas').length,
    local: products.filter(p => p.category === 'phone' && p.phoneType === 'local').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  }), [summary, products]);

  const showImei = activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local';

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your inventory</p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <Link href="/admin/products/damage" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Damage Tracking
            </Button>
          </Link>
          <Link href="/admin/products/new" className="flex-1 sm:flex-none">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      {summary ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <h3 className="text-2xl font-bold mt-1">{summary.totalProducts}</h3>
          </div>
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Total Stock</p>
            <h3 className="text-2xl font-bold mt-1 text-blue-600">{summary.totalStockQty}</h3>
          </div>
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <h3 className="text-2xl font-bold mt-1 text-yellow-600">{summary.lowStockItems}</h3>
          </div>
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <h3 className="text-2xl font-bold mt-1 text-red-600">{summary.outOfStockItems}</h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      )}

      {/* Category Tabs */}
      <div className="card-base overflow-hidden">
        <div className="flex overflow-x-auto border-b scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                activeTab === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <span className={activeTab === tab.key ? 'text-primary' : tab.color}>
                {tab.icon}
              </span>
              {tab.label}
              <span className={cn(
                'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="p-4 border-b bg-muted/20">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={showImei ? 'Search by name, IMEI...' : 'Search by name...'}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/40 whitespace-nowrap">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">SL</th>
                <th className="text-left p-4 font-semibold text-sm">Product Name</th>
                {activeTab === 'all' && (
                  <th className="text-left p-4 font-semibold text-sm">Category</th>
                )}
                {(activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local') && (
                  <th className="text-left p-4 font-semibold text-sm">Type</th>
                )}
                {showImei && (
                  <th className="text-left p-4 font-semibold text-sm">IMEI</th>
                )}
                <th className="text-right p-4 font-semibold text-sm">Purchase</th>
                <th className="text-right p-4 font-semibold text-sm">Selling</th>
                <th className="text-center p-4 font-semibold text-sm">Stock</th>
                <th className="text-center p-4 font-semibold text-sm">Status</th>
                <th className="text-center p-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="p-4">
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-destructive">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
                    <p>Failed to load products</p>
                  </td>
                </tr>
              ) : (
              <AnimatePresence mode="wait">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No products found</p>
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{(page - 1) * 20 + index + 1}</td>
                      <td className="p-4 font-medium min-w-[180px]">{product.title}</td>
                      {activeTab === 'all' && (
                        <td className="p-4 text-sm capitalize">{product.category}</td>
                      )}
                      {(activeTab === 'all' || activeTab === 'overseas' || activeTab === 'local') && (
                        <td className="p-4">
                          {product.phoneType && (
                            <span className={cn(
                              'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize',
                              product.phoneType === 'overseas'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            )}>
                              {product.phoneType}
                            </span>
                          )}
                        </td>
                      )}
                      {showImei && (
                        <td className="p-4 text-sm text-muted-foreground font-mono">{product.imei1 || '—'}</td>
                      )}
                      <td className="p-4 text-right text-sm">৳{product.purchasePrice.toLocaleString()}</td>
                      <td className="p-4 text-right text-sm font-medium">৳{product.sellingPrice.toLocaleString()}</td>
                      <td className="p-4 text-center text-sm font-semibold">{product.stockQty}</td>
                      <td className="p-4 text-center">{getStatusBadge(product.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(product.id)}
                            disabled={deleteProduct.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {meta && products.length > 0 && (
          <div className="px-4 py-3 border-t bg-muted/20 text-sm text-muted-foreground flex items-center justify-between">
            <span>Showing {products.length} of {meta.total} products</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page >= meta.totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
