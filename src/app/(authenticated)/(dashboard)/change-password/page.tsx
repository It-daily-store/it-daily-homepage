import ChangePasswordForm from '@/components/dashboard/ChangePasswordForm';
import GlobalHeader from '@/components/global/GlobalHeader';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Change Password',
};

const ChangePasswordPage = () => {
  return (
    <div>
      <GlobalHeader
        title="Password"
        subTitle="Change the password you use to sign in"
      />
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
