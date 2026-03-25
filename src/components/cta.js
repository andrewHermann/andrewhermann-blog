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

import './cta.css'

const CTA = () => {
  // Define case snapshot cards
  const caseSnapshots = [
    {
      title: "KI@V – Institutional AI for the Swiss Armed Forces",
      description: "Led the institutional adoption of conversational AI inside the Swiss Armed Forces — governance design, stakeholder alignment, regulatory positioning, and user adoption. 150+ active users within six months. First AI governance framework in Swiss defense.",
      tags: ["#AI", "#Defense", "#Governance", "#Strategy"],
      iconClass: "ai-icon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      action: "Read more",
      link: "/portfolio#ki-v"
    },
    {
      title: "COCKPIT – Portfolio Intelligence for ASTAB",
      description: "Designed and led the delivery of a federated portfolio intelligence system across ASTAB — replacing a manual, fragmented reporting cycle with a single accountable pipeline. 11 dashboards. Delivered on scope and budget.",
      tags: ["#Governance", "#Analytics", "#Portfolio", "#Leadership"],
      iconClass: "analytics-icon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>
      ),
      action: "View details",
      link: "/portfolio#cockpit"
    },
    {
      title: "TTR Rail Planning (SBB / RNE)",
      description: "Led multi-stakeholder reform across 150+ organisations and 28 national rail operators. Brokered the first formal agreement between Forum Train Europe and RailNetEurope, and secured a €2M EU Horizon grant.",
      tags: ["#EU", "#Transport", "#Reform", "#Stakeholders"],
      iconClass: "transport-icon",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      action: "View details",
      link: "/portfolio#ttr"
    }
  ]

  const handleCardClick = (link) => {
    if (link !== "#") {
      window.location.href = link;
    }
  }

  return (
    <section className="cta">
      <div className="case-snapshots-header">
        <h2>Selected Work</h2>
        <p>High-stakes transformation projects at the intersection of AI, data strategy, and institutional reform.</p>
      </div>
      
      <div className="case-cards">
        {caseSnapshots.map((snapshot, index) => (
          <div key={index} className="case-card">
            <div className="case-card-header">
              <div className={`case-card-icon ${snapshot.iconClass}`}>
                {snapshot.icon}
              </div>
              <h3 className="case-card-title">{snapshot.title}</h3>
            </div>
            <p className="case-card-description">{snapshot.description}</p>
            <div className="case-card-tags">
              {snapshot.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="case-card-tag">{tag}</span>
              ))}
            </div>
            <button 
              className="case-card-button" 
              onClick={() => handleCardClick(snapshot.link)}
            >
              → {snapshot.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

CTA.defaultProps = {}
CTA.propTypes = {}

export default CTA
