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

import React from 'react'
import { useNavigate } from 'react-router-dom'
import './hero.css'

const Hero = () => {
  const navigate = useNavigate()

  const handleSeeWork = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate('/portfolio')
  }

  const handleContact = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate('/contact')
  }

  return (
    <div className="hero-container">
      <div className="hero-background">
        <div className="hero-nodes"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-watermark">AH</div>
        
        <div className="hero-text">
          <h1 className="hero-headline">Complexity deserves clarity.</h1>
          <p className="hero-subheadline">
            I work at the intersection of digital transformation, institutional reform, and AI strategy—helping public organisations navigate change without losing themselves in the fog.
          </p>
        </div>
        
        <div className="hero-actions">
          <button className="hero-btn hero-btn-primary" onClick={handleSeeWork}>
            See My Work
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={handleContact}>
            Contact Me
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
