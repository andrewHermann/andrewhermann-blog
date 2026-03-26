/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './Analytics.css';

const COLORS = { primary: '#1e3a5f', secondary: '#2563eb' };

const AnalyticsPages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    apiRequest(`${API_ENDPOINTS.ANALYTICS_PAGES}?days=${days}`)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [days]);

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">

          <div className="section-card">
            <h1 className="page-title">Analytics</h1>
            <div className="analytics-tabs">
              <span className="analytics-tab active">Pages</span>
              <Link to="/admin/analytics/visitors" className="analytics-tab">Visitors</Link>
            </div>
            <div className="analytics-range">
              <label htmlFor="days-select">Period:</label>
              <select
                id="days-select"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </div>
          </div>

          {loading && <div className="analytics-loading">Loading…</div>}

          {!loading && !data && (
            <div className="analytics-empty">Failed to load analytics data.</div>
          )}

          {!loading && data && (
            <>
              <div className="analytics-stats-grid">
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{data.summary.total_views ?? 0}</div>
                  <div className="analytics-stat-label">Total Views</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{data.summary.today_views ?? 0}</div>
                  <div className="analytics-stat-label">Today</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{data.top_pages.length}</div>
                  <div className="analytics-stat-label">Pages Tracked</div>
                </div>
              </div>

              <div className="analytics-chart-card">
                <div className="analytics-chart-title">Views Over Time</div>
                {data.views_over_time.length === 0 ? (
                  <div className="analytics-empty">No data yet.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data.views_over_time} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
                        labelStyle={{ color: COLORS.primary, fontWeight: 600 }}
                      />
                      <Line type="monotone" dataKey="views" stroke={COLORS.secondary} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="section-card">
                <div className="analytics-chart-title">Top Pages</div>
                {data.top_pages.length === 0 ? (
                  <div className="analytics-empty">No page views recorded yet.</div>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>Views</th>
                        <th>Unique Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.top_pages.map((p) => (
                        <tr key={p.page}>
                          <td>{p.page}</td>
                          <td>{p.views}</td>
                          <td>{p.unique_visitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="section-card">
                <div className="analytics-chart-title">Referrer Sources</div>
                {data.referrers.length === 0 ? (
                  <div className="analytics-empty">No referrer data yet.</div>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Referrer</th>
                        <th>Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.referrers.map((r) => (
                        <tr key={r.referrer}>
                          <td>{r.referrer}</td>
                          <td>{r.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AnalyticsPages;
