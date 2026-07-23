import axios from 'axios';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { getRefreshToken, handleLogout } from '@/actions/auth';
import { store } from '@/redux/store';
import { removeUser } from '@/redux/reducers/authReducer';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_AUTH,
  timeout: 120000,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

const isClient = true;

instance.interceptors.request.use(async (config) => {
  if (isClient) {
    if (!config.headers['Authorization']) {
      const cookieStore = await cookies();
      const token = cookieStore.get('gadget_grid_access_token');
      if (token?.value) {
        const data = jwtDecode(token?.value);
        const isExpired = dayjs().isAfter(dayjs.unix(data?.exp as number));
        if (isExpired) {
          try {
            const res: any = await getRefreshToken();
            if (res?.error) {
              console.log('Error refreshing token:', res?.data);
              toast.error('Your session has expired. Please log in again.');
              handleLogout();
              store.dispatch(removeUser());
              return Promise.reject(res?.data);
            } else {
              cookieStore.set('gadget_grid_access_token', res);
              config.headers['Authorization'] = `${res}`;
            }
          } catch (err) {
            console.log('Error refreshing token:', err);
            toast.error('Your session has expired. Please log in again.');
            handleLogout();
            store.dispatch(removeUser());
            return Promise.reject(err);
          }
        } else {
          config.headers['Authorization'] = `${token.value}`;
        }
      }
    }
  }
  return config;
});
