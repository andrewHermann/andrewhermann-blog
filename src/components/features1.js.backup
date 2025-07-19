import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './features1.css'

const Features1 = (props) => {
  const navigate = useNavigate()

  const portfolioItems = [
    {
      title: 'KI@V – Conversational AI for the Swiss Armed Forces',
      id: 'ki-v'
    },
    {
      title: 'Cockpit – Power BI Portfolio Management Platform',
      id: 'cockpit'
    },
    {
      title: 'Digital Innovation Leadership – Bundesverwaltung & VBS',
      id: 'digital-innovation'
    },
    {
      title: 'TTR Implementation – European Rail Sector',
      id: 'ttr'
    },
    {
      title: 'Oracle-Based System Management – Ascom',
      id: 'oracle-systems'
    }
  ]

  const handleItemClick = (itemId) => {
    navigate('/portfolio', { state: { scrollTo: itemId } })
  }

  const handleViewAllClick = () => {
    navigate('/portfolio')
    // Ensure we start at the top of the page
    window.scrollTo(0, 0)
  }

  return (
    <div className="features1-portfolio-section">
      <div className="features1-header">
        <h2 className="features1-title">Professional Portfolio</h2>
        <p className="features1-subtitle">
          Explore my key projects and initiatives in organizational strategy, AI innovation, and digital transformation.
        </p>
      </div>
      
      <div className="features1-portfolio-list">
        {portfolioItems.map((item, index) => (
          <div 
            key={index} 
            className="features1-portfolio-item"
            onClick={() => handleItemClick(item.id)}
          >
            <h3 className="features1-item-title">{item.title}</h3>
            <div className="features1-item-link">
              <span>View Details →</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="features1-view-all">
        <button 
          className="features1-view-all-btn"
          onClick={handleViewAllClick}
        >
          View Full Portfolio
        </button>
      </div>
    </div>
  )
}

Features1.defaultProps = {}

Features1.propTypes = {}

export default Features1
