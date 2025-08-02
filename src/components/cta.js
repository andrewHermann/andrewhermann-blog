import React from 'react'
import PropTypes from 'prop-types'
import './cta.css'

const CTA = (props) => {
  // Define case snapshot cards
  const caseSnapshots = [
    {
      title: "KI@V – Institutional AI for the Swiss Armed Forces",
      description: "Designed and led a cross-functional MVP to explore responsible use of conversational AI across defense administration. Negotiated architecture, clarified use cases, and positioned the program strategically within the VBS innovation landscape.",
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
        <h2>Case Snapshots – "What have you actually done?"</h2>
        <p>This is your proof of execution. Avoid long prose. Keep it punchy, like smart index cards.</p>
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
