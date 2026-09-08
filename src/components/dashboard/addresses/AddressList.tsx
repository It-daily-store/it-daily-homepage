'use client';

import { deleteAddress, setDefaultAddress } from '@/actions/address';
import ConfirmDialog from '@/components/global/ConfirmDialog';
import GlobalHeader from '@/components/global/GlobalHeader';
import { Button } from '@/components/ui/button';
import { globalError } from '@/lib/utils';
import { IAddress } from '@/types/address';
import { MapPinHouse, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import AddressCard from './AddressCard';
import AddressFormDialog from './AddressFormDialog';

const AddressList = ({ addresses }: { addresses: IAddress[] }) => {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<IAddress | null>(null);
  const [deleting, setDeleting] = useState<IAddress | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [defaultingId, setDefaultingId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (address: IAddress) => {
    setEditing(address);
    setFormOpen(true);
  };

  const handleSetDefault = async (address: IAddress) => {
    try {
      setDefaultingId(address._id);
      const res = await setDefaultAddress(address._id);

      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message);
        router.refresh();
      }
    } catch (err) {
      globalError(err);
    } finally {
      setDefaultingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;

    try {
      setIsDeleting(true);
      const res = await deleteAddress(deleting._id);

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
        title="Saved Addresses"
        subTitle={
          addresses.length
            ? `${addresses.length} saved ${addresses.length === 1 ? 'address' : 'addresses'}`
            : 'Save addresses to check out faster'
        }
        buttons={
          addresses.length > 0 ? (
            <Button onClick={openCreate} className="gap-1.5">
              <Plus size={15} />
              Add address
            </Button>
          ) : undefined
        }
      />

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <span className="bg-primary-light text-primary mb-4 flex size-14 items-center justify-center rounded-2xl">
            <MapPinHouse size={26} />
          </span>
          <h3 className="text-base font-semibold">No saved addresses yet</h3>
          <p className="text-dark-gray mt-1 max-w-sm text-sm">
            Add a delivery address once and it will be ready to pick at
            checkout, every time.
          </p>
          <Button onClick={openCreate} className="mt-5 gap-1.5">
            <Plus size={15} />
            Add your first address
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 py-2 sm:grid-cols-2">
          {addresses.map((address, index) => (
            <AddressCard
              key={address._id}
              address={address}
              index={index}
              onEdit={openEdit}
              onDelete={setDeleting}
              onSetDefault={handleSetDefault}
              isSettingDefault={defaultingId === address._id}
            />
          ))}
        </div>
      )}

      <AddressFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        address={editing}
        onSaved={() => router.refresh()}
      />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete this address?"
        description={
          deleting?.isDefault
            ? 'This is your default address. Another saved address will become the default instead.'
            : 'You can always add it again later.'
        }
      >
        {deleting && (
          <p className="bg-background-foreground text-dark-gray rounded-lg p-2.5 text-sm">
            {deleting.address}, {deleting.city}, {deleting.district}
          </p>
        )}
      </ConfirmDialog>
    </div>
  );
};

export default AddressList;
