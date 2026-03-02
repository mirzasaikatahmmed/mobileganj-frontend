'use client';

import { Home, Plus, Edit, Trash2, Eye, Image, Package, Star, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HomePageManagementPage() {
  const [activeTab, setActiveTab] = useState('hero');

  const heroSlides = [
    { id: 1, title: 'iPhone 15 Pro Max', subtitle: 'Titanium. So strong. So light.', image: '/hero1.jpg', link: '/product/iphone-15', active: true },
    { id: 2, title: 'Samsung Galaxy S24 Ultra', subtitle: 'AI is here', image: '/hero2.jpg', link: '/product/s24', active: true },
  ];

  const featuredProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 150000, image: '/product1.jpg', featured: true },
    { id: 2, name: 'Samsung S24 Ultra', price: 130000, image: '/product2.jpg', featured: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Home Page Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage homepage content and sections
          </p>
        </div>
        <Button className="gap-2">
          <Eye className="w-4 h-4" />
          Preview Homepage
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg">
        <div className="flex overflow-x-auto border-b">
          {[
            { id: 'hero', label: 'Hero Banner', icon: Image },
            { id: 'featured', label: 'Featured Products', icon: Star },
            { id: 'categories', label: 'Categories', icon: Package },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Hero Banner Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Hero Slider</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Slide
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Image className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-medium">{slide.title}</h4>
                        <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          slide.active 
                            ? 'bg-green-50 dark:bg-green-950/30 text-green-600' 
                            : 'bg-gray-50 dark:bg-gray-950/30 text-gray-600'
                        }`}>
                          {slide.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2">
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2 text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Products Tab */}
          {activeTab === 'featured' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Featured Products</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>

              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Product</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold">Price</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Status</th>
                      <th className="text-center px-4 py-3 text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3 text-right">৳{product.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium">
                            Featured
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === 'categories' && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Manage featured categories display</p>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Manage customer testimonials</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12 text-muted-foreground">
              <Settings className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p>Homepage layout and display settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
