"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useProducts } from "@/hooks/use-products";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface Product {
  id: string;
  title: string;
  sellingPrice: number;
  offerPrice?: number;
  stockQty: number;
  category: string;
  imei1?: string;
  barcode: string;
}

interface ProductListProps {
  onAddToCart: (product: { id: string; name: string; price: number; stock: number; imei?: string }) => void;
}

export default function ProductList({ onAddToCart }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: productsData, isLoading } = useProducts({
    search,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    status: 'in_stock',
  });

  const products = productsData?.data || [];

  const handleAddToCart = (product: Product) => {
    const price = product.offerPrice || product.sellingPrice;
    onAddToCart({
      id: product.id,
      name: product.title,
      price,
      stock: product.stockQty,
      imei: product.imei1,
    });
    toast.success(`${product.title} added to cart`);
  };

  if (isLoading) {
    return (
      <div className="card-base p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="card-base p-4 space-y-4 sticky top-6">
      <h3 className="font-semibold">Products</h3>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, IMEI or barcode..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="text-xs"
        >
          All
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === "phone" ? "default" : "outline"}
          onClick={() => setSelectedCategory("phone")}
          className="text-xs"
        >
          Phones
        </Button>
        <Button
          size="sm"
          variant={selectedCategory === "accessories" ? "default" : "outline"}
          onClick={() => setSelectedCategory("accessories")}
          className="text-xs"
        >
          Accessories
        </Button>
      </div>

      {/* Product List */}
      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="space-y-2">
          {products.map((product: Product) => (
            <div
              key={product.id}
              className="p-3 rounded-lg border hover:border-primary cursor-pointer transition-colors group"
              onClick={() => handleAddToCart(product)}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {product.title}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    ৳{(product.offerPrice || product.sellingPrice).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stock: {product.stockQty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {products.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No products found</p>
        </div>
      )}
    </div>
  );
}
