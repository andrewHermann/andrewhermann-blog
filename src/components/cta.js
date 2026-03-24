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
      description: "Led end-to-end deployment of a production conversational AI system inside the Swiss Armed Forces — architecture, governance, user adoption, regulatory positioning. 150+ active users within six months. First AI governance framework in Swiss defense.",
      tags: ["#AI", "#Defense", "#Innovation", "#Strategy"],
      iconClass: "ai-icon",
      action: "Read more",
      link: "/portfolio#ki-v"
    },
    {
      title: "COCKPIT – Power BI Portfolio for ASTAB",
      description: "Created and operationalised a project portfolio dashboard with live KPIs across 40+ initiatives. Unified data from legacy Excel systems, enforced governance logic, and increased update rates 3x.",
      tags: ["#PowerBI", "#Governance", "#Analytics", "#Portfolio"],
      iconClass: "analytics-icon",
      action: "View Cockpit visuals",
      link: "/portfolio#cockpit"
    },
    {
      title: "TTR Rail Planning (SBB / RNE)",
      description: "Co-led coordination of 150+ stakeholders across Europe to align digital train path planning reforms. Brokered agreements and introduced structured planning models that reduced friction in negotiation.",
      tags: ["#EU", "#Transport", "#Stakeholders", "#Reform"],
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
