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


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = ({ onLogout, userRole }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (userRole === 'admin') {
      apiRequest(API_ENDPOINTS.DASHBOARD_STATS).then(setStats).catch(() => {});
    }
  }, [userRole]);

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
        {userRole === 'admin' && stats && (
          <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
            <div className="section-card" style={{ flex: '1 1 340px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-lg)' }}>
                Top Pages <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>— last 30 days</span>
              </h3>
              {stats.top_pages.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-body)' }}>No data yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)' }}>
                  <tbody>
                    {stats.top_pages.map((p) => (
                      <tr key={p.page} style={{ borderBottom: '1px solid var(--color-accent-1)' }}>
                        <td style={{ padding: '6px 0', color: 'var(--color-text)' }}>{p.page}</td>
                        <td style={{ padding: '6px 0', textAlign: 'right', color: 'var(--color-primary)', fontWeight: 600 }}>{p.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="section-card" style={{ flex: '1 1 340px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-lg)' }}>
                Top Blog Posts <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>— last 30 days</span>
              </h3>
              {stats.top_posts.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-body)' }}>No blog post views yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)' }}>
                  <tbody>
                    {stats.top_posts.map((p) => (
                      <tr key={p.page} style={{ borderBottom: '1px solid var(--color-accent-1)' }}>
                        <td style={{ padding: '6px 0', color: 'var(--color-text)' }}>{p.title || p.page}</td>
                        <td style={{ padding: '6px 0', textAlign: 'right', color: 'var(--color-primary)', fontWeight: 600 }}>{p.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
