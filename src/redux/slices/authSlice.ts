import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  me: null,
};

const initialState: initialStateType = {
  me: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setMe: (state, action) => {
      state.me = action.payload;
    }
  },
});

export const { reset, setMe } = authSlice.actions;

export const selectMe = (state: RootState) => state.auth.me;

export default authSlice.reducer;