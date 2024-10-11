import { configureStore } from '@reduxjs/toolkit';
import todayBirthdaySlice from '../features/TodayBirthdayList/store/todayBirthdaySlice';

export const store = configureStore({
  reducer: {
    todayBirthday: todayBirthdaySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
