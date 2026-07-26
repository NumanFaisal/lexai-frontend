'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store, useAppDispatch } from '@/store';
import { setUser, setInitialized } from '@/store/slices/authSlice';
import { getCurrentUser } from '@/lib/auth';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111113',
            color: '#E8E0D0',
            border: '1px solid #1E1E21',
            borderRadius: '10px',
            fontSize: '13px',
            fontFamily: 'var(--font-sans)',
          },
          success: {
            iconTheme: {
              primary: '#7B9E87',
              secondary: '#111113',
            },
          },
          error: {
            iconTheme: {
              primary: '#BE7B7B',
              secondary: '#111113',
            },
          },
        }}
      />
    </Provider>
  );
}
