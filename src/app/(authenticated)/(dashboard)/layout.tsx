import Sidebar from '@/components/dashboard/Sidebar';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-background-foreground py-3">
      <div className="my-container flex w-full justify-center gap-3">
        <Sidebar />
        <div className="bg-background min-h-[calc(100vh-115px)] w-full rounded-md border p-3 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
