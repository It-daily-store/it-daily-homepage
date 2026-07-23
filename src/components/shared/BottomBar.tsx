import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRightLeft, Computer, House, User } from 'lucide-react';
import ComparePopover from './ComparePopover';
import CartDrawer from './CartDrawer';
import UserDropdown from './Navbar/UserDropdown';
import ThemeButton from './Navbar/ThemeButton';

const BottomBar = () => {
  return (
    <>
      <div className="bg-pure-black fixed bottom-0 z-50 h-14 w-full lg:hidden">
        <div className="my-container flex h-full items-center justify-between">
          <Button variant={'ghost'}>
            <Link
              href={'/'}
              className="flex flex-col items-center justify-center gap-2 text-xs text-gray-300"
            >
              <House size={18} />
              Home
            </Link>
          </Button>
          <Button variant={'ghost'}>
            <Link
              href={'/pc-builder'}
              className="flex flex-col items-center justify-center gap-2 text-xs text-gray-300"
            >
              <Computer size={18} />
              PC Builder
            </Link>
          </Button>
          <Button variant={'ghost'}>
            <Link
              href={'/compare'}
              className="flex flex-col items-center justify-center gap-2 text-xs text-gray-300"
            >
              <ArrowRightLeft size={20} />
              Compare
            </Link>
          </Button>
          <Button variant={'ghost'}>
            <Link
              href={'/profile'}
              className="flex flex-col items-center justify-center gap-2 text-xs text-gray-300"
            >
              <User size={20} />
              Profile
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-14 md:hidden"></div>
    </>
  );
};

export default BottomBar;
