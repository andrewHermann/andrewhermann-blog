/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import {
  getVisitorId,
  getSessionId,
  hasAnalyticsConsent,
  trackPageView,
  trackPageLeave,
} from '../../services/analytics';

// ─── Storage helpers ──────────────────────────────────────────────────────────

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

beforeEach(() => {
  clearStorage();
  jest.clearAllMocks();
  global.fetch = jest.fn().mockResolvedValue({});
});

afterEach(() => {
  clearStorage();
});

// ─── hasAnalyticsConsent ──────────────────────────────────────────────────────

describe('hasAnalyticsConsent', () => {
  test('returns false when no consent cookie is set', () => {
    expect(hasAnalyticsConsent()).toBe(false);
  });

  test('returns false when consent is set to "essential"', () => {
    localStorage.setItem('cookieConsent', 'essential');
    expect(hasAnalyticsConsent()).toBe(false);
  });

  test('returns true when consent is set to "all"', () => {
    localStorage.setItem('cookieConsent', 'all');
    expect(hasAnalyticsConsent()).toBe(true);
  });
});

// ─── getVisitorId ─────────────────────────────────────────────────────────────

describe('getVisitorId', () => {
  test('creates and persists a visitor ID on first call', () => {
    const id = getVisitorId();
    expect(id).toBeTruthy();
    expect(localStorage.getItem('ah_vid')).toBe(id);
  });

  test('returns the same ID on subsequent calls', () => {
    const first = getVisitorId();
    const second = getVisitorId();
    expect(first).toBe(second);
  });

  test('generates a non-trivially-short ID', () => {
    expect(getVisitorId().length).toBeGreaterThan(6);
  });
});

// ─── getSessionId ─────────────────────────────────────────────────────────────

describe('getSessionId', () => {
  test('creates and persists a session ID on first call', () => {
    const id = getSessionId();
    expect(id).toBeTruthy();
    expect(sessionStorage.getItem('ah_sid')).toBe(id);
  });

  test('returns the same ID within the same session', () => {
    const first = getSessionId();
    const second = getSessionId();
    expect(first).toBe(second);
  });

  test('visitor ID and session ID are independent', () => {
    const vid = getVisitorId();
    const sid = getSessionId();
    expect(vid).not.toBe(sid);
  });
});

// ─── trackPageView ────────────────────────────────────────────────────────────

describe('trackPageView', () => {
  test('does not fetch when consent is not given', () => {
    trackPageView('/about');
    expect(fetch).not.toHaveBeenCalled();
  });

  test('calls fetch with correct endpoint when consent is given', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageView('/about');
    expect(fetch).toHaveBeenCalledTimes(1);
    const [url] = fetch.mock.calls[0];
    expect(url).toMatch(/\/api\/track$/);
  });

  test('sends page and visitor_id in the request body', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageView('/blog');
    const [, options] = fetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.page).toBe('/blog');
    expect(body.visitor_id).toBeTruthy();
    expect(body.session_id).toBeTruthy();
  });

  test('sends referrer in the request body', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageView('/portfolio', 'https://example.com');
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.referrer).toBe('https://example.com');
  });

  test('sends empty string referrer when none provided', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageView('/');
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.referrer).toBe('');
  });

  test('includes keepalive flag', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageView('/');
    const [, options] = fetch.mock.calls[0];
    expect(options.keepalive).toBe(true);
  });
});

// ─── trackPageLeave ───────────────────────────────────────────────────────────

describe('trackPageLeave', () => {
  test('does not fetch when consent is not given', () => {
    trackPageLeave('/about', 30);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('does not fetch when duration is under 2 seconds', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 1);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('does not fetch when duration rounds to 1 second', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 1.4);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('calls fetch for valid duration', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 45);
    expect(fetch).toHaveBeenCalledTimes(1);
    const [url] = fetch.mock.calls[0];
    expect(url).toMatch(/\/api\/track-leave$/);
  });

  test('caps duration at 900 seconds', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 9999);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.duration_seconds).toBe(900);
  });

  test('sends exactly 900 seconds when input is 900', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 900);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.duration_seconds).toBe(900);
  });

  test('rounds fractional seconds', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/about', 45.7);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.duration_seconds).toBe(46);
  });

  test('sends page, visitor_id, and session_id', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/portfolio', 60);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.page).toBe('/portfolio');
    expect(body.visitor_id).toBeTruthy();
    expect(body.session_id).toBeTruthy();
  });

  test('includes keepalive flag', () => {
    localStorage.setItem('cookieConsent', 'all');
    trackPageLeave('/portfolio', 60);
    const [, options] = fetch.mock.calls[0];
    expect(options.keepalive).toBe(true);
  });
});
