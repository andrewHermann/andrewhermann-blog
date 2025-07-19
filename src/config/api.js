// API Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:3001',
  },
  production: {
    API_BASE_URL: 'https://andrew.cloudhopper.ch',
  }
}

// Determine current environment
const environment = process.env.NODE_ENV || 'development'

// Use hostname to determine if we're in production when NODE_ENV isn't set
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')

const currentConfig = isProduction ? config.production : config[environment] || config.development

// API request helper function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${currentConfig.API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  // Add authorization header if token exists
  const token = localStorage.getItem('adminToken')
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`
  }
  
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, finalOptions)
    
    // Handle JSON responses
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }
      return data
    }
    
    // Handle non-JSON responses
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export default currentConfig

// API Endpoints - Updated to match backend routes
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/admin/login',
  LOGOUT: '/api/admin/logout',
  CHECK_AUTH: '/api/admin/check-auth',
  CHANGE_PASSWORD: '/api/admin/change-password',
  
  // Admin endpoints
  ADMIN_DASHBOARD: '/api/admin/dashboard',
  
  // Posts endpoints (public)
  POSTS: '/api/posts',
  POSTS_BY_SLUG: '/api/posts', // append /:slug
  
  // Posts endpoints (admin)
  ADMIN_POSTS: '/api/admin/posts',
  ADMIN_POSTS_BY_ID: '/api/admin/posts', // append /:id
  
  // Users endpoints (admin)
  ADMIN_USERS: '/api/admin/users',
  ADMIN_USERS_BY_ID: '/api/admin/users', // append /:id
}
