'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import SearchProduct from './SearchProduct';

const MobileSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Button
        variant={'ghost'}
        className="rounded-none rounded-r-md text-gray-300"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <Search size={20} />
      </Button>

      {/* Conditionally render search below */}
      {isSearchOpen && (
        <div className="bg-pure-black absolute top-full right-0 left-0 z-40 px-1 pb-1">
          <div className="bg-white">
            <SearchProduct />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSearch;
