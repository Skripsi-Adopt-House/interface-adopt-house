/**
 * API Service - Centralized API calls and utilities
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  AuthRequest,
  RegisterRequest,
  AuthResponse,
  PetsResponse,
  PetResponse,
  FavoritesResponse,
  Pet,
  CreatePetRequest,
  UpdatePetRequest,
  UpdateHealthRequest,
  PaginationParams,
  ApiResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include token in requests
    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear auth
          this.clearToken();
        }
        return Promise.reject(error);
      }
    );
  }

  // ============================================================================
  // AUTHENTICATION ENDPOINTS
  // ============================================================================

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', data);
    if (response.data.data?.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', data);
    if (response.data.data?.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse>('/auth/logout');
      this.clearToken();
      return response.data;
    } catch (error) {
      this.clearToken();
      throw error;
    }
  }

  // ============================================================================
  // POSTINGS ENDPOINTS
  // ============================================================================

  async getPets(params?: PaginationParams): Promise<PetsResponse> {
    const response = await this.api.get<PetsResponse>('/postings', { params });
    return response.data;
  }

  async getPetById(id: string): Promise<PetResponse> {
    const response = await this.api.get<PetResponse>(`/postings/${id}`);
    return response.data;
  }

  async createPet(data: CreatePetRequest): Promise<PetResponse> {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.age) formData.append('age', data.age.toString());
    if (data.gender) formData.append('gender', data.gender);
    if (data.breed) formData.append('breed', data.breed);
    if (data.adoption_fee) formData.append('adoption_fee', data.adoption_fee.toString());
    if (data.story) formData.append('story', data.story);
    if (data.vaksin) formData.append('vaksin', 'true');
    if (data.sertifikat) formData.append('sertifikat', 'true');

    // Add pictures
    data.pictures.forEach((picture, index) => {
      formData.append('pictures', picture);
    });

    const response = await this.api.post<PetResponse>('/postings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updatePet(id: string, data: UpdatePetRequest): Promise<PetResponse> {
    const response = await this.api.put<PetResponse>(`/postings/${id}`, data);
    return response.data;
  }

  async deletePet(id: string): Promise<ApiResponse> {
    const response = await this.api.delete<ApiResponse>(`/postings/${id}`);
    return response.data;
  }

  // ============================================================================
  // HEALTH INFO ENDPOINTS
  // ============================================================================

  async getHealthInfo(postingId: string): Promise<ApiResponse> {
    const response = await this.api.get<ApiResponse>(`/health/${postingId}`);
    return response.data;
  }

  async updateHealthInfo(postingId: string, data: UpdateHealthRequest): Promise<ApiResponse> {
    const response = await this.api.put<ApiResponse>(`/health/${postingId}`, data);
    return response.data;
  }

  // ============================================================================
  // FAVORITES ENDPOINTS
  // ============================================================================

  async getFavorites(params?: PaginationParams): Promise<FavoritesResponse> {
    const response = await this.api.get<FavoritesResponse>('/favorites', { params });
    return response.data;
  }

  async checkIsFavorited(postingId: string): Promise<FavoritesResponse> {
    const response = await this.api.get<FavoritesResponse>(`/favorites/${postingId}`);
    return response.data;
  }

  async addToFavorites(postingId: string): Promise<FavoritesResponse> {
    const response = await this.api.post<FavoritesResponse>('/favorites', {
      posting_id: postingId,
    });
    return response.data;
  }

  async removeFromFavorites(postingId: string): Promise<ApiResponse> {
    const response = await this.api.delete<ApiResponse>(`/favorites/${postingId}`);
    return response.data;
  }

  // ============================================================================
  // TOKEN MANAGEMENT
  // ============================================================================

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private _clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  getStoredToken(): string | null {
    return this.getToken();
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Public method to clear token
  clearToken(): void {
    this._clearToken();
  }
}

export const apiService = new ApiService();
