export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  APARTMENTS: `${API_BASE_URL}/apartments/`,
  GET_APARTMENT: (id: number) => `${API_BASE_URL}/apartments/get/${id}`,
  ADD_APARTMENT: `${API_BASE_URL}/apartments/add/`,
};

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

export const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};