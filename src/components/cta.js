import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './cta.css'

const CTA = (props) => {
  const navigate = useNavigate()

  // Define informational cards about skills and experience
  const infoCards = [
    {
      title: "Strategic Leadership & Innovation",
      description: "Experienced in developing and implementing organizational strategies that drive innovation and operational excellence across complex systems.",
      action: "View Portfolio",
      link: "/portfolio"
    },
    {
      title: "Applied Artificial Intelligence",
      description: "Specialized in leveraging AI technologies to solve real-world problems in public administration and organizational management.",
      action: "See AI Projects",
      link: "/portfolio"
    },
    {
      title: "Data-Driven Decision Making",
      description: "Proven track record of using analytics and data science to inform strategic decisions and optimize organizational performance.",
      action: "Read About Methods",
      link: "/blog"
    },
    {
      title: "Project Portfolio Management",
      description: "Expert in managing complex project portfolios, resource allocation, and stakeholder coordination across multiple initiatives.",
      action: "Learn More",
      link: "/about"
    }
  ]

  const handleCardClick = (link) => {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Navigate to the page
    navigate(link)
  }

  return (
    <div className="cta-steps-container thq-section-padding">
      <div className="cta-steps-max-width thq-section-max-width">
        <div className="cta-steps-header">
          <h2 className="thq-heading-2">Core Competencies</h2>
          <p className="thq-body-large">
            My professional expertise spans four interconnected domains that form the foundation of successful organizational transformation. Each competency leverages industry-standard frameworks, advanced methodologies, and cutting-edge technologies to deliver measurable impact.
            
            Through strategic application of PMBOK guidelines, ITIL service management principles, and ISO 9001 quality standards, I create sustainable value propositions that align with organizational objectives. My approach integrates stakeholder theory, systems thinking, and evidence-based management practices to ensure comprehensive solution delivery across diverse operational contexts.
            
            These competencies are continuously refined through professional development, industry certifications, and practical application in high-stakes environments, ensuring relevance and effectiveness in today's dynamic business landscape.
          </p>
        </div>
        <div className="cta-cards-container">
          {infoCards.map((card, index) => (
            <div key={index} className={`cta-card cta-card-${index + 1} thq-card`}>
              <h3 className="thq-heading-2">{card.title}</h3>
              <p className="thq-body-small">{card.description}</p>
              <button 
                className="cta-card-button" 
                onClick={() => handleCardClick(card.link)}
              >
                {card.action}
              </button>
              <span className="cta-card-number thq-heading-3">{String(index + 1).padStart(2, '0')}</span>
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
