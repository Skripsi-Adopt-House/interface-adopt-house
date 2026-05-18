/**
 * Adopt House - TypeScript Type Definitions
 * Interfaces for all data models and API responses
 */

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  is_admin: boolean;
  token?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: User;
}

// ============================================================================
// PET/POSTING TYPES
// ============================================================================

export interface Picture {
  id: string;
  posting_id: string;
  url: string;
  created_at: string;
}

export interface HealthInfo {
  id: string;
  posting_id: string;
  vaksin: boolean;
  sertifikat: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: string;
  admin_id: string;
  name: string;
  age?: number;
  gender?: string;
  breed?: string;
  adoption_fee?: number;
  story?: string;
  created_at: string;
  updated_at: string;
  admin: {
    id: string;
    name: string;
    username: string;
  };
  pictures: Picture[];
  health: HealthInfo;
}

export interface CreatePetRequest {
  name: string;
  age?: number;
  gender?: string;
  breed?: string;
  adoption_fee?: number;
  story?: string;
  vaksin?: boolean;
  sertifikat?: boolean;
  pictures: File[];
}

export interface UpdatePetRequest {
  name?: string;
  age?: number;
  gender?: string;
  breed?: string;
  adoption_fee?: number;
  story?: string;
}

export interface UpdateHealthRequest {
  vaksin: boolean;
  sertifikat: boolean;
}

export interface PetsResponse {
  status: 'success' | 'error';
  message: string;
  data: Pet[];
}

export interface PetResponse {
  status: 'success' | 'error';
  message: string;
  data: Pet;
}

// ============================================================================
// FAVORITES TYPES
// ============================================================================

export interface Favorite {
  id: string;
  user_id: string;
  posting_id: string;
  created_at: string;
  posting?: Pet;
}

export interface FavoritesResponse {
  status: 'success' | 'error';
  message: string;
  data: Favorite[] | Favorite;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface PetCardProps {
  pet: Pet;
  onDelete?: (id: string) => void;
  onEdit?: (pet: Pet) => void;
  isAdmin?: boolean;
}

export interface NavbarProps {
  user: User | null;
  onLogout?: () => void;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  token: string | null;
}
