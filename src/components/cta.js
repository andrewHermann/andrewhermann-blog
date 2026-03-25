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
      action: "Read more",
      link: "/portfolio#ki-v"
    },
    {
      title: "COCKPIT – Portfolio Intelligence for ASTAB",
      description: "Designed and led the delivery of a federated portfolio intelligence system across ASTAB — replacing a manual, fragmented reporting cycle with a single accountable pipeline. 11 dashboards. Delivered on scope and budget.",
      tags: ["#Governance", "#Analytics", "#Portfolio", "#Leadership"],
      iconClass: "analytics-icon",
      action: "View details",
      link: "/portfolio#cockpit"
    },
    {
      title: "TTR Rail Planning (SBB / RNE)",
      description: "Led multi-stakeholder reform across 150+ organisations and 28 national rail operators. Brokered the first formal agreement between Forum Train Europe and RailNetEurope, and secured a €2M EU Horizon grant.",
      tags: ["#EU", "#Transport", "#Reform", "#Stakeholders"],
      iconClass: "transport-icon",
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
              <div className={`case-card-icon ${snapshot.iconClass}`}></div>
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
