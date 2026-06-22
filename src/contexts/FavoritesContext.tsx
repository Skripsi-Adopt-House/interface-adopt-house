'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface FavoritesContextType {
  favoritedPetIds: Set<string>;
  isFavorited: (petId: string) => boolean;
  toggleFavorite: (petId: string, isFavorited: boolean) => void;
  addFavoritePetId: (petId: string) => void;
  removeFavoritePetId: (petId: string) => void;
  loadFavorites: () => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favoritedPetIds, setFavoritedPetIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from API when user logs in
  const loadFavorites = async () => {
    if (!user || user.is_admin) return;

    try {
      setIsLoading(true);
      const response = await apiService.getFavorites();
      
      if (response.data && Array.isArray(response.data)) {
        // Extract posting_id from each favorite
        const ids = new Set(
          response.data
            .map((fav: any) => {
              // The API returns {posting_id, posting, ...}
              return fav.posting_id || fav.posting?.id || fav.id;
            })
            .filter((id: string) => id)
        );
        setFavoritedPetIds(ids);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoritedPetIds(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  // Load favorites when user changes
  useEffect(() => {
    if (user && !user.is_admin) {
      loadFavorites();
    } else {
      setFavoritedPetIds(new Set());
    }
  }, [user?.id]); // Only depend on user.id to avoid infinite loops

  const isFavorited = (petId: string): boolean => {
    return favoritedPetIds.has(petId);
  };

  const addFavoritePetId = (petId: string) => {
    setFavoritedPetIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(petId);
      return newSet;
    });
  };

  const removeFavoritePetId = (petId: string) => {
    setFavoritedPetIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(petId);
      return newSet;
    });
  };

  const toggleFavorite = (petId: string, isFavorited: boolean) => {
    if (isFavorited) {
      addFavoritePetId(petId);
    } else {
      removeFavoritePetId(petId);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritedPetIds,
        isFavorited,
        toggleFavorite,
        addFavoritePetId,
        removeFavoritePetId,
        loadFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
