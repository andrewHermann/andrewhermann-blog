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

import './what-i-do.css'

const WhatIDo = () => {
  return (
    <div className="what-i-do-container">
      <div className="what-i-do-header">
        <h2>What I Do</h2>
        <p>Three areas of active work within the Swiss federal administration and European institutional contexts.</p>
      </div>

      <div className="what-i-do-grid">
        <div className="what-i-do-card">
          <div className="what-i-do-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <h3>AI Governance &amp; Institutional Adoption</h3>
          <p>I lead AI platform development and governance within the Swiss federal administration. The work involves building the mandate, establishing accountability structures, managing stakeholder alignment across organisational boundaries, and sustaining the governance framework through operational phases.</p>
        </div>

        <div className="what-i-do-card">
          <div className="what-i-do-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18"/>
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
              <circle cx="18.7" cy="8" r="2"/>
              <circle cx="13.6" cy="13.2" r="2"/>
              <circle cx="10.8" cy="10.5" r="2"/>
              <circle cx="7" cy="14.3" r="2"/>
            </svg>
          </div>
          <h3>Portfolio Governance &amp; Strategic Visibility</h3>
          <p>I design the data infrastructure that gives institutional leadership accurate, current visibility across a project portfolio. Governed, automated pipelines replace manual compilation. Structured accountability replaces ad hoc reporting.</p>
        </div>

        <div className="what-i-do-card">
          <div className="what-i-do-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Multi-Institutional Coordination</h3>
          <p>I structure and sustain working relationships across legal, organisational, and political boundaries. My background spans defence administration, European transport policy, and federal AI governance, in contexts where no single institution holds the full mandate to act.</p>
        </div>
      </div>
    </div>
  )
}

export default WhatIDo
