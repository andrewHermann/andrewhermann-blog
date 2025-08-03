/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


// API Configuration for different environments
const ADMIN_SERVER_IP = process.env.REACT_APP_ADMIN_SERVER_IP || 'localhost';

const config = {
  development: {
    API_BASE_URL: 'http://localhost:5001',
  },
  production: {
    API_BASE_URL: 'https://andrew.cloudhopper.ch',
  },
  local: {
    API_BASE_URL: `http://${ADMIN_SERVER_IP}:5001`,
  }
}

// Determine current environment
const environment = process.env.NODE_ENV || 'development'

// Enhanced hostname detection logic
const isLocalDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname === ADMIN_SERVER_IP)

const isProduction = typeof window !== 'undefined' && 
  !isLocalDevelopment

// Determine config based on access method
let currentConfig
if (isLocalDevelopment) {
  // Use local API when accessing via localhost or LAN IP
  if (typeof window !== 'undefined' && window.location.hostname === ADMIN_SERVER_IP) {
    currentConfig = config.local
  } else {
    currentConfig = config.development
  }
} else {
  currentConfig = config.production
}

// Override: Always use local API for admin endpoints when accessed via any hostname
// This ensures admin functionality always connects to local backend
const isAdminEndpoint = (endpoint) => {
  return endpoint && (
    endpoint.startsWith('/api/admin/') || 
    endpoint.includes('/admin/')
  )
}

// API request helper function
export const apiRequest = async (endpoint, options = {}) => {
  // Force local API for admin endpoints regardless of hostname
  let apiBaseUrl = currentConfig.API_BASE_URL
  
  if (isAdminEndpoint(endpoint)) {
    // Always use local API for admin functionality
    if (typeof window !== 'undefined' && window.location.hostname === ADMIN_SERVER_IP) {
      apiBaseUrl = config.local.API_BASE_URL
    } else {
      apiBaseUrl = config.development.API_BASE_URL
    }
  }
  
  const url = `${apiBaseUrl}${endpoint}`
  
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
    credentials: "include",
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
