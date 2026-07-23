'use server';

import { RegisterFormValues } from '@/components/common/RegisterForm';
import { instance } from '@/lib/axios';
import { TLoginCredentials, TUser } from '@/types/auth';
import axios from 'axios';
import { cookies } from 'next/headers';

export const loginAction = async (data: TLoginCredentials) => {
  try {
    const cookieStore = await cookies();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}/customer/login`,
      data,
    );
    cookieStore.set('gadget_grid_access_token', res?.data?.data?.accessToken);
    cookieStore.set('gadget_grid_refresh_token', res?.data?.data?.refreshToken);
    return res?.data;
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data || 'Login failed',
    };
  }
};

export const verifyMe = async () => {
  try {
    const res = await instance.get('/auth/getMyData?select=-role');
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      data: err?.response?.data,
    };
  }
};
export const updateProfile = async (data: Partial<TUser>) => {
  try {
    const res = await instance.post('/auth/updateProfile', data);
    return res.data;
  } catch (err: any) {
    console.log(err?.response?.data);
    return {
      error: true,
      data: err?.response?.data,
    };
  }
};

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('gadget_grid_access_token');
  cookieStore.delete('gadget_grid_refresh_token');
};

export const getRefreshToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('gadget_grid_refresh_token');
    // Wait for the token refresh response
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_AUTH}/auth/refresh-token`,
      {},
      {
        headers: {
          Cookie: `gadget_grid_refresh_token=${refreshToken?.value}`,
        },
        withCredentials: true,
      },
    );
    const newAccessToken = response.data.data.accessToken as string;
    return newAccessToken;
  } catch (err: any) {
    console.log(err.response?.data);
    return {
      error: true,
      data: err.response,
    }; // Optional: reject if token refresh fails
  }
};

export const verifyOtpAction = async (email: string, otp: string) => {
  try {
    const cookieStore = await cookies();
    const res = await instance.post('/auth/verify-otp', {
      email,
      otp,
    });
    console.log(res.data);
    if (res?.data?.data) {
      cookieStore.set('gadget_grid_access_token', res?.data?.data?.accessToken);
      return {
        message: res.data.message,
        data: res.data.data,
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const sendVerificationAction = async (email: string) => {
  try {
    const res = await instance.post(`/auth/send-verification`, { email });

    if (res) {
      return {
        success: true,
        message: res.data.message,
      };
    }
  } catch (err: any) {
    return {
      error: true,
      data: err.response.data,
    };
  }
};

export const sendResetPasswordRequest = async (email: string) => {
  try {
    const res = await instance.post(`/auth/forgot-password`, { email });
    if (res) {
      return {
        message: res.data?.message,
        data: res?.data,
      };
    }
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const registerAction = async (payload: RegisterFormValues) => {
  try {
    const res = await instance.post(`/auth/customer-register`, payload);

    return {
      success: true,
      message: res.data.message,
      verficationSent: res.data?.data?.verficationSent,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err.response?.data,
    };
  }
};

export const resetPasswordAction = async (payload: {
  email: string;
  password: string;
  otp: string;
}) => {
  try {
    const res = await instance.post(`/auth/reset-password`, payload);

    if (res) {
      return {
        message: res?.data?.message,
        data: res.data,
      };
    }
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      data: err.response?.data,
    };
  }
};
