/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Apartment {
  id: number;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  status?: number;
}

export interface ApartmentResponse extends ApiResponse<Apartment[]> {}