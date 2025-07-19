import React from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, apiRequest } from '../config/api'
import './AdminDashboard.css'

const AdminDashboard = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await apiRequest(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      })
      localStorage.removeItem('adminToken')
      onLogout()
    } catch (err) {
      console.error('Logout failed:', err)
      // Even if logout request fails, clear local storage and redirect
      localStorage.removeItem('adminToken')
      onLogout()
    }
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-frame">
          <div className="admin-dashboard-header">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            <p className="admin-dashboard-subtitle">
              Welcome to the administration panel. Manage your blog posts and system settings from here.
            </p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          
          <div className="admin-nav-links">
            <Link to="/admin/posts" className="admin-nav-link">
              <div className="admin-nav-card">
                <h3>Manage Posts</h3>
                <p>Create, edit, and delete blog posts</p>
                <span className="admin-nav-arrow">→</span>
              </div>
            </Link>
            <Link to="/admin/users" className="admin-nav-link">
              <div className="admin-nav-card">
                <h3>User Management</h3>
                <p>Change admin password and user settings</p>
                <span className="admin-nav-arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
