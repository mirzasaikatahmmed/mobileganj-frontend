"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Eye, Tag, Calendar, Percent } from "lucide-react";

export default function DealsOffersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const deals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max - 20% Off",
      discountType: "percentage",
      discountValue: 20,
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      usageCount: 45,
      products: 1,
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 - ৳10,000 Off",
      discountType: "fixed",
      discountValue: 10000,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "active",
      usageCount: 23,
      products: 1,
    },
  ];

  const stats = [
    { label: "Active Deals", value: "2", icon: Tag, color: "from-green-500 to-green-600" },
    { label: "Total Revenue", value: "৳2.5M", icon: Percent, color: "from-blue-500 to-blue-600" },
    { label: "Total Usage", value: "135", icon: Eye, color: "from-purple-500 to-purple-600" },
    { label: "Expired Deals", value: "1", icon: Calendar, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Deals & Offers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage promotional deals</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} text-white rounded-lg p-4 sm:p-6`}>
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-5 h-5 opacity-90" />
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
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
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="bg-card rounded-lg border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Deal Title</th>
              <th className="text-left p-4 font-medium">Discount</th>
              <th className="text-left p-4 font-medium">Duration</th>
              <th className="text-left p-4 font-medium">Usage</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-muted/50">
                <td className="p-4 font-medium">{deal.title}</td>
                <td className="p-4">
                  {deal.discountType === "percentage" ? `${deal.discountValue}%` : `৳${deal.discountValue}`}
                </td>
                <td className="p-4 text-sm">
                  <div>{deal.startDate}</div>
                  <div className="text-muted-foreground">to {deal.endDate}</div>
                </td>
                <td className="p-4">{deal.usageCount}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${deal.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {deal.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
