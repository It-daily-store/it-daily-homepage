'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoginModal } from '@/redux/reducers/loginModalReducer';
import { useSearchParams } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { verifyMe } from '@/actions/auth';
import { removeUser, setUser } from '@/redux/reducers/authReducer';

export const AuthForm = ({ verify }: { verify?: () => void }) => {
  const searchParams = useSearchParams();
  const auth = searchParams.get('auth');

  return auth !== 'register' ? (
    <LoginForm verify={verify} />
  ) : (
    <RegisterForm verify={verify} />
  );
};

export default function LoginModal() {
  const { isOpen } = useAppSelector((s) => s.LoginModal);
  const dispatch = useAppDispatch();

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

  return (
    <Dialog open={false} onOpenChange={() => dispatch(setLoginModal(false))}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        {/* Header */}
        <DialogHeader className="p-4">
          <DialogTitle className="text-center">Login</DialogTitle>
          <p className="text-dark-gray text-center text-sm">
            Welcome back! Please sign in to your account.
          </p>
        </DialogHeader>

        <AuthForm verify={verify} />
      </DialogContent>
    </Dialog>
  );
}
