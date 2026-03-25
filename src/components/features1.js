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

import { useNavigate } from 'react-router-dom'
import './features1.css'

const Features1 = () => {
  const navigate = useNavigate()

  const portfolioItems = [
    {
      title: 'KI@V – Institutional AI for the Swiss Armed Forces',
      id: 'ki-v'
    },
    {
      title: 'COCKPIT – Project Portfolio Dashboard for ASTAB',
      id: 'cockpit'
    },
    {
      title: 'TTR Rail Planning – European Coordination (SBB / RNE)',
      id: 'ttr'
    }
  ]

  const handleItemClick = (itemId) => {
    try {
      navigate(`/portfolio#${itemId}`)
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }

  const handleViewAllClick = () => {
    try {
      // Ensure we start at the top of the page
      window.scrollTo(0, 0)
      navigate('/portfolio')
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }

  return (
    <div className="features1-portfolio-section">
      <div className="features1-header">
        <h2 className="features1-title">Professional Portfolio</h2>
        <p className="features1-subtitle">
          Led inside real institutions. Delivered under real constraints.
        </p>
      </div>
      
      <div className="features1-portfolio-grid">
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
