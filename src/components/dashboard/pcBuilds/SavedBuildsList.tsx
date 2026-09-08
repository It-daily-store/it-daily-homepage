'use client';

import { deleteBuild } from '@/actions/savedBuild';
import ConfirmDialog from '@/components/global/ConfirmDialog';
import GlobalHeader from '@/components/global/GlobalHeader';
import { Button } from '@/components/ui/button';
import { globalError } from '@/lib/utils';
import { ISavedBuild } from '@/types/pcbuilder';
import { Computer, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import RenameBuildDialog from './RenameBuildDialog';
import SavedBuildCard from './SavedBuildCard';

const SavedBuildsList = ({ builds }: { builds: ISavedBuild[] }) => {
  const router = useRouter();
  const [renaming, setRenaming] = useState<ISavedBuild | null>(null);
  const [deleting, setDeleting] = useState<ISavedBuild | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleting) return;

    try {
      setIsDeleting(true);
      const res = await deleteBuild(deleting._id);

      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message);
        setDeleting(null);
        router.refresh();
      }
    } catch (err) {
      globalError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <GlobalHeader
        title="My PC Builds"
        subTitle={
          builds.length
            ? `${builds.length} saved ${builds.length === 1 ? 'build' : 'builds'} — prices update automatically`
            : 'Save a build and come back to it any time'
        }
        buttons={
          builds.length > 0 ? (
            <Link href="/pc-builder">
              <Button className="gap-1.5">
                <Plus size={15} />
                New build
              </Button>
            </Link>
          ) : undefined
        }
      />

      {builds.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <span className="bg-primary-light text-primary mb-4 flex size-14 items-center justify-center rounded-2xl">
            <Computer size={26} />
          </span>
          <h3 className="text-base font-semibold">No saved builds yet</h3>
          <p className="text-dark-gray mt-1 max-w-sm text-sm">
            Pick your components in the PC Builder and hit Save PC — your build
            will show up here with up-to-date prices.
          </p>
          <Link href="/pc-builder" className="mt-5">
            <Button className="gap-1.5">
              <Plus size={15} />
              Start building
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 py-2 sm:grid-cols-2">
          {builds.map((build, index) => (
            <SavedBuildCard
              key={build._id}
              build={build}
              index={index}
              onRename={setRenaming}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

      <RenameBuildDialog
        build={renaming}
        onOpenChange={(open) => !open && setRenaming(null)}
        onRenamed={() => router.refresh()}
      />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title={`Delete "${deleting?.name}"?`}
        description="This saved build will be removed permanently. Your cart is not affected."
      />
    </div>
  );
};

export default SavedBuildsList;
