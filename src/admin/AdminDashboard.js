import React from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, apiRequest } from '../config/api'
import './AdminDashboard.css'

const AdminDashboard = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await apiRequest(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      })
      if (response.ok) {
        onLogout(false)
      }
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="admin-nav-links">
        <Link to="/admin/posts" className="admin-nav-link">
          <div className="admin-nav-card">
            <h3>Manage Posts</h3>
            <p>Create, edit, and delete blog posts</p>
          </div>
        </Link>
        <Link to="/admin/users" className="admin-nav-link">
          <div className="admin-nav-card">
            <h3>User Management</h3>
            <p>Change admin password and user settings</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
