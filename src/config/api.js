// API Configuration - Dynamic based on current host
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser - use current host but port 3001
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:3001`;
  }
  // Fallback for server-side rendering
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/admin/login`,
  LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  CHECK_AUTH: `${API_BASE_URL}/api/admin/check-auth`,
  
  // Blog endpoints
  BLOG_POSTS: `${API_BASE_URL}/api/posts`,
  BLOG_POST: (slug) => `${API_BASE_URL}/api/posts/${slug}`,
  
  // Admin endpoints
  ADMIN_POSTS: `${API_BASE_URL}/api/admin/posts`,
  ADMIN_POST: (id) => `${API_BASE_URL}/api/admin/posts/${id}`,
  
  // User management endpoints
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_USER: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/admin/change-password`,
};

export const apiRequest = async (url, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
