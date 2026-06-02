'use client';

import Link from 'next/link';
import { Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRecentSales } from '@/hooks/use-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecentSales() {
  const { data: recentSales, isLoading, error } = useRecentSales(5);

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Sales</h3>
        <Link href="/admin/sales">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 mx-auto text-orange-500 mb-2" />
          <p className="text-sm text-muted-foreground">
            Failed to load recent sales
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      ) : recentSales && recentSales.length > 0 ? (
        <div className="space-y-3">
          {recentSales.map((sale, index) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{sale.invoiceNo}</p>
                <p className="text-sm text-muted-foreground">{sale.customer?.name || 'N/A'}</p>
              </div>
              <div className="text-right mr-3">
                <p className="font-semibold">৳{sale.grandTotal.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  sale.status === 'completed' || sale.dueAmount === 0 ? 'bg-green-100 text-green-700' :
                  sale.dueAmount === sale.grandTotal ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {sale.dueAmount === 0 ? 'Paid' : sale.dueAmount === sale.grandTotal ? 'Due' : 'Partial'}
                </span>
              </div>
              <Link href={`/admin/sales/${sale.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No recent sales found
        </div>
      )}
    </div>
  );
}
