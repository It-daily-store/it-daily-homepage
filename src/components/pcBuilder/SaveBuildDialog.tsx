'use client';

import { saveBuild } from '@/actions/savedBuild';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { globalError } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoginModal } from '@/redux/reducers/loginModalReducer';
import { IPcBuild } from '@/types/pcbuilder';
import { Loader, Save } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const SaveBuildDialog = ({
  build,
  disabled,
}: {
  build: IPcBuild[];
  disabled?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const selected = build.filter((part) => part.product?._id);

  const handleTrigger = () => {
    if (!isAuthenticated) {
      dispatch(setLoginModal(true));
      return;
    }

    setName('');
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error('Give your build a name');
      return;
    }

    try {
      setIsSaving(true);
      const res = await saveBuild({
        name: trimmed,
        parts: selected.map((part) => ({
          partId: part.id,
          name: part.name,
          category: part.category,
          isRequired: part.isRequired,
          product: part.product!._id as string,
        })),
      });

      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message);
        setOpen(false);
      }
    } catch (err) {
      globalError(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleTrigger}
        disabled={disabled}
        variant="outline"
        className="w-full gap-2"
      >
        <Save size={17} />
        Save PC
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Save this build</DialogTitle>
            <DialogDescription className="text-dark-gray text-sm">
              {selected.length}{' '}
              {selected.length === 1 ? 'component' : 'components'} will be saved
              to your account. Prices stay up to date.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-build-name">Build name</Label>
              <Input
                id="new-build-name"
                value={name}
                maxLength={60}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                placeholder="Gaming rig 2026"
                className="text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSaving}>
                {isSaving && <Loader size={15} className="animate-spin" />}
                Save build
              </Button>
            </div>

            <Link
              href="/pc-builds"
              className="text-gray hover:text-primary block text-center text-xs"
            >
              View my saved builds
            </Link>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveBuildDialog;
