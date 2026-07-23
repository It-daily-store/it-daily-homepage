'use client';
import { resetPasswordAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { globalError } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    otp: z.string().min(6, 'Please enter otp'),
    password: z
      .string({ error: 'Please enter your password' })
      .min(6, 'Password has to be at least 6 charecters'),
    confirmPassword: z.string({
      error: 'Please enter your password',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword'],
  });

const ResetPassword = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();
  const params = useSearchParams();
  const email = params.get('email');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, otp } = values;

    try {
      setIsLoading(true);
      const res = await resetPasswordAction({
        password,
        email: email as string,
        otp,
      });

      if (res?.error) {
        globalError(res?.data);
      } else {
        toast.success(res?.message);
        router.push('/');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="bg-background mx-auto my-6 flex min-h-[60vh] w-[90vw] flex-col justify-center rounded-lg border p-8 px-5 shadow-lg min-[540px]:px-10 md:my-10 md:w-[70vw] lg:w-1/2 2xl:w-1/3">
      <Image
        className="mx-auto h-14 w-fit"
        src={
          theme === 'dark'
            ? '/logo/dailyit-logo-white.png'
            : '/logo/dailyit-logo-black.png'
        }
        height={200}
        width={400}
        alt="gadget grid logo"
      />
      <h2 className="text-primary pt-2 pb-4 text-center text-2xl font-bold">
        Reset Password!
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <FormItem>
                <label>Otp Code *</label>
                <div className="relative">
                  <InputOTP id="otp" maxLength={6} {...field}>
                    <InputOTPGroup className="bg-background-foreground w-full">
                      <InputOTPSlot
                        index={0}
                        className="h-9 w-full text-base font-semibold"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-9 w-full text-base font-semibold"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-9 w-full text-base font-semibold"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-gray-400" />
                    <InputOTPGroup className="bg-background-foreground w-full">
                      <InputOTPSlot
                        index={3}
                        className="h-9 w-full text-base font-semibold"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-9 w-full text-base font-semibold"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-9 w-full text-base font-semibold"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {fieldState.error && (
                  <p className="text-red text-sm">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <label>Password *</label>
                <div className="relative">
                  <Input
                    className="bg-background-foreground"
                    {...field}
                    type={passwordHidden ? 'password' : 'text'}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                  >
                    {passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldState.error && (
                  <p className="text-red text-sm">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <label>Confirm Password *</label>
                <div className="relative">
                  <Input
                    className="bg-background-foreground"
                    {...field}
                    type={passwordHidden ? 'password' : 'text'}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setPasswordHidden(!passwordHidden)}
                  >
                    {passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldState.error && (
                  <p className="text-red text-sm">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />

          <Button isLoading={isLoading} disabled={isLoading} className="mt-3">
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
