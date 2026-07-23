'use client';
import GlobalHeader from '@/components/global/GlobalHeader';
import { instance } from '@/lib/axios';
import { TNotification } from '@/types/notification';
import React, { useEffect, useState } from 'react';
import NotificationCard from './notificationCard';
import { fetchNotifications } from '@/actions/notification';
import { Skeleton } from '@/components/ui/skeleton';

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
        {loading
          ? Array.from({ length: 8 }).map((_, i: number) => (
              <Skeleton
                className="bg-background-foreground flex w-full gap-3 rounded-xl p-4"
                key={i}
              >
                <Skeleton className="bg-background size-5" />
                <div className="space-y-2">
                  <Skeleton className="bg-background h-5 w-xs" />
                  <Skeleton className="bg-background h-3 w-sm" />
                </div>

                <div className="ms-auto flex items-center gap-2">
                  <Skeleton className="bg-background size-6" />
                  <Skeleton className="bg-background size-6" />
                  <Skeleton className="bg-background size-6" />
                </div>
              </Skeleton>
            ))
          : notifications?.map((noti) => (
              <NotificationCard key={noti._id} noti={noti} />
            ))}
      </div>
    </div>
  );
};

export default Notifications;
