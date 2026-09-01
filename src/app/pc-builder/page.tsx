import PcBuilder from '@/components/pcBuilder/PcBuilder';
import { PcBuildSettings } from '@/types/pcbuilder';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'PC Builder | Daily It',
  description:
    'Build your own PC with Daily It. Pick a compatible CPU, motherboard, GPU, storage and peripherals, then add the whole build to your cart in one click.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/pc-builder`,
  },
};

const getInitialSettings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings/pc-builder`,
    );
    const data = await res.json();

    return data?.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const PcBuilderPage = async () => {
  const pcBuilder: PcBuildSettings = await getInitialSettings();

  return (
    <div className="bg-background-foreground min-h-screen">
      <div className="my-container py-5 sm:py-7">
        <div className="mb-5 max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="from-primary to-secondary h-4 w-1 rounded-full bg-gradient-to-b" />
            <span className="text-primary text-xs font-semibold tracking-[0.14em] uppercase">
              PC Builder
            </span>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            Build Your PC, Part by Part
          </h1>
          <p className="text-dark-gray mt-1.5 text-sm">
            Choose each component below. Your build is saved on this device, so
            you can come back to it any time.
          </p>
        </div>

        <PcBuilder settings={pcBuilder} />
      </div>
    </div>
  );
};

export default PcBuilderPage;
