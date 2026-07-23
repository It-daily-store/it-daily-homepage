'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { globalError } from '@/lib/utils';
import { useAppDispatch } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import {
  sendVerificationAction,
  verifyMe,
  verifyOtpAction,
} from '@/actions/auth';
import { useTheme } from 'next-themes';
import { removeUser, setUser } from '@/redux/reducers/authReducer';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
});

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSending, setSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<'otp' | 'verify'>('verify');
  const [otp, setOtp] = useState('');
  const email = searchParams ? searchParams.get('email') : '';

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setTab(tab as 'otp' | 'verify');
    } else {
      setTab('verify');
    }
  }, [searchParams]);

  const verifyForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const verify = async () => {
    try {
      const res = await verifyMe();
      if (res.error) {
        dispatch(removeUser());
      } else {
        dispatch(setUser({ user: res.data, isAuthenticated: true }));
      }
    } catch (err) {
      dispatch(removeUser());
      console.log(err);
    }
  };

  async function verifyOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && otp && otp.length === 6) {
      setIsVerifying(true);
      try {
        const res = await verifyOtpAction(email, otp);
        if (res?.error) {
          setIsVerifying(false);
          globalError(res?.data);
        } else {
          setIsVerifying(false);
          toast.success(res?.message);
          verify();
          router.push('/');
        }
      } catch (err) {
        setIsVerifying(false);
        console.log(err);
      }
    } else {
      setIsVerifying(false);
      toast.error('Please enter complete verification code.');
    }
  }

  async function verifySubmit(values: z.infer<typeof formSchema>) {
    const { email } = values;
    setSending(true);

    try {
      const res = await sendVerificationAction(email);
      if (res && res?.error) {
        globalError(res.data);
        setSending(false);
      } else {
        toast.success(res?.message);
        router.push(`/verify-email?email=${email}&tab=otp`);
        setSending(false);
      }
    } catch (err) {
      setSending(false);
      console.log(err);
    }
  }

  return (
    <div className="my-6 flex justify-center md:my-10">
      <div className="bg-background flex min-h-[40vh] w-[90vw] flex-col justify-center rounded-lg border p-8 px-5 shadow-lg min-[540px]:px-10 md:w-[70vw] lg:w-1/2 2xl:w-1/3 dark:border">
        {tab === 'otp' && email ? (
          <div>
            <div className="space-y-4 pb-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Verify Your Email
                </h2>
                <p className="leading-relaxed text-gray-600">
                  We&apos;ve sent a 6-digit verification code to
                  <br />
                  <span className="font-semibold text-gray-900">{email}</span>
                </p>
              </div>
            </div>
            <form onSubmit={verifyOtp} className="space-y-6">
              <div className="space-y-4">
                <label
                  htmlFor="otp"
                  className="block text-center text-sm font-medium text-gray-700"
                >
                  Enter verification code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    id="otp"
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={isVerifying}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-gray-400" />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-12 w-12 text-lg font-semibold"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                className="w-full sm:h-11"
                type="submit"
                disabled={otp.length !== 6 || isVerifying}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </Button>
            </form>

            <div className="mt-2 space-y-4 text-center">
              <div className="text-gray flex justify-center gap-1 text-sm">
                Didn&apos;t receive the code?{' '}
                <button
                  disabled={isSending}
                  onClick={() => verifySubmit({ email })}
                  className="flex cursor-pointer items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline disabled:opacity-65"
                >
                  {isSending && <Loader className="size-4 animate-spin" />}
                  Resend code
                </button>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/verify-email?email=${email}`)}
                className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Change email address
              </button>
            </div>
          </div>
        ) : (
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(verifySubmit)}
              className="flex flex-col gap-5"
            >
              <Image
                className="mx-auto h-14 w-fit"
                src={
                  theme === 'dark'
                    ? '/logo/dailyit-logo-white.png'
                    : '/logo/dailyit-logo-black.png'
                }
                height={200}
                width={400}
                alt="Daily It logo"
              />
              <h2 className="text-primary text-center text-2xl font-bold">
                Verify Your Email!
              </h2>
              <FormField
                control={verifyForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label>Email *</label>
                    <FormControl>
                      <Input
                        className="bg-background-foreground h-11"
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={isSending}
                disabled={isSending}
                className="mt-3 sm:h-11"
              >
                Send Verification Code
              </Button>
            </form>
          </Form>
        )}

        <button type="button" className="mt-3 text-base">
          Go back to{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-primary cursor-pointer text-base hover:underline"
          >
            login
          </span>
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
