import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, Persona, Plan } from '@/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setInitialized(state) {
      state.isLoading = false;
      state.isInitialized = true;
    },
    updatePersona(state, action: PayloadAction<Persona>) {
      if (state.user) {
        state.user.persona = action.payload;
        state.user.hasCompletedOnboarding = true;
      }
    },
    updatePlan(state, action: PayloadAction<Plan>) {
      if (state.user) {
        state.user.plan = action.payload;
        // Update limits based on plan
        switch (action.payload) {
          case 'student':
            state.user.queriesLimit = 200;
            break;
          case 'advocate_pro':
          case 'business':
            state.user.queriesLimit = 999999;
            break;
          default:
            state.user.queriesLimit = 30;
        }
      }
    },
    incrementQueriesUsed(state) {
      if (state.user) {
        state.user.queriesUsed += 1;
      }
    },
    updateProfile(state, action: PayloadAction<Partial<Pick<User, 'username' | 'email'>>>) {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setInitialized,
  updatePersona,
  updatePlan,
  incrementQueriesUsed,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;
