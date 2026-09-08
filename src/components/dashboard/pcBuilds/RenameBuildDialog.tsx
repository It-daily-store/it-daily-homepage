'use client';

import { renameBuild } from '@/actions/savedBuild';
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
import { ISavedBuild } from '@/types/pcbuilder';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type TProps = {
  build: ISavedBuild | null;
  onOpenChange: (open: boolean) => void;
  onRenamed: () => void;
};

const RenameBuildDialog = ({ build, onOpenChange, onRenamed }: TProps) => {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setName(build?.name || '');
  }, [build]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!build) return;

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error('Build name is required');
      return;
    }

    try {
      setIsSaving(true);
      const res = await renameBuild(build._id, trimmed);

      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message);
        onOpenChange(false);
        onRenamed();
      }
    } catch (err) {
      globalError(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={build !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename build</DialogTitle>
          <DialogDescription className="text-dark-gray text-sm">
            Give this build a name you will recognise later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="build-name">Build name</Label>
            <Input
              id="build-name"
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
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving && <Loader size={15} className="animate-spin" />}
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameBuildDialog;
