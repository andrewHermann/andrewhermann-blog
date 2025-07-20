import React from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await apiRequest(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      });
      localStorage.removeItem('adminToken');
      onLogout();
    } catch (err) {
      console.error('Logout failed:', err);
      // Even if logout request fails, clear local storage and redirect
      localStorage.removeItem('adminToken');
      onLogout();
    }
  };

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">
          <div className="section-card">
            <div className="page-header">
              <h1 className="page-title">Admin Dashboard</h1>
              <div className="header-actions">
                <button className="btn btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <p className="page-subtitle">
              Welcome to the administration panel. Manage your blog posts and system settings from here.
            </p>
          </div>

          <div className="admin-nav-links">
            <Link to="/admin/posts" className="admin-nav-link">
              <div className="section-card dashboard-card">
                <h3>Manage Posts</h3>
                <p>Create, edit, and delete blog posts</p>
                <span className="admin-nav-arrow">→</span>
              </div>
            </Link>
            <Link to="/admin/users" className="admin-nav-link">
              <div className="section-card dashboard-card">
                <h3>User Management</h3>
                <p>Change admin password and user settings</p>
                <span className="admin-nav-arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
