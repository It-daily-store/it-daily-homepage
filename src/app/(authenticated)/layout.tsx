'use client';
import { verifyMe } from '@/actions/auth';
import { AuthForm } from '@/components/common/AuthForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeUser, setUser } from '@/redux/reducers/authReducer';
import coookie from 'js-cookie';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const verify = async () => {
    try {
      setLoading(true);
      const res = await verifyMe();
      if (res.error) {
        dispatch(removeUser());
        setLoading(false);
      } else {
        dispatch(setUser({ user: res.data, isAuthenticated: true }));
        setLoading(false);
      }
    } catch (err) {
      dispatch(removeUser());
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    verify();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-150px)] w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    // dispatch(setLoginModal(true))
    return (
      <div className="mx-auto mt-12 flex h-full w-full max-w-lg flex-col items-center px-3">
        <AuthForm verify={verify} />
      </div>
    );
  }

  return <>{children}</>;
}
