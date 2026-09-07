'use client';
import { Card } from '@/components/ui/card';
import {
  buildNotificationMessage,
  flattenMessage,
  TMessageSegment,
} from '@/components/notifications/buildNotificationMessage';
import {
  actionToneClasses,
  fallbackIcon,
  notificationConfig,
} from '@/components/notifications/notificationConfig';
import dayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { TNotification } from '@/types/notification';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';

const toneClasses: Record<TMessageSegment['tone'], string> = {
  label: 'text-foreground/60 font-normal',
  entity: 'text-foreground font-medium',
  highlight: 'text-foreground font-semibold',
};

const NotificationCard = ({ noti }: { noti: TNotification }) => {
  const router = useRouter();

  const config = notificationConfig[noti.notificationType];
  const Icon = config?.icon || fallbackIcon;
  const segments = buildNotificationMessage(noti);
  const fullText = flattenMessage(segments);
  const route = config?.route?.(noti);

  return (
    <Card
      onClick={() => route && router.push(route)}
      title={fullText}
      className={cn(
        'flex items-start gap-3 p-3 transition-all',
        route && 'cursor-pointer hover:shadow-md',
        !noti.opened
          ? 'border-primary/40 bg-primary/[0.04] border-l-2'
          : 'bg-background-foreground',
      )}
    >
      <div
        className={cn(
          'flex size-8.5 shrink-0 items-center justify-center rounded-[10px]',
          actionToneClasses[noti.actionType] || 'bg-muted text-foreground/70',
        )}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] leading-snug">
          {segments.map((segment, i) => (
            <React.Fragment key={i}>
              {i > 0 && ' '}
              <span className={toneClasses[segment.tone]}>{segment.text}</span>
            </React.Fragment>
          ))}
        </p>
        <p className="text-foreground/50 mt-1 text-[11px]">
          {dayjs(noti?.createdAt).fromNow()}
        </p>
      </div>

      {!noti.opened && (
        <span className="bg-primary mt-[13px] size-1.5 shrink-0 rounded-full" />
      )}
    </Card>
  );
};

export default NotificationCard;
