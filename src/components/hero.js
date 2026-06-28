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

const HERO_CONTENT = {
  en: {
    roleTag: 'Swiss Federal Administration',
    headline: 'Complexity deserves clarity.',
    subheadline: 'I have led AI platform development within the Swiss Armed Forces since 2022 and contribute to federal AI governance at the Federal Chancellery. The work spans technical architecture, institutional stakeholder management, and policy positioning in environments where accountability is non-negotiable.',
    btnWork: 'See My Work',
    btnContact: 'Contact Me',
    credLabel1: 'In Technology',
    credLabel2: 'Users on KI@V since June 2026',
    credLabel3: 'Bern, Switzerland',
    portfolioPath: '/portfolio',
    contactPath: '/contact',
  },
  de: {
    roleTag: 'Schweizer Bundesverwaltung',
    headline: 'Komplexität braucht Klarheit.',
    subheadline: 'Ich leite die KI-Plattformentwicklung in der Schweizer Armee seit 2022 und trage zur föderalen KI-Governance bei der Bundeskanzlei bei. Die Arbeit umfasst technische Architektur, institutionelles Stakeholder-Management und Policy-Positionierung in Umgebungen, in denen Rechenschaftspflicht nicht verhandelbar ist.',
    btnWork: 'Meine Arbeit ansehen',
    btnContact: 'Kontakt aufnehmen',
    credLabel1: 'In der Technologie',
    credLabel2: 'Nutzer auf KI@V seit Juni 2026',
    credLabel3: 'Bern, Schweiz',
    portfolioPath: '/portfolio/de',
    contactPath: '/contact/de',
  },
}

const Hero = ({ lang = 'en' }) => {
  const navigate = useNavigate()
  const c = HERO_CONTENT[lang]

  const handleSeeWork = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(c.portfolioPath)
  }

  const handleContact = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate(c.contactPath)
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
            <span className="hero-role-tag">{c.roleTag}</span>
          </div>
          <h1 className="hero-headline">{c.headline}</h1>
          <p className="hero-subheadline">{c.subheadline}</p>
        </div>

        <div className="hero-actions">
          <button className="hero-btn hero-btn-primary" onClick={handleSeeWork}>
            {c.btnWork}
          </button>
          <button className="hero-btn hero-btn-secondary" onClick={handleContact}>
            {c.btnContact}
          </button>
        </div>

        <div className="hero-credentials">
          <div className="hero-cred">
            <span className="hero-cred-number">Since 1984</span>
            <span className="hero-cred-label">{c.credLabel1}</span>
          </div>
          <div className="hero-cred-divider"></div>
          <div className="hero-cred">
            <span className="hero-cred-number">700+</span>
            <span className="hero-cred-label">{c.credLabel2}</span>
          </div>
          <div className="hero-cred-divider"></div>
          <div className="hero-cred">
            <span className="hero-cred-number">DE · EN</span>
            <span className="hero-cred-label">{c.credLabel3}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
