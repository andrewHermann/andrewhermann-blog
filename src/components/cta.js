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
import './cta.css'

const CTA_ICONS = {
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18"/>
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
    </svg>
  ),
  transport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

const CTA_CONTENT = {
  en: {
    heading: 'Selected Work',
    subheading: 'Key projects in AI governance, portfolio intelligence, and European institutional coordination.',
    cards: [
      {
        title: 'KI@V: Institutional AI for the Swiss Armed Forces',
        description: 'Led AI platform development and governance within ASTAB since 2022. The platform entered active pilot operations in June 2026, with validated ROI across three use cases confirmed through independent economic assessment with HSLU.',
        iconClass: 'ai-icon',
        icon: 'ai',
        action: 'Read more',
        link: '/portfolio#ki-v',
      },
      {
        title: 'COCKPIT: Portfolio Intelligence for ASTAB',
        description: 'Designed and led delivery of a project portfolio intelligence platform across ASTAB, replacing a fragmented manual reporting cycle with an automated, governed pipeline and 11 Power BI dashboards.',
        iconClass: 'analytics-icon',
        icon: 'analytics',
        action: 'View details',
        link: '/portfolio#cockpit',
      },
      {
        title: 'TTR Rail Planning: European Coordination (SBB / RNE)',
        description: 'Led multi-stakeholder coordination across 150+ organisations and 28 national rail operators. Brokered the first formal agreement between Forum Train Europe and RailNetEurope and secured an EU Horizon grant for Railway Undertaking interface development.',
        iconClass: 'transport-icon',
        icon: 'transport',
        action: 'View details',
        link: '/portfolio#ttr',
      },
    ],
  },
  de: {
    heading: 'Ausgewählte Projekte',
    subheading: 'Schlüsselprojekte in KI-Governance, Portfolio-Intelligenz und europäischer institutioneller Koordination.',
    cards: [
      {
        title: 'KI@V: Institutionelle KI für die Schweizer Armee',
        description: 'Leitung der KI-Plattformentwicklung und -Governance innerhalb von ASTAB seit 2022. Die Plattform trat im Juni 2026 in den aktiven Pilotbetrieb ein, mit validiertem ROI über drei Anwendungsfälle, bestätigt durch eine unabhängige Wirtschaftlichkeitsbeurteilung mit der HSLU.',
        iconClass: 'ai-icon',
        icon: 'ai',
        action: 'Mehr lesen',
        link: '/portfolio/de#ki-v',
      },
      {
        title: 'COCKPIT: Portfolio-Intelligenz für ASTAB',
        description: 'Konzeption und Führung der Lieferung einer Projektportfolio-Intelligenzplattform für ASTAB, die einen fragmentierten manuellen Berichtszyklus durch eine automatisierte, gesteuerte Pipeline und 11 Power-BI-Dashboards ersetzt.',
        iconClass: 'analytics-icon',
        icon: 'analytics',
        action: 'Details ansehen',
        link: '/portfolio/de#cockpit',
      },
      {
        title: 'TTR-Trassenplanung: Europäische Koordination (SBB / RNE)',
        description: 'Leitung der Koordination mit über 150 Organisationen und 28 nationalen Eisenbahninfrastrukturbetreibern. Aushandlung der ersten formellen Vereinbarung zwischen Forum Train Europe und RailNetEurope sowie Sicherung eines EU-Horizon-Grants für die Entwicklung von Eisenbahnunternehmen-Schnittstellen.',
        iconClass: 'transport-icon',
        icon: 'transport',
        action: 'Details ansehen',
        link: '/portfolio/de#ttr',
      },
    ],
  },
}

const CTA = ({ lang = 'en' }) => {
  const navigate = useNavigate()
  const c = CTA_CONTENT[lang]

  const handleCardClick = (link) => {
    if (link !== '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      navigate(link)
    }
  }

  return (
    <section className="cta">
      <div className="case-snapshots-header">
        <h2>{c.heading}</h2>
        <p>{c.subheading}</p>
      </div>

      <div className="case-cards">
        {c.cards.map((snapshot, index) => (
          <div key={index} className="case-card">
            <div className="case-card-header">
              <div className={`case-card-icon ${snapshot.iconClass}`}>
                {CTA_ICONS[snapshot.icon]}
              </div>
              <h3 className="case-card-title">{snapshot.title}</h3>
            </div>
            <p className="case-card-description">{snapshot.description}</p>
            <button
              className="case-card-button"
              onClick={() => handleCardClick(snapshot.link)}
            >
              → {snapshot.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

CTA.defaultProps = {}

export default CTA
