'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { loginAction, sendResetPasswordRequest } from '@/actions/auth';
import { globalError } from '@/lib/utils';
import { toast } from 'sonner';
import z, { email } from 'zod';
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const resetFormSchema = z.object({
  email: z.email('Invalid email'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ verify }: { verify?: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [resetTab, setResetTab] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetForm = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();
  // Form submission handler
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await loginAction(data);
      if (res.error) {
        console.log(res.data);
        globalError(res.data);
      } else {
        if (!res.data?.isVerified) {
          router.push(`/verify-email?email=${data.email}`);
          toast.warning(res?.message);
        } else {
          verify?.();
          toast.success(res?.message);
        }
      }
    } catch (err) {
      console.log({ error: `login error ${err}` });
      globalError(err);
    }
  };

  const resetFormSubmit = async (values: z.infer<typeof resetFormSchema>) => {
    const lastResetTime = localStorage.getItem('last_reset_time');

    try {
      setSendingReset(true);
      const res = await sendResetPasswordRequest(values.email);
      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message);
        router.push(`/reset-password?email=${values.email}`);
      }

      setSendingReset(false);
    } catch (err) {
      setSendingReset(false);
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {!resetTab ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 px-4 pb-4"
          >
            {/* Email Field */}
            <h2 className="text-primary text-center text-2xl font-bold">
              Welcome Back!
            </h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-background-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="bg-background-foreground pr-10"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray h-4 w-4" />
                      ) : (
                        <Eye className="text-gray h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password Link */}
            <div>
              <Button
                onClick={() => setResetTab(true)}
                type="button"
                variant="link"
                className="text-secondary px-0 text-sm sm:px-0"
              >
                Forgot password?
              </Button>

              {/* Sign In Button */}
              <Button typeof="button" className="w-full" type="submit">
                Sign In
              </Button>

              {/* Sign Up Link */}
              <div className="text-dark-gray text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href={'?auth=register'}>
                  <Button type="button" variant="link" className="px-0">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <div>
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(resetFormSubmit)}
              className="w-full space-y-3 px-4 pb-4"
            >
              <h2 className="text-primary text-center text-2xl font-bold">
                Forgot Password?
              </h2>
              <FormField
                control={resetForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={sendingReset}
                className="mt-3 w-full"
                type="submit"
              >
                Send OTP
              </Button>
              <div className="text-center text-base">
                Go back to{' '}
                <button
                  type="button"
                  onClick={() => setResetTab(false)}
                  className="text-primary cursor-pointer text-base"
                >
                  login
                </button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
