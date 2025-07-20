import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './steps.css'

const Steps = (props) => {
  const navigate = useNavigate()

  // Define the step cards with their content and links
  const stepCards = [
    {
      id: '01',
      title: 'Explore My Portfolio',
      description: 'Browse through a collection of my past projects and initiatives to gain insights into my expertise and capabilities.',
      link: '/portfolio'
    },
    {
      id: '02', 
      title: 'Discover Current Initiatives',
      description: 'Learn about ongoing projects like KI@V and the Orion Cockpit, which showcase cutting-edge solutions in public administration.',
      link: '/blog'
    },
    {
      id: '03',
      title: 'Connect with Complex Systems',
      description: 'Understand how I leverage data-driven decision-making and applied artificial intelligence to create high-impact, scalable solutions.',
      link: '/about'
    },
    {
      id: '04',
      title: 'Get in Touch',
      description: 'Ready to discuss how my expertise can benefit your organization? Let\'s start a conversation about your strategic challenges.',
      link: '/contact'
    }
  ]

  const handleCardClick = (link) => {
    try {
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Navigate to the page
      navigate(link)
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }

  return (
    <div className="steps-container1 thq-section-padding">
      <div className="steps-max-width thq-section-max-width">
        <div className="steps-container2 thq-grid-2">
          <div className="steps-section-header">
            <h2 className="thq-heading-2">
              My Approach to Organizational Transformation
            </h2>
            <p className="thq-body-large">
              I employ a comprehensive, evidence-based methodology that integrates strategic frameworks, advanced analytics, and cutting-edge technology to drive sustainable organizational transformation. My approach leverages proven methodologies including Lean Six Sigma, Agile/Scrum, Design Thinking, and Change Management frameworks such as Kotter's 8-Step Process and ADKAR. 
              
              Utilizing tools like Microsoft Power BI, Tableau, and Python for data analytics, combined with AI/ML platforms including TensorFlow and Azure Cognitive Services, I create data-driven insights that inform strategic decisions. My project portfolio management employs methodologies such as PMI standards, SAFe (Scaled Agile Framework), and hybrid approaches tailored to organizational contexts.
              
              Through stakeholder mapping, risk assessment matrices, and continuous improvement cycles, I ensure alignment between strategic objectives and operational execution, delivering measurable ROI and sustainable competitive advantage across public and private sector organizations.
            </p>
          </div>
          <div className="steps-container3">
            {stepCards.map((step, index) => (
              <div 
                key={step.id}
                className={`steps-container${index + 4} thq-card`}
                onClick={() => handleCardClick(step.link)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(step.link)
                  }
                }}
              >
                <h2 className="thq-heading-2">{step.title}</h2>
                <span className="steps-text14 thq-body-small">
                  {step.description}
                </span>
                <label className="steps-text15 thq-heading-3">{step.id}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Steps.defaultProps = {}
Steps.propTypes = {}

export default Steps
