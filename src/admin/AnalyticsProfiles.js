/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import './Analytics.css';

const TRAFFIC_COLORS = {
  human:      '#2563eb',
  crawler:    '#4a9fd8',
  suspicious: '#f59e0b',
  headless:   '#ef4444',
  scanner:    '#dc2626',
  unknown:    '#94a3b8',
};

function shortId(id) {
  if (!id) return '—';
  return id.length > 14 ? id.slice(0, 14) + '…' : id;
}

function shortDate(ts) {
  if (!ts) return '—';
  return ts.replace('T', ' ').split('.')[0].slice(0, 16);
}

function formatDuration(seconds) {
  if (!seconds || seconds < 2) return null;
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

const VisitorRow = ({ v, days, onExclude, onUnexclude }) => {
  const [expanded, setExpanded] = useState(false);
  const [pages, setPages] = useState(null);
  const [loadingPages, setLoadingPages] = useState(false);
  const [excluding, setExcluding] = useState(false);

  const loadPages = useCallback(() => {
    if (pages !== null) return;
    setLoadingPages(true);
    apiRequest(`${API_ENDPOINTS.ANALYTICS_VISITOR_PROFILES}/${encodeURIComponent(v.visitor_id)}?days=${days}`)
      .then(setPages)
      .catch(() => setPages([]))
      .finally(() => setLoadingPages(false));
  }, [v.visitor_id, days, pages]);

  const handleExpand = () => {
    if (!expanded) loadPages();
    setExpanded(e => !e);
  };

  const handleExclude = async () => {
    setExcluding(true);
    try {
      await apiRequest(API_ENDPOINTS.ANALYTICS_EXCLUDED, {
        method: 'POST',
        body: JSON.stringify({ visitor_id: v.visitor_id, label: 'Excluded from profiles view' }),
      });
      onExclude(v.visitor_id);
    } finally {
      setExcluding(false);
    }
  };

  const handleUnexclude = async () => {
    setExcluding(true);
    try {
      await apiRequest(`${API_ENDPOINTS.ANALYTICS_EXCLUDED}/${encodeURIComponent(v.visitor_id)}`, {
        method: 'DELETE',
      });
      onUnexclude(v.visitor_id);
    } finally {
      setExcluding(false);
    }
  };

  const typeColor = TRAFFIC_COLORS[v.traffic_type] || TRAFFIC_COLORS.unknown;

  return (
    <>
      <tr
        onClick={handleExpand}
        style={{ cursor: 'pointer', background: expanded ? 'var(--color-accent-1)' : undefined }}
      >
        <td>
          <code style={{ fontSize: '0.72rem', fontFamily: 'monospace' }} title={v.visitor_id}>
            {shortId(v.visitor_id)}
          </code>
          {v.is_excluded ? (
            <span style={{ marginLeft: 6, fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'var(--font-body)' }}>excluded</span>
          ) : null}
        </td>
        <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{v.visit_count}</td>
        <td style={{ textAlign: 'center' }}>{v.unique_pages}</td>
        <td>
          {v.country || '—'}
          {v.city ? <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8em' }}> · {v.city}</span> : null}
        </td>
        <td style={{ fontSize: '0.8rem' }}>
          <div>{v.isp || v.org || '—'}</div>
          {v.asn ? <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{v.asn}</div> : null}
        </td>
        <td style={{ fontSize: '0.8rem' }}>
          <div>{v.browser || '—'}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{v.os || ''}</div>
        </td>
        <td>
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: typeColor, marginRight: 5, verticalAlign: 'middle',
          }} />
          <span style={{ fontSize: '0.8rem' }}>{v.traffic_type || 'unknown'}</span>
        </td>
        <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
          {shortDate(v.last_seen)}
        </td>
        <td onClick={e => e.stopPropagation()}>
          {v.is_excluded ? (
            <button
              onClick={handleUnexclude}
              disabled={excluding}
              style={{ background: 'none', border: '1px solid var(--color-accent-1)', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.75rem', padding: '2px 8px', fontFamily: 'var(--font-body)' }}
            >
              {excluding ? '…' : 'Unexclude'}
            </button>
          ) : (
            <button
              onClick={handleExclude}
              disabled={excluding}
              style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', padding: '2px 8px', fontFamily: 'var(--font-body)' }}
            >
              {excluding ? '…' : 'Exclude'}
            </button>
          )}
        </td>
      </tr>
      {expanded && (
        <tr style={{ background: 'var(--color-accent-1)' }}>
          <td colSpan={9} style={{ padding: '10px 16px 14px' }}>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap', fontSize: '0.8rem', fontFamily: 'var(--font-body)', marginBottom: 10 }}>
              {v.timezone && <span><span style={{ color: 'var(--color-text-secondary)' }}>TZ</span> {v.timezone}</span>}
              {v.device_type && <span><span style={{ color: 'var(--color-text-secondary)' }}>Device</span> {v.device_type}</span>}
              {v.region && <span><span style={{ color: 'var(--color-text-secondary)' }}>Region</span> {v.region}</span>}
              <span><span style={{ color: 'var(--color-text-secondary)' }}>First seen</span> {shortDate(v.first_seen)}</span>
            </div>
            {loadingPages && <div style={{ color: 'var(--color-text-secondary)' }}>Loading pages…</div>}
            {pages && pages.length === 0 && <div style={{ color: 'var(--color-text-secondary)' }}>No page detail available.</div>}
            {pages && pages.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '3px 0', color: 'var(--color-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-accent-1)' }}>Page</th>
                    <th style={{ textAlign: 'right', padding: '3px 0', color: 'var(--color-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-accent-1)' }}>Views</th>
                    <th style={{ textAlign: 'right', padding: '3px 0', color: 'var(--color-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-accent-1)' }}>Avg time</th>
                    <th style={{ textAlign: 'right', padding: '3px 0', color: 'var(--color-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-accent-1)' }}>Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map(p => (
                    <tr key={p.page}>
                      <td style={{ padding: '3px 0', fontFamily: 'monospace', fontSize: '0.78rem' }}>{p.page}</td>
                      <td style={{ padding: '3px 0', textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>{p.views}</td>
                      <td style={{ padding: '3px 0', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                        {formatDuration(p.avg_duration_seconds) ?? <span style={{ opacity: 0.4 }}>—</span>}
                      </td>
                      <td style={{ padding: '3px 0', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{shortDate(p.last_seen)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

const AnalyticsProfiles = () => {
  const [visitors, setVisitors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const load = useCallback(() => {
    setLoading(true);
    apiRequest(`${API_ENDPOINTS.ANALYTICS_VISITOR_PROFILES}?days=${days}`)
      .then(setVisitors)
      .catch(() => setVisitors(null))
      .finally(() => setLoading(false));
  }, [days]);

  useEffect(() => { load(); }, [load]);

  const handleExclude = (visitor_id) => {
    setVisitors(vs => vs.map(v => v.visitor_id === visitor_id ? { ...v, is_excluded: 1 } : v));
  };

  const handleUnexclude = (visitor_id) => {
    setVisitors(vs => vs.map(v => v.visitor_id === visitor_id ? { ...v, is_excluded: 0 } : v));
  };

  return (
    <div className="page-container admin-page">
      <div className="page-content">
        <div className="content-main">

          <div className="section-card">
            <h1 className="page-title">Analytics</h1>
            <div className="analytics-tabs">
              <Link to="/admin/analytics/pages" className="analytics-tab">Pages</Link>
              <Link to="/admin/analytics/visitors" className="analytics-tab">Visitors</Link>
              <span className="analytics-tab active">Profiles</span>
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
          {!loading && !visitors && <div className="analytics-empty">Failed to load visitor profiles.</div>}

          {!loading && visitors && (
            <div className="section-card" style={{ overflowX: 'auto' }}>
              <div className="analytics-chart-title">
                Unique Visitors
                <span style={{ fontWeight: 400, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginLeft: 8 }}>
                  — {visitors.length} in period · click a row to expand pages
                </span>
              </div>
              {visitors.length === 0 ? (
                <div className="analytics-empty">No visitors recorded in this period.</div>
              ) : (
                <table className="analytics-table" style={{ minWidth: 780 }}>
                  <thead>
                    <tr>
                      <th>Visitor ID</th>
                      <th style={{ textAlign: 'center' }}>Visits</th>
                      <th style={{ textAlign: 'center' }}>Pages</th>
                      <th>Location</th>
                      <th>Network</th>
                      <th>Client</th>
                      <th>Type</th>
                      <th>Last seen</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map(v => (
                      <VisitorRow
                        key={v.visitor_id}
                        v={v}
                        days={days}
                        onExclude={handleExclude}
                        onUnexclude={handleUnexclude}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AnalyticsProfiles;
