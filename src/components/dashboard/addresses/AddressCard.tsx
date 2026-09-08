'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IAddress } from '@/types/address';
import { motion } from 'framer-motion';
import {
  Building2,
  Check,
  Home,
  Loader,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react';

const labelMeta = {
  home: { icon: Home, text: 'Home' },
  office: { icon: Building2, text: 'Office' },
  other: { icon: MapPin, text: 'Other' },
};

type TProps = {
  address: IAddress;
  index: number;
  onEdit: (address: IAddress) => void;
  onDelete: (address: IAddress) => void;
  onSetDefault: (address: IAddress) => void;
  isSettingDefault: boolean;
};

const AddressCard = ({
  address,
  index,
  onEdit,
  onDelete,
  onSetDefault,
  isSettingDefault,
}: TProps) => {
  const meta = labelMeta[address.label || 'other'] || labelMeta.other;
  const Icon = meta.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group bg-background relative flex flex-col rounded-2xl border p-4 transition-colors',
        address.isDefault ? 'border-primary/60' : 'hover:border-primary/30',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-primary-light text-primary flex size-9 items-center justify-center rounded-lg">
            <Icon size={17} />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-semibold">{meta.text}</h3>
            <p className="text-gray text-xs">
              {address.city}, {address.district}
            </p>
          </div>
        </div>

        {address.isDefault && (
          <span className="bg-secondary/15 text-secondary-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold">
            <Check size={11} />
            Default
          </span>
        )}
      </div>

      <p className="text-dark-gray mt-3 grow text-sm leading-relaxed break-words">
        {address.address}
      </p>

      <div className="mt-4 flex items-center gap-2 border-t pt-3">
        {!address.isDefault && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={isSettingDefault}
            onClick={() => onSetDefault(address)}
          >
            {isSettingDefault ? (
              <Loader size={13} className="animate-spin" />
            ) : (
              <Star size={13} />
            )}
            Set default
          </Button>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="text-dark-gray hover:text-primary gap-1.5"
            onClick={() => onEdit(address)}
          >
            <Pencil size={13} />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete address"
            className="text-dark-gray hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(address)}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default AddressCard;
