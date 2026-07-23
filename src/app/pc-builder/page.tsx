import PcBuilder from '@/components/pcBuilder/PcBuilder';
import { PcBuildSettings } from '@/types/pcbuilder';
import React from 'react';

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
    <div className="bg-card min-h-screen py-4">
      <PcBuilder settings={pcBuilder} />
    </div>
  );
};

export default PcBuilderPage;
