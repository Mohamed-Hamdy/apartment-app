import { API_ENDPOINTS, fetchApi } from '../lib/apis/config';
import { Apartment, ApartmentResponse } from '../types/apartment';

export const apartmentService = {
  async getApartments(): Promise<ApartmentResponse> {
    return await fetchApi(API_ENDPOINTS.APARTMENTS);
  },

  async getApartmentById(id: number): Promise<ApartmentResponse> {
    return await fetchApi(`${API_ENDPOINTS.APARTMENTS}/${id}`);
  },

  async searchApartments(query: string): Promise<ApartmentResponse> {
    return await fetchApi(`${API_ENDPOINTS.APARTMENTS}?search=${encodeURIComponent(query)}`);
  },

  async filterApartments(filters: {
    project?: string;
    minPrice?: number;
    maxPrice?: number;
    unitNumber?: string;
  }): Promise<ApartmentResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    return await fetchApi(`${API_ENDPOINTS.APARTMENTS}?${params.toString()}`);
  },

  async createApartment(apartment: Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApartmentResponse> {
    return await fetchApi(API_ENDPOINTS.ADD_APARTMENT, {
      method: 'POST',
      body: JSON.stringify(apartment),
    });
  }
};