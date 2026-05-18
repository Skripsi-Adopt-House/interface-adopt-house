'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import type { AuthContextType, RegisterRequest, User } from '@/lib/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = apiService.getStoredToken();
      if (storedToken && !apiService.isTokenExpired()) {
        setToken(storedToken);
        
        // Fetch user data from token
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          if (payload.id) {
            // Set user from token payload (contains id, name, email, is_admin)
            setUser({
              id: payload.id,
              email: payload.email,
              username: payload.username,
              name: payload.name,
              is_admin: payload.is_admin,
              token: storedToken,
            });
          }
        } catch (error) {
          // Invalid token, clear it
          apiService.clearToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await apiService.login({ email, password });
        if (response.data) {
          setUser(response.data);
          setToken(response.data.token || null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true);
      try {
        const response = await apiService.register(data);
        if (response.data) {
          setUser(response.data);
          setToken(response.data.token || null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    apiService.logout().catch(() => {
      // Error during logout, but we still clear local state
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
