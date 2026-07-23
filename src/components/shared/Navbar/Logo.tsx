'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link href={'/'}>
      <Image
        src={theme !== 'dark' ? '/logo/logo-white.png' : '/logo/logo-dark.png'}
        width={320}
        height={170}
        className={'h-12 w-fit'}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
