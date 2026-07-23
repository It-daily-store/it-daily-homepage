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
import { registerAction } from '@/actions/auth';
import { globalError } from '@/lib/utils';
import { toast } from 'sonner';
import z from 'zod';
import { Mail, Lock, Eye, EyeOff, Zap, User, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/[1-9]\d{1,14}$/, 'Invalid phone number format'),
  name: z.object({
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last name is required'),
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = ({ verify }: { verify?: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
      name: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form submission handler
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await registerAction(data);
      if (res?.error) {
        globalError(res.data);
      } else {
        toast.success(res?.message || 'Registration successfull');
        router.push(`/verify-email?email=${data.email}&tab=otp`);
      }

      setIsSubmitting(false);
    } catch (err) {
      console.log({ error: `login error ${err}` });
      globalError(err);
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 px-4 pb-4"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 gap-x-2 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name.firstName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  First Name
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    className="bg-background-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your middle name (optional)"
                    className="bg-background-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Last Name
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    className="bg-background-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
                <span className="text-destructive">*</span>
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

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
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
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
                <span className="text-destructive">*</span>
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

        {/* Sign Up Button */}
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
          type="submit"
        >
          Sign Up
        </Button>

        {/* Sign In Link */}
        <div className="text-dark-gray text-center text-sm">
          Already have an account?{' '}
          <Link href={'?auth=login'}>
            <Button type="button" variant="link" className="px-0">
              Sign In
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
