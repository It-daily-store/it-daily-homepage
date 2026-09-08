'use client';

import { updatePasswordAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, globalError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, Loader, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from your current password',
    path: ['newPassword'],
  });

type TPasswordForm = z.infer<typeof passwordSchema>;

// The first two mirror what the API enforces; the rest are advisory only.
const rules = [
  { label: 'At least 6 characters', test: (v: string) => v.length >= 6 },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v: string) => /\d/.test(v) },
  {
    label: 'One symbol',
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

const strengthMeta = [
  { label: 'Too weak', bar: 'bg-destructive', text: 'text-destructive' },
  { label: 'Weak', bar: 'bg-destructive', text: 'text-destructive' },
  { label: 'Fair', bar: 'bg-amber-500', text: 'text-amber-600' },
  { label: 'Good', bar: 'bg-secondary', text: 'text-secondary' },
  { label: 'Strong', bar: 'bg-secondary', text: 'text-secondary' },
];

const PasswordField = ({
  field,
  label,
  placeholder,
}: {
  field: any;
  label: string;
  placeholder: string;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            {...field}
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            autoComplete="off"
            className="pr-9 text-sm"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="text-gray hover:text-dark-gray absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

const ChangePasswordForm = () => {
  const form = useForm<TPasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = form.watch('newPassword') || '';
  const passed = rules.filter((rule) => rule.test(newPassword)).length;
  const strength = strengthMeta[newPassword ? passed : 0];
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: TPasswordForm) => {
    try {
      const res = await updatePasswordAction({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (res?.error) {
        globalError(res.data);
        return;
      }

      toast.success(res?.message || 'Password updated successfully');
      form.reset();
    } catch (err) {
      globalError(err);
    }
  };

  return (
    <div className="max-w-md py-2">
      <div className="bg-background rounded-2xl border p-4">
        <div className="mb-4 flex items-center gap-2.5 border-b pb-3">
          <span className="bg-primary-light text-primary flex size-9 items-center justify-center rounded-lg">
            <ShieldCheck size={18} />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-semibold">Update your password</h2>
            <p className="text-gray text-xs">
              You will stay signed in on this device.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <PasswordField
                  field={field}
                  label="Current password"
                  placeholder="Enter your current password"
                />
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <PasswordField
                  field={field}
                  label="New password"
                  placeholder="Enter a new password"
                />
              )}
            />

            {newPassword.length > 0 && (
              <div className="bg-background-foreground space-y-2.5 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-dark-gray text-xs font-medium">
                    Password strength
                  </span>
                  <span className={cn('text-xs font-semibold', strength.text)}>
                    {strength.label}
                  </span>
                </div>

                <div className="flex gap-1" aria-hidden>
                  {rules.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-300',
                        i < passed ? strength.bar : 'bg-border',
                      )}
                    />
                  ))}
                </div>

                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 pt-0.5">
                  {rules.map((rule) => {
                    const ok = rule.test(newPassword);
                    return (
                      <li
                        key={rule.label}
                        className={cn(
                          'flex items-center gap-1 text-[11px]',
                          ok ? 'text-secondary' : 'text-gray',
                        )}
                      >
                        {ok ? <Check size={11} /> : <X size={11} />}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordField
                  field={field}
                  label="Confirm new password"
                  placeholder="Re-enter your new password"
                />
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader size={15} className="animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
