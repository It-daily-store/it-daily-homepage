import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loginModalReducer = createSlice({
  name: 'loginModal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setLoginModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setLoginModal } = loginModalReducer.actions;

export default loginModalReducer.reducer;
