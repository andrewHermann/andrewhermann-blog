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

const THREAT_COLORS = {
  human:      '#2563eb',
  crawler:    '#4a9fd8',
  suspicious: '#f59e0b',
  headless:   '#ef4444',
  scanner:    '#dc2626',
  unknown:    '#94a3b8',
};
const PAGE_COLORS  = ['#1e3a5f', '#2a5298', '#2563eb', '#4a9fd8', '#64748b'];
const POST_COLORS  = ['#1e3a5f', '#2a5298', '#2563eb', '#4a9fd8', '#64748b'];

function bubbleLabel(raw, radius) {
  if (!raw) return '—';
  const s = String(raw).replace(/^\/blog\//, '').replace(/^\//, '') || '/';
  const maxChars = Math.max(4, Math.floor(radius / 5));
  return s.length > maxChars ? s.slice(0, maxChars) + '…' : s;
}

const BubbleChart = ({ items, nameKey, valueKey, colorFn, emptyMsg }) => {
  if (!items || items.length === 0) {
    return (
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-body)' }}>
        {emptyMsg || 'No data yet.'}
      </p>
    );
  }
  const max = Math.max(...items.map(d => d[valueKey]));
  const MAX_R = 54;
  const MIN_R = 22;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', paddingTop: 4 }}>
      {items.map((item, idx) => {
        const ratio = max > 0 ? item[valueKey] / max : 0;
        const r = MIN_R + (MAX_R - MIN_R) * Math.sqrt(ratio);
        const diam = Math.round(r * 2);
        const color = colorFn ? colorFn(item, idx) : PAGE_COLORS[idx % PAGE_COLORS.length];
        const fontSize = Math.max(8, Math.round(r / 4.5));
        return (
          <div
            key={idx}
            title={`${item[nameKey]}: ${item[valueKey]}`}
            style={{
              width: diam, height: diam, borderRadius: '50%',
              background: color,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', padding: 4, cursor: 'default',
              flexShrink: 0,
            }}
          >
            <div style={{ color: '#fff', fontWeight: 700, fontSize: fontSize + 1, fontFamily: 'var(--font-body)', lineHeight: 1 }}>
              {item[valueKey]}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.82)', fontSize, fontFamily: 'var(--font-body)', lineHeight: 1.1, wordBreak: 'break-all' }}>
              {bubbleLabel(item[nameKey], r)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

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
            <div className="section-card" style={{ flex: '1 1 280px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-lg)' }}>
                Top Pages <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>— last 30 days</span>
              </h3>
              <BubbleChart
                items={stats.top_pages}
                nameKey="page"
                valueKey="views"
                colorFn={(_, idx) => PAGE_COLORS[idx % PAGE_COLORS.length]}
                emptyMsg="No page views yet."
              />
            </div>

            <div className="section-card" style={{ flex: '1 1 280px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-lg)' }}>
                Top Blog Posts <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>— last 30 days</span>
              </h3>
              <BubbleChart
                items={stats.top_posts.map(p => ({ ...p, label: p.title || p.page }))}
                nameKey="label"
                valueKey="views"
                colorFn={(_, idx) => POST_COLORS[idx % POST_COLORS.length]}
                emptyMsg="No blog post views yet."
              />
            </div>

            <div className="section-card" style={{ flex: '1 1 280px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)', fontSize: 'var(--font-size-lg)' }}>
                Traffic Types <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>— last 30 days</span>
              </h3>
              <BubbleChart
                items={stats.threat_types || []}
                nameKey="name"
                valueKey="count"
                colorFn={(item) => THREAT_COLORS[item.name] || THREAT_COLORS.unknown}
                emptyMsg="No traffic data yet."
              />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
