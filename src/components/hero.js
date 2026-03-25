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
        <div className="hero-text">
          <div className="hero-identity">
            <span className="hero-name">Andrew J. Hermann</span>
            <span className="hero-separator">·</span>
            <span className="hero-role-tag">Swiss Federal Administration</span>
          </div>
          <h1 className="hero-headline">Complexity deserves clarity.</h1>
          <p className="hero-subheadline">
            I have led the institutional adoption of AI inside one of Switzerland&apos;s most constrained environments — from governance design to stakeholder alignment to live deployment. I know what it takes to make transformation stick inside a bureaucracy.
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

        <div className="hero-credentials">
          <div className="hero-cred">
            <span className="hero-cred-number">40+</span>
            <span className="hero-cred-label">Years in IT & Systems</span>
          </div>
          <div className="hero-cred-divider"></div>
          <div className="hero-cred">
            <span className="hero-cred-number">150+</span>
            <span className="hero-cred-label">Active users on production AI system</span>
          </div>
          <div className="hero-cred-divider"></div>
          <div className="hero-cred">
            <span className="hero-cred-number">DE · FR · EN</span>
            <span className="hero-cred-label">Bern, Switzerland</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
