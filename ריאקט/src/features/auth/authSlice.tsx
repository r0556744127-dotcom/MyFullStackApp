import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentService } from '../../services/studentService';

export const loginStudent = createAsyncThunk(
  'auth/login',
  async ({ identityNumber, password }: any, { rejectWithValue }) => {
    if (identityNumber.length !=9) {
      return rejectWithValue("תעודת זהות חייבת להיות עם 9 ספרות.");
    }
    else if(!identityNumber.trim()||!password.trim())
    {
            return rejectWithValue("לא הכנסת תעודת זהות או סיסמה");

    }

    try {
      const data = await studentService.login(identityNumber, password);
      studentService.saveSession(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.status === 401 ? "מספר זהות או סיסמה שגויים" : "אירעה שגיאה בחיבור"
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      sessionStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;