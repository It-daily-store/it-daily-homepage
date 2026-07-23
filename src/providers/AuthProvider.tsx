'use client';
import { verifyMe } from '@/actions/auth';
import { useAppDispatch } from '@/redux/hooks';
import { removeUser, setUser } from '@/redux/reducers/authReducer';
import React, { ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const token = Cookies.get('gadget_grid_access_token');

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
  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token]);

  return <>{children}</>;
};
