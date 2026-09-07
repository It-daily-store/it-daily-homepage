'use client';
import GlobalHeader from '@/components/global/GlobalHeader';
import { TNotification } from '@/types/notification';
import React, { useEffect, useState } from 'react';
import NotificationCard from './notificationCard';
import { fetchNotifications } from '@/actions/notification';
import { Skeleton } from '@/components/ui/skeleton';
import { BellOff } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const notiData = await fetchNotifications();
    setNotifications(notiData?.data?.notifications || []);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <GlobalHeader title="Notifications" />
      <div className="space-y-2">
        {loading &&
          Array.from({ length: 8 }).map((_, i: number) => (
            <div
              className="bg-background-foreground flex items-start gap-3 rounded-xl border p-3"
              key={i}
            >
              <Skeleton className="bg-background size-8.5 shrink-0 rounded-[10px]" />
              <div className="w-full space-y-2">
                <Skeleton className="bg-background h-3 w-3/4" />
                <Skeleton className="bg-background h-2.5 w-20" />
              </div>
            </div>
          ))}

        {!loading && notifications.length === 0 && (
          <div className="flex flex-col items-center gap-1.5 px-4 py-14 text-center">
            <BellOff className="text-foreground/25" size={26} />
            <p className="text-sm font-medium">No notifications yet</p>
            <p className="text-foreground/50 text-xs">
              Updates about your orders will show up here.
            </p>
          </div>
        )}

        {!loading &&
          notifications.map((noti) => (
            <NotificationCard key={noti._id} noti={noti} />
          ))}
      </div>
    </div>
  );
};

export default Notifications;
