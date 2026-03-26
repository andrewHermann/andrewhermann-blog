/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import currentConfig from '../config/api';

const VISITOR_KEY = 'ah_vid';
const SESSION_KEY = 'ah_sid';

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function getVisitorId() {
  let vid = localStorage.getItem(VISITOR_KEY);
  if (!vid) {
    vid = generateId();
    localStorage.setItem(VISITOR_KEY, vid);
  }
  return vid;
}

function getSessionId() {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = generateId();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function hasAnalyticsConsent() {
  return localStorage.getItem('cookieConsent') === 'all';
}

export function trackPageView(page, referrer = '') {
  if (!hasAnalyticsConsent()) return;

  const payload = {
    page,
    referrer: referrer || '',
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    language: navigator.language || '',
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
  };

  const url = `${currentConfig.API_BASE_URL}/api/track`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}
