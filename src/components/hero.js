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
