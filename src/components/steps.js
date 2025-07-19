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
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Navigate to the page
    navigate(link)
  }

  const handleMethodologyClick = () => {
    // Scroll to top and navigate to about page for methodology details
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate('/about')
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
              I follow a proven methodology that combines strategic thinking,
              data-driven insights, and innovative technology solutions
              to deliver measurable results for organizations
              across public and private sectors.
            </p>
            <div className="steps-actions">
              <button 
                className="thq-button-animated thq-button-filled steps-button"
                onClick={handleMethodologyClick}
              >
                <span className="thq-body-small">View Methodology</span>
              </button>
            </div>
          </div>
          <div className="steps-container3">
            {stepCards.map((step, index) => (
              <div 
                key={step.id}
                className={`steps-container${index + 4} thq-card`}
                onClick={() => handleCardClick(step.link)}
                style={{ cursor: 'pointer' }}
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
