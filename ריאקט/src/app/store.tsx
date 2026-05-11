import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // וודא שהנתיב נכון

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// הגדרת הטיפוסים לשימוש בכל האפליקציה
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;