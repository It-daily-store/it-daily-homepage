'use client';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';
import {
  Bell,
  Computer,
  LockKeyhole,
  MapPinHouse,
  ShoppingCart,
  User,
} from 'lucide-react';
import { Button } from '../ui/button';
import LogoutButton from '../common/LogoutButton';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  {
    label: 'My Profile',
    url: '/profile',
    icon: User,
    id: 1,
  },
  {
    label: 'Notifications',
    url: '/notifications',
    icon: Bell,
    id: 2,
  },
  {
    label: 'Orders',
    url: '/orders',
    icon: ShoppingCart,
    id: 3,
  },
  {
    label: 'My PC Builds',
    url: '/pc-builds',
    icon: Computer,
    id: 4,
  },
  {
    label: 'Saved Addresses',
    url: '/addresses',
    icon: MapPinHouse,
    id: 5,
  },
  {
    label: 'Password',
    url: '/Password',
    icon: LockKeyhole,
    id: 6,
  },
];

const Sidebar = () => {
  const { user } = useAppSelector((s) => s.auth);
  const pathName = usePathname();

  const isActive = (url: string) => {
    return pathName.includes(url);
  };

  return (
    <div className="bg-background sticky top-11 flex h-[calc(100vh-130px)] w-full max-w-xs flex-col justify-between rounded-md border">
      <div>
        <div className="bg-primary-light flex items-center gap-2 p-3">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt={user?.fullName} />
            <AvatarFallback className="uppercase">
              {user?.fullName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-black">{user?.fullName}</h2>
            <p className="text-dark-gray text-sm">{user?.email}</p>
          </div>
        </div>
        <div className="my-2 space-y-2 px-2">
          {links.map((link) => (
            <Link key={link.id} className="block" href={link.url}>
              <Button
                icon={<link.icon size={18} />}
                className={cn('w-full justify-start gap-4 rounded-lg', {
                  'text-dark-gray': !isActive(link.url),
                })}
                variant={isActive(link.url) ? 'primary_light' : 'ghost'}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-3">
        <LogoutButton variant={'danger_light'} className="w-full rounded-lg">
          Logout
        </LogoutButton>
      </div>
    </div>
  );
};

export default Sidebar;
