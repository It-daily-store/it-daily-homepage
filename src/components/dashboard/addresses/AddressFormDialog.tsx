'use client';

import { createAddress, updateAddress } from '@/actions/address';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn, globalError } from '@/lib/utils';
import { IAddress, TAddressLabel } from '@/types/address';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Home, Loader, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const addressSchema = z.object({
  label: z.enum(['home', 'office', 'other']),
  address: z
    .string()
    .trim()
    .min(1, 'Street address is required')
    .max(200, 'Address is too long'),
  city: z.string().trim().min(1, 'City is required'),
  district: z.string().trim().min(1, 'District is required'),
  isDefault: z.boolean(),
});

type TAddressForm = z.infer<typeof addressSchema>;

const labelOptions: {
  value: TAddressLabel;
  label: string;
  icon: typeof Home;
}[] = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'office', label: 'Office', icon: Building2 },
  { value: 'other', label: 'Other', icon: MapPin },
];

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: IAddress | null;
  onSaved: () => void;
};

const AddressFormDialog = ({
  open,
  onOpenChange,
  address,
  onSaved,
}: TProps) => {
  const isEdit = Boolean(address);

  const form = useForm<TAddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'home',
      address: '',
      city: '',
      district: '',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (!open) return;

    form.reset({
      label: address?.label || 'home',
      address: address?.address || '',
      city: address?.city || '',
      district: address?.district || '',
      isDefault: address?.isDefault || false,
    });
  }, [open, address]);

  const onSubmit = async (values: TAddressForm) => {
    try {
      const res = isEdit
        ? await updateAddress(address!._id, values)
        : await createAddress(values);

      if (res?.error) {
        globalError(res.data);
        return;
      }

      toast.success(res?.message);
      onOpenChange(false);
      onSaved();
    } catch (err) {
      globalError(err);
    }
  };

  const selectedLabel = form.watch('label');
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit address' : 'Add a new address'}
          </DialogTitle>
          <DialogDescription className="text-dark-gray text-sm">
            {isEdit
              ? 'Update where you want your orders delivered.'
              : 'Save an address to check out faster next time.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-1"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      {labelOptions.map((option) => {
                        const active = selectedLabel === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              'flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors',
                              active
                                ? 'border-primary bg-primary-light text-primary-white'
                                : 'text-dark-gray hover:border-primary/40',
                            )}
                          >
                            <option.icon size={14} />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street address</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={2}
                      placeholder="House 12, Road 5, Block B"
                      className="resize-none text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Dhaka"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Dhaka"
                        className="text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="bg-background-foreground flex flex-row items-center gap-2.5 rounded-lg p-2.5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={address?.isDefault}
                    />
                  </FormControl>
                  <div className="leading-tight">
                    <FormLabel className="cursor-pointer text-sm font-medium">
                      Set as default address
                    </FormLabel>
                    <p className="text-gray text-xs">
                      {address?.isDefault
                        ? 'This is already your default address.'
                        : 'Preselected when you check out.'}
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting && <Loader size={15} className="animate-spin" />}
                {isEdit ? 'Save changes' : 'Add address'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressFormDialog;
