import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser as apiGetCurrentUser,
} from '../../api/authApi.js';

export const checkAuthSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiGetCurrentUser();
      return data.user;
    } catch (err) {
      // 401 on initial session check is normal for unauthenticated guests
      return rejectWithValue(null);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await apiLogin(credentials);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed. Please check your credentials.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await apiRegister(userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout();
      return true;
    } catch (err) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false, // Tracks whether initial /api/auth/me check has run
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuthSession
      .addCase(checkAuthSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(checkAuthSession.rejected, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthInitialized = (state) => state.auth.isInitialized;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

