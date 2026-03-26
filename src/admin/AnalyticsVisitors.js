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
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './Analytics.css';

const PIE_COLORS = ['#1e3a5f', '#2563eb', '#4a9fd8', '#64748b', '#94a3b8', '#cbd5e1'];

const SmallPie = ({ data, title }) => {
  if (!data || data.length === 0) return (
    <div className="analytics-chart-card">
      <div className="analytics-chart-title">{title}</div>
      <div className="analytics-empty">No data yet.</div>
    </div>
  );
  return (
    <div className="analytics-chart-card">
      <div className="analytics-chart-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={false}>
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Legend
            formatter={(value) => <span style={{ fontSize: 11, color: '#64748b' }}>{value}</span>}
            iconSize={10}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const AnalyticsVisitors = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    apiRequest(`${API_ENDPOINTS.ANALYTICS_VISITORS}?days=${days}`)
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
              <Link to="/admin/analytics/pages" className="analytics-tab">Pages</Link>
              <span className="analytics-tab active">Visitors</span>
              <Link to="/admin/analytics/threats" className="analytics-tab">Threats</Link>
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
                  <div className="analytics-stat-value">{data.summary.unique_visitors ?? 0}</div>
                  <div className="analytics-stat-label">Unique Visitors</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{data.summary.total_sessions ?? 0}</div>
                  <div className="analytics-stat-label">Sessions</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{data.summary.today_visitors ?? 0}</div>
                  <div className="analytics-stat-label">Today</div>
                </div>
              </div>

              <div className="analytics-chart-card">
                <div className="analytics-chart-title">Unique Visitors Over Time</div>
                {data.visitors_over_time.length === 0 ? (
                  <div className="analytics-empty">No data yet.</div>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data.visitors_over_time} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }}
                        labelStyle={{ color: '#1e3a5f', fontWeight: 600 }}
                      />
                      <Line type="monotone" dataKey="unique_visitors" stroke="#2563eb" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="analytics-charts-row">
                <SmallPie data={data.browsers} title="Browsers" />
                <SmallPie data={data.os} title="Operating Systems" />
                <SmallPie data={data.devices} title="Device Types" />
              </div>

              <div className="section-card">
                <div className="analytics-chart-title">Geographic Distribution</div>
                {data.locations.length === 0 ? (
                  <div className="analytics-empty">No geographic data yet. Visitors outside local networks will be geolocated automatically.</div>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th>Region</th>
                        <th>City</th>
                        <th>Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.locations.map((loc, i) => (
                        <tr key={i}>
                          <td>{loc.country || '—'}</td>
                          <td>{loc.region || '—'}</td>
                          <td>{loc.city || '—'}</td>
                          <td>{loc.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="section-card">
                <div className="analytics-chart-title">Networks &amp; Organisations</div>
                {data.orgs.length === 0 ? (
                  <div className="analytics-empty">No network data yet.</div>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr>
                        <th>Organisation / ISP</th>
                        <th>Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orgs.map((o) => (
                        <tr key={o.name}>
                          <td>{o.name}</td>
                          <td>{o.count}</td>
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

export default AnalyticsVisitors;
