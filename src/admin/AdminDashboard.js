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


import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout, userRole }) => {
  const handleLogout = async () => {
    try {
      await apiRequest(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      });
    } catch (_err) {
      // Ignore logout errors — session will expire naturally
    } finally {
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
            {userRole === 'admin' && (
              <Link to="/admin/users" className="admin-nav-link">
                <div className="section-card dashboard-card">
                  <h3>User Management</h3>
                  <p>Change admin password and user settings</p>
                  <span className="admin-nav-arrow">→</span>
                </div>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to="/admin/analytics/pages" className="admin-nav-link">
                <div className="section-card dashboard-card">
                  <h3>Page Analytics</h3>
                  <p>Views over time, top pages, and referrer sources</p>
                  <span className="admin-nav-arrow">→</span>
                </div>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to="/admin/analytics/visitors" className="admin-nav-link">
                <div className="section-card dashboard-card">
                  <h3>Visitor Analytics</h3>
                  <p>Unique visitors, browsers, devices, and geographic data</p>
                  <span className="admin-nav-arrow">→</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
