import React from 'react'
import './what-i-do.css'

const WhatIDo = () => {
  return (
    <div className="what-i-do-container">
      <div className="what-i-do-header">
        <h2>What I Do</h2>
        <p>Three ways I help organizations navigate complexity and deliver results</p>
      </div>
      
      <div className="what-i-do-grid">
        <div className="what-i-do-card">
          <div className="what-i-do-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h3>System Navigation</h3>
          <p>I guide public sector organisations through the noise of overlapping mandates, legacy processes, and digital transformation agendas—without romanticism, but with clarity.</p>
        </div>

        <div className="what-i-do-card">
          <div className="what-i-do-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </div>
          <h3>AI for Institutions</h3>
          <p>I develop responsible, domain-specific AI use cases—especially in high-trust environments like defense, mobility, and public administration.</p>
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
          <h3>Data Strategy</h3>
          <p>I translate raw data into decision architectures. Dashboards are not enough—governance, relevance, and accountability must be built in.</p>
        </div>
      </div>
    </div>
  )
}

export default WhatIDo
