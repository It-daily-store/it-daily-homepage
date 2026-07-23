'use client';
import { verifyMe } from '@/actions/auth';
import { AuthForm } from '@/components/common/AuthForm';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeUser, setUser } from '@/redux/reducers/authReducer';
import React, { useState } from 'react';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const verify = async () => {
    try {
      setLoading(true);
      const res = await verifyMe();
      if (res.error) {
        dispatch(removeUser());
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

  return (
    <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center px-3">
      <AuthForm verify={verify} />
    </div>
  );
};

export default SignUpPage;
