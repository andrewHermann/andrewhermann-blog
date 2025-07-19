import React from 'react'
import PropTypes from 'prop-types'
import './cta.css'

const CTA = (props) => {
  // Define informational cards about skills and experience
  const infoCards = [
    {
      title: "Strategic Leadership & Innovation",
      description: "Experienced in developing and implementing organizational strategies that drive innovation and operational excellence across complex systems.",
      action: "View Portfolio"
    },
    {
      title: "Applied Artificial Intelligence",
      description: "Specialized in leveraging AI technologies to solve real-world problems in public administration and organizational management.",
      action: "See AI Projects"
    },
    {
      title: "Data-Driven Decision Making",
      description: "Proven track record of using analytics and data science to inform strategic decisions and optimize organizational performance.",
      action: "Explore Methods"
    },
    {
      title: "Project Portfolio Management",
      description: "Expert in managing complex project portfolios, resource allocation, and stakeholder coordination across multiple initiatives.",
      action: "Learn About Experience"
    }
  ]

  return (
    <div className="cta-steps-container">
      <div className="cta-steps-max-width">
        <div className="cta-steps-header">
          <h2 className="cta-steps-title">Core Competencies</h2>
          <p className="cta-steps-subtitle">Key areas of expertise and professional focus</p>
        </div>
        <div className="cta-cards-container">
          {infoCards.map((card, index) => (
            <div key={index} className={`cta-card cta-card-${index + 1}`}>
              <h3 className="cta-card-title">{card.title}</h3>
              <p className="cta-card-description">{card.description}</p>
              <button className="cta-card-button">{card.action}</button>
              <span className="cta-card-number">{String(index + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

CTA.defaultProps = {}
CTA.propTypes = {}

export default CTA
