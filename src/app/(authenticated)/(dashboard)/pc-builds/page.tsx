import { getMyBuilds } from '@/actions/savedBuild';
import SavedBuildsList from '@/components/dashboard/pcBuilds/SavedBuildsList';
import { ISavedBuild } from '@/types/pcbuilder';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My PC Builds',
};

const PcBuildsPage = async () => {
  const res = await getMyBuilds();
  const builds: ISavedBuild[] = res?.error ? [] : res?.data || [];

  return <SavedBuildsList builds={builds} />;
};

export default PcBuildsPage;
