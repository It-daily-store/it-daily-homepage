'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={'plain'}
      tooltip="Switch Theme"
      className="text-gray-300"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};

export default ThemeButton;
