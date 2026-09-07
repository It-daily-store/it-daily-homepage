'use client';
import React from 'react';
import dayjs from '@/lib/dayjs';
import {
  getOrderStatusConfig,
  getOrderTimelinePhrase,
} from '@/lib/orderStatus';
import { cn } from '@/lib/utils';
import { IStatusHistory } from '@/types/ordre.interface';

const OrderStatusTimeline = ({ history }: { history: IStatusHistory[] }) => {
  if (!history?.length) {
    return (
      <p className="text-foreground/50 py-4 text-center text-[13px]">
        No status updates yet.
      </p>
    );
  }

  return (
    <div className="relative">
      <div className="bg-border absolute top-3.5 bottom-3.5 left-[13px] w-0.5 rounded" />

      {history.map((entry, index) => {
        const config = getOrderStatusConfig(entry.status);
        const { lead, outcome } = getOrderTimelinePhrase(entry.status);
        const Icon = config.icon;
        const isCurrent = index === history.length - 1;

        return (
          <div key={index} className="relative flex gap-3 pb-4 last:pb-0">
            <div
              className={cn(
                'ring-background relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full ring-[3px]',
                config.node,
                isCurrent && 'ring-primary/25 ring-[3px]',
              )}
            >
              <Icon size={14} />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[13px] leading-snug">
                <span className="text-foreground/60">Your order {lead}</span>{' '}
                <span className="text-foreground font-semibold">{outcome}</span>
              </p>
              <p className="text-foreground/50 mt-0.5 text-[11px]">
                {dayjs(entry.timestamp).format('MMM D, YYYY · h:mm A')}
              </p>

              {entry.notes && (
                <div className="border-primary bg-primary/5 mt-1.5 rounded-r-md border-l-2 px-2.5 py-1.5">
                  <p className="text-primary text-[10px] font-bold tracking-wide uppercase">
                    Note from the team
                  </p>
                  <p className="text-foreground/80 mt-0.5 text-xs leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTimeline;
