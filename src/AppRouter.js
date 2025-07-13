import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './views/home'
import Portfolio from './views/portfolio'
import About from './views/about'
import Blog from './views/blog'
import BlogPost from './views/blog-post'
import Markets from './views/markets'
import NotFound1 from './views/not-found'

import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import PostManager from './admin/PostManager'
import PostEditor from './admin/PostEditor'
import UserManager from './admin/UserManager'
import UserList from "./admin/UserList";
import UserEditor from "./admin/UserEditor";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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

      const response = await fetch('http://localhost:5000/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('adminToken')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('adminToken')
    }
    setLoading(false)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
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
        <Route path="/not-found" element={<NotFound1 />} />

        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={<AdminLogin onLogin={handleLogin} />}
        />
        
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin/login" />}
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
          element={isAuthenticated ? <UserManager /> : <Navigate to="/admin/login" />}
        />
        <Route 
          path="/admin/users/edit/:id" 
          element={isAuthenticated ? <UserEditor /> : <Navigate to="/admin/login" />}
        />

        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
