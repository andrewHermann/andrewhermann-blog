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
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './Analytics.css';

const TYPE_COLORS = {
  human:      '#2563eb',
  crawler:    '#4a9fd8',
  suspicious: '#f59e0b',
  headless:   '#ef4444',
  scanner:    '#dc2626',
  unknown:    '#94a3b8',
};

const TYPE_ORDER = ['human', 'crawler', 'suspicious', 'headless', 'scanner', 'unknown'];

const AnalyticsThreats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    apiRequest(`${API_ENDPOINTS.ANALYTICS_THREATS}?days=${days}`)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [days]);

  const totalTraffic = data?.traffic_types?.reduce((s, t) => s + t.count, 0) || 0;
  const nonHuman = data?.traffic_types?.filter(t => t.name !== 'human').reduce((s, t) => s + t.count, 0) || 0;

  const pieData = data?.traffic_types?.map(t => ({
    name: t.name || 'unknown',
    count: t.count,
  })) || [];

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">

          <div className="section-card">
            <h1 className="page-title">Analytics</h1>
            <div className="analytics-tabs">
              <Link to="/admin/analytics/pages" className="analytics-tab">Pages</Link>
              <Link to="/admin/analytics/visitors" className="analytics-tab">Visitors</Link>
              <Link to="/admin/analytics/profiles" className="analytics-tab">Profiles</Link>
              <span className="analytics-tab active">Threats</span>
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
          {!loading && !data && <div className="analytics-empty">Failed to load threat data.</div>}

          {!loading && data && (
            <>
              {/* Traffic type summary */}
              <div className="analytics-stats-grid">
                <div className="analytics-stat">
                  <div className="analytics-stat-value">{totalTraffic}</div>
                  <div className="analytics-stat-label">Total Requests</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value" style={{ color: '#ef4444' }}>{nonHuman}</div>
                  <div className="analytics-stat-label">Non-Human</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value" style={{ color: '#dc2626' }}>
                    {data.traffic_types?.find(t => t.name === 'scanner')?.count ?? 0}
                  </div>
                  <div className="analytics-stat-label">Scanner</div>
                </div>
                <div className="analytics-stat">
                  <div className="analytics-stat-value" style={{ color: '#f59e0b' }}>
                    {data.scan_paths?.reduce((s, p) => s + p.count, 0) ?? 0}
                  </div>
                  <div className="analytics-stat-label">Probe Attempts</div>
                </div>
              </div>

              {/* Traffic type breakdown */}
              <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
                <div className="analytics-chart-card" style={{ flex: '1 1 320px' }}>
                  <div className="analytics-chart-title">Traffic Classification</div>
                  {pieData.length === 0 ? (
                    <div className="analytics-empty">No data yet.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie data={pieData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={false}>
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={TYPE_COLORS[entry.name] || '#94a3b8'} />
                          ))}
                        </Pie>
                        <Legend formatter={(value) => <span style={{ fontSize: 11, color: '#64748b' }}>{value}</span>} iconSize={10} />
                        <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 0 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                <div className="section-card" style={{ flex: '1 1 320px' }}>
                  <div className="analytics-chart-title">By Type</div>
                  {data.traffic_types.length === 0 ? (
                    <div className="analytics-empty">No data yet.</div>
                  ) : (
                    <table className="analytics-table">
                      <thead>
                        <tr><th>Type</th><th>Count</th><th>% of total</th></tr>
                      </thead>
                      <tbody>
                        {[...data.traffic_types].sort((a, b) => TYPE_ORDER.indexOf(a.name) - TYPE_ORDER.indexOf(b.name)).map((t) => (
                          <tr key={t.name}>
                            <td>
                              <span style={{
                                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                                background: TYPE_COLORS[t.name] || '#94a3b8', marginRight: 6,
                              }} />
                              {t.name || 'unknown'}
                            </td>
                            <td>{t.count}</td>
                            <td style={{ color: 'var(--color-text-secondary)' }}>
                              {totalTraffic ? Math.round((t.count / totalTraffic) * 100) : 0}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Suspicious / hostile ASNs */}
              {data.suspicious_orgs.length > 0 && (
                <div className="section-card">
                  <div className="analytics-chart-title">Suspicious Origins</div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-body)' }}>
                    Requests classified as scanner, headless, or suspicious — or originating from hosting/proxy IPs.
                  </p>
                  <table className="analytics-table">
                    <thead>
                      <tr><th>ASN</th><th>ISP / Org</th><th>Country</th><th>Requests</th></tr>
                    </thead>
                    <tbody>
                      {data.suspicious_orgs.map((o, i) => (
                        <tr key={i}>
                          <td><code style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{o.asn || '—'}</code></td>
                          <td>{o.isp || o.org || '—'}</td>
                          <td>{o.country || '—'}</td>
                          <td style={{ color: '#ef4444', fontWeight: 600 }}>{o.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Scan path attempts */}
              <div className="section-card">
                <div className="analytics-chart-title">Path Probes</div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-body)' }}>
                  Requests for paths associated with exploit frameworks, CMS vulnerabilities, and credential exposure.
                </p>
                {data.scan_paths.length === 0 ? (
                  <div className="analytics-empty">No scan attempts recorded.</div>
                ) : (
                  <table className="analytics-table">
                    <thead>
                      <tr><th>Path</th><th>Hits</th><th>Last seen</th></tr>
                    </thead>
                    <tbody>
                      {data.scan_paths.map((p) => (
                        <tr key={p.path}>
                          <td><code style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{p.path}</code></td>
                          <td style={{ color: '#ef4444', fontWeight: 600 }}>{p.count}</td>
                          <td style={{ color: 'var(--color-text-secondary)' }}>{p.last_seen?.split('T')[0] || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Scan attempt origins */}
              {data.scan_origins.length > 0 && (
                <div className="section-card">
                  <div className="analytics-chart-title">Probe Origins</div>
                  <table className="analytics-table">
                    <thead>
                      <tr><th>ASN</th><th>Organisation</th><th>Country</th><th>Probes</th></tr>
                    </thead>
                    <tbody>
                      {data.scan_origins.map((o, i) => (
                        <tr key={i}>
                          <td><code style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{o.asn || '—'}</code></td>
                          <td>{o.org || '—'}</td>
                          <td>{o.country || '—'}</td>
                          <td style={{ color: '#ef4444', fontWeight: 600 }}>{o.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Recent raw scan log */}
              {data.recent_scans.length > 0 && (
                <div className="section-card">
                  <div className="analytics-chart-title">Recent Probe Log</div>
                  <table className="analytics-table">
                    <thead>
                      <tr><th>Timestamp</th><th>Method</th><th>Path</th><th>Country</th><th>ASN</th><th>UA</th></tr>
                    </thead>
                    <tbody>
                      {data.recent_scans.map((s) => (
                        <tr key={s.id || `${s.timestamp}-${s.path}`}>
                          <td style={{ whiteSpace: 'nowrap', color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
                            {s.timestamp?.replace('T', ' ').split('.')[0] || '—'}
                          </td>
                          <td style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.75rem' }}>{s.method || '—'}</td>
                          <td><code style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{s.path}</code></td>
                          <td>{s.country || '—'}</td>
                          <td><code style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{s.asn || '—'}</code></td>
                          <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                            {s.user_agent || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AnalyticsThreats;
