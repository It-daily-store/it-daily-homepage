'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader, TriangleAlert } from 'lucide-react';
import { ReactNode } from 'react';

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  children?: ReactNode;
};

const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = 'Delete',
  isLoading,
  children,
}: TProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <span className="bg-destructive/10 text-destructive mb-1 flex size-10 items-center justify-center rounded-full">
            <TriangleAlert size={19} />
          </span>
          <DialogTitle className="text-left">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-dark-gray text-left text-sm">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader size={15} className="animate-spin" />}
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
