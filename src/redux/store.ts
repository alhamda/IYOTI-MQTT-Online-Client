import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import mqttSlice from '@/redux/slices/mqttSlice';

export const store = configureStore({
  reducer: {
    mqtt: mqttSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
