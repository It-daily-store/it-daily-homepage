import { TProduct } from '@/types/product.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

type InitialState = {
  compareItems: { name: string; id: string }[];
};

const initialState: InitialState = {
  compareItems: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState: initialState,
  reducers: {
    addToCompare: (
      state,
      action: PayloadAction<{ name: string; id: string }>,
    ) => {
      const product = action.payload;
      const exist = state.compareItems?.find((item) => item.id === product?.id);

      if (exist) {
        toast.warning('Product already exist in compare');
        return;
      }

      if (!exist && state.compareItems?.length < 4) {
        state.compareItems.push(product);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const exist = state.compareItems?.find((item) => item.id === id);
      if (exist) {
        state.compareItems = state.compareItems.filter(
          (item) => item.id !== id,
        );
      }
    },
    clearCompare: (state) => {
      state.compareItems = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;

export const compareReducer = compareSlice.reducer;
