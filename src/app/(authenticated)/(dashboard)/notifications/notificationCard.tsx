'use client';
import { Card } from '@/components/ui/card';
import { TNotification } from '@/types/notification';
import dayjs from 'dayjs';
import {
  AlertCircle,
  Archive,
  CheckCircle,
  Info,
  Package,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';

const NotificationCard = ({ noti }: { noti: TNotification }) => {
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="text-primary" size={16} />;
      case 'alert':
        return <AlertCircle className="text-destructive" size={16} />;
      case 'address':
        return <Info className="text-accent" size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  const getLinkTo = () => {
    switch (noti.notificationType) {
      case `order`:
        router.push(`/orders/${noti?.source}`);
        break;

      default:
        return '';
    }
  };

  return (
    <Card
      onClick={getLinkTo}
      key={noti._id}
      className={`hover:bg-card bg-background-foreground cursor-pointer p-3 transition-all hover:shadow-md ${
        !noti.opened ? 'border-primary/30 border-l-2' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          {getIcon(noti.notificationType)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-foreground text-sm font-semibold">
                {noti?.text}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                {dayjs(noti?.createdAt).format('DD/MM/YYYY')}
              </p>
            </div>
            {/* {!noti.opened && (
              <div className="bg-primary mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
            )} */}
          </div>
        </div>
        {/* <div className="flex flex-shrink-0 items-center gap-1">
          {!noti.opened && (
            <button
              // onClick={() => markAsRead(notification.id)}
              className="hover:bg-muted rounded p-1 transition-colors"
              title="Mark as read"
            >
              <Archive size={14} className="text-muted-foreground" />
            </button>
          )}
          <button
            // onClick={() => deleteNotification(notification.id)}
            className="hover:bg-destructive/10 rounded p-1 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} className="text-destructive" />
          </button>
        </div> */}
      </div>
    </Card>
  );
};

export default NotificationCard;
