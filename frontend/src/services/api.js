export const API_URL = 'http://localhost:8000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
    throw new Error('Unauthenticated');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Error');
  }

  return response.json();
};

export const login = (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const register = (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const logout = () => apiFetch('/auth/logout', { method: 'POST' });
export const getMyProfile = () => apiFetch('/my-profile');
export const updateProfile = (data) => apiFetch('/profile/update', { method: 'PUT', body: JSON.stringify(data) });
export const getAdminDashboard = () => apiFetch('/admin/dashboard');
