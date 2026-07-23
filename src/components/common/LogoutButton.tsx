'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import { handleLogout } from '@/actions/auth';
import { store } from '@/redux/store';
import { removeUser } from '@/redux/reducers/authReducer';

const LogoutButton: React.FC<ButtonProps> = (props) => {
  const onClick = async () => {
    await handleLogout();
    store.dispatch(removeUser());
  };

  return <Button onClick={onClick} {...props} />;
};

export default LogoutButton;
