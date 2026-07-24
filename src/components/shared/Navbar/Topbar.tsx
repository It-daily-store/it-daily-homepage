import { Button } from '@/components/ui/button';
import { Computer, Search, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import MobileCategoryMenu from './MobileCategoryMenu';
import ThemeButton from './ThemeButton';
import CartDrawer from '../CartDrawer';
import ComparePopover from '../ComparePopover';
import SearchProduct from './SearchProduct';
import UserDropdown from './UserDropdown';
import Image from 'next/image';
import MobileSearch from './MobileSearch';

const Topbar = () => {
  return (
    <div className="bg-pure-black/95 sticky top-0 z-50 lg:static lg:z-10">
      <div className="my-container grid w-full grid-cols-3 items-center justify-between py-3 md:flex">
        <MobileCategoryMenu />
        <Link href={'/'} className="flex justify-center">
          <Image
            src={'/logo/dailyit-logo-white.png'}
            width={320}
            height={170}
            className={'h-11 w-fit sm:h-12'}
            alt="logo"
          />
        </Link>
        <div className="hidden w-full max-w-lg rounded-md border-none bg-white text-gray-300 xl:flex">
          <SearchProduct />
          <Button className="rounded-none rounded-r-md">
            <Search size={20} />
          </Button>
        </div>
        <div className="hidden items-center lg:flex">
          <Button variant={'secondary'} className="hover:text-secondary mr-2">
            <Link href={'/pc-builder'} className="flex items-center gap-1">
              <Computer size={18} />
              PC Builder
            </Link>
          </Button>
          <ComparePopover />
          <CartDrawer />
          <UserDropdown />
          <ThemeButton />
        </div>
        <div className="flex items-center justify-end gap-2 lg:hidden">
          {/* <Button
            variant={'ghost'}
            className="rounded-none rounded-r-md text-gray-300"
          >
            <Search size={20} />
          </Button> */}
          <MobileSearch />
          <CartDrawer />
        </div>
      </div>

      {/* <div className="bg-white">
        <SearchProduct />
      </div> */}
    </div>
  );
};

export default Topbar;
