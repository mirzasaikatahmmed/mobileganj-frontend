"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const testimonials = [
    {
      id: 1,
      customerName: "Rahim Ahmed",
      rating: 5,
      comment: "Excellent service! Got my iPhone 15 Pro Max with great price.",
      product: "iPhone 15 Pro Max",
      date: "2024-01-15",
      status: "published",
      featured: true,
    },
    {
      id: 2,
      customerName: "Fatima Khan",
      rating: 4,
      comment: "Good quality products and fast delivery.",
      product: "Samsung Galaxy S24",
      date: "2024-01-10",
      status: "published",
      featured: false,
    },
    {
      id: 3,
      customerName: "Karim Hossain",
      rating: 5,
      comment: "Best mobile shop in Dhaka! Highly recommended.",
      product: "iPhone 14 Pro",
      date: "2024-01-05",
      status: "pending",
      featured: false,
    },
  ];

  const stats = [
    { label: "Total Reviews", value: "156", color: "from-blue-500 to-blue-600" },
    { label: "Published", value: "142", color: "from-green-500 to-green-600" },
    { label: "Pending", value: "14", color: "from-orange-500 to-orange-600" },
    { label: "Avg Rating", value: "4.8", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage customer reviews and testimonials</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-4 sm:p-6`}>
            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-card rounded-lg border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{testimonial.customerName}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {testimonial.featured && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Featured</span>
                )}
                <span className={`px-2 py-1 text-xs rounded ${testimonial.status === "published" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                  {testimonial.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{testimonial.comment}</p>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm">
                <div className="font-medium">{testimonial.product}</div>
                <div className="text-muted-foreground">{testimonial.date}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  {testimonial.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
