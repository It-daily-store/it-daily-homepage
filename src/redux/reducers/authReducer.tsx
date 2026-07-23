import { TUser } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  user: TUser | null;
  isAuthenticated: boolean;
};

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; isAuthenticated: boolean }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = authReducer.actions;

export default authReducer.reducer;
