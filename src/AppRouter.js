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

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { API_ENDPOINTS, apiRequest } from './config/api'
import Home from './views/home'
import Portfolio from './views/portfolio'
import About from './views/about'
import Blog from './views/blog'
import BlogPost from './views/blog-post'
import Markets from './views/markets'
import ContactPage from './views/contact'
import BehindTheSite from './views/behind-the-site'
import NotFound1 from './views/not-found'
import TermsOfUse from './views/terms-of-use'
import PrivacyPolicy from './views/privacy-policy'
import CookiesPolicy from './views/cookies-policy'
import CookieConsent from './components/cookie-consent'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import PostManager from './admin/PostManager'
import PostEditor from './admin/PostEditor'
import UserManager from './admin/UserManager'
import UserEditor from "./admin/UserEditor";
import AdminNavbar from './admin/AdminNavbar';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        setLoading(false)
        return
      }

      const data = await apiRequest(API_ENDPOINTS.CHECK_AUTH)
      setIsAuthenticated(true)
      setUserRole(data.role)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('adminToken')
      setIsAuthenticated(false)
      setUserRole(null)
    }
    setLoading(false)
  }

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('adminToken')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/behind-the-site" element={<BehindTheSite />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/not-found" element={<NotFound1 />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route
          path="/admin/login"
          element={<AdminLogin onLogin={handleLogin} />}
        />
        
        <Route
          path="/admin/dashboard"
          element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} userRole={userRole} /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/posts"
          element={isAuthenticated ? <PostManager /> : <Navigate to="/admin/login" />}
        />
        {/* Use single parameterized route for both new and edit */}
        <Route
          path="/admin/posts/edit/:id"
          element={isAuthenticated ? <PostEditor /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/users"
          element={isAuthenticated && userRole === 'admin' ? <UserManager /> : <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} />}
        />
        <Route
          path="/admin/users/edit/:id"
          element={isAuthenticated && userRole === 'admin' ? <UserEditor /> : <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} />}
        />

        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      
      {/* Admin Navbar - appears on all /admin/* routes */}
      <AdminNavbar userRole={userRole} />

      {/* Cookie Consent Banner - appears on all pages */}
      <CookieConsent />
    </Router>
  )
}

export default AppRouter
