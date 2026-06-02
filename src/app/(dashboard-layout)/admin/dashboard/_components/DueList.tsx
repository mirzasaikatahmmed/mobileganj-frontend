'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useDueList } from '@/hooks/use-dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function DueList() {
  const { data: dueList, isLoading } = useDueList(5);

  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Due Payments
        </h3>
        <Link href="/admin/customers?filter=due">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      ) : dueList && dueList.length > 0 ? (
        <div className="space-y-3">
          {dueList.map((due, index) => (
            <motion.div
              key={due.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{due.customer?.name || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">
                  Invoice: {due.invoiceNo} | {format(new Date(due.createdAt), 'dd MMM yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">৳{due.dueAmount.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No due payments found
        </div>
      )}
    </div>
  );
}
