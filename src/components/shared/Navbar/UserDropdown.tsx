'use client';
import { verifyMe } from '@/actions/auth';
import { AuthForm } from '@/components/common/AuthForm';
import LogoutButton from '@/components/common/LogoutButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeUser, setUser } from '@/redux/reducers/authReducer';
import {
  Bell,
  Computer,
  Lock,
  LogOut,
  MapPinHouse,
  ShoppingCart,
  User,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const menus = [
  {
    id: 1,
    url: '/profile',
    label: 'Profile',
    icon: User,
  },
  {
    id: 2,
    url: '/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    id: 3,
    url: '/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    id: 4,
    url: '/saved-pc-build',
    label: 'Saved PC builds',
    icon: Computer,
  },
  {
    id: 5,
    url: '/addresses',
    label: 'Saved Address',
    icon: MapPinHouse,
  },
  {
    id: 6,
    url: '/password',
    label: 'Password',
    icon: Lock,
  },
];

const UserDropdown = () => {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const verify = async () => {
    try {
      const res = await verifyMe();
      if (res.error) {
        dispatch(removeUser());
      } else {
        dispatch(setUser({ user: res.data, isAuthenticated: true }));
      }
    } catch (err) {
      dispatch(removeUser());
      console.log(err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'plain'}
          // tooltip="My Profile"
          className="text-gray-300"
        >
          <User size={20} />
        </Button>
      </PopoverTrigger>
      {user ? (
        <PopoverContent
          side="bottom"
          align="end"
          className="w-md max-w-[280px] px-0 pt-0"
        >
          <div className="flex flex-col gap-3">
            <div className="bg-card flex w-full items-center gap-2 truncate p-3">
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>
                  {user.name?.firstName?.slice(0, 1)}
                  {user.name?.lastName?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <h3 className="font-semibold">{user.fullName}</h3>
                <p className="truncate text-xs">{user.email}</p>
              </div>
            </div>
            <div className="flex w-full flex-col px-2">
              {menus?.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.url}
                  className="text-dark-gray hover:bg-secondary/20 flex items-center gap-2 rounded-md px-1 py-1.5 text-base font-medium hover:text-black"
                >
                  <menu.icon size={18} /> {menu.label}
                </Link>
              ))}
              <LogoutButton className="mt-1 w-full" variant={'danger_light'}>
                <LogOut size={18} />
                Log out
              </LogoutButton>
            </div>
          </div>
        </PopoverContent>
      ) : (
        <PopoverContent
          side="bottom"
          align="end"
          className="w-md px-0 sm:max-w-md"
        >
          <AuthForm verify={verify} />
        </PopoverContent>
      )}
    </Popover>
  );
};

export default UserDropdown;
