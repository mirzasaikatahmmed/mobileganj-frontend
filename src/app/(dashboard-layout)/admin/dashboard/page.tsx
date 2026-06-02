"use client";

import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CreditCard,
  RotateCcw,
  Wallet,
  PiggyBank,
  Truck,
  Wrench,
  Calendar,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import StatCard from "./_components/StatCard";
import RecentSales from "./_components/RecentSales";
import DueList from "./_components/DueList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBranches } from "@/hooks/use-branches";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<'today' | 'last_7_days' | 'this_month'>('today');
  
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const activeBranches = branches?.filter((b) => b.isActive) ?? [];
  
  const { data: stats, isLoading: statsLoading } = useDashboardStats({
    branchId: selectedBranch === "all" ? undefined : selectedBranch,
    dateFilter,
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your business overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40 sm:w-[180px]">
              <GitBranch className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branchesLoading ? (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              ) : activeBranches.length > 0 ? (
                activeBranches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id.toString()}>
                    {branch.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No branches found
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
            <SelectTrigger className="w-40 sm:w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <StatCard
              title="Total Sales"
              value={stats?.totalSales || 0}
              icon={DollarSign}
              colorClass="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Total Due Sale"
              value={stats?.totalDueSale || 0}
              icon={AlertCircle}
              colorClass="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <StatCard
              title="Due Paid"
              value={stats?.duePaid || 0}
              icon={TrendingUp}
              colorClass="bg-gradient-to-br from-teal-500 to-teal-600 text-white"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Total Expense"
              value={stats?.totalExpense || 0}
              icon={Wallet}
              colorClass="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <StatCard
              title="Total Profit"
              value={stats?.totalProfit || 0}
              icon={PiggyBank}
              colorClass="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard
              title="Service Profit"
              value={stats?.mobileServiceProfit || 0}
              icon={Wrench}
              colorClass="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Quick Actions & Lists */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <RecentSales />
        <DueList />
      </motion.div>
    </div>
  );
}
