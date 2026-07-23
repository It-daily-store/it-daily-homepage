'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export const AuthForm = ({ verify }: { verify?: () => void }) => {
  const searchParams = useSearchParams();
  const auth = searchParams.get('auth');

  return auth !== 'register' ? (
    <LoginForm verify={verify} />
  ) : (
    <RegisterForm verify={verify} />
  );
};
