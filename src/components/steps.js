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
import './steps.css'

const Steps = () => {
  const navigate = useNavigate()

  const stepCards = [
    {
      id: '01',
      title: 'Explore My Portfolio',
      description: 'A record of projects across defence, transport, and public administration, built over four decades of continuous hands-on work.',
      link: '/portfolio'
    },
    {
      id: '02',
      title: 'About Andrew',
      description: 'Background, working philosophy, and the professional trajectory behind the work, from institutional systems to applied AI.',
      link: '/about'
    },
    {
      id: '03',
      title: 'Get in Touch',
      description: 'If the context is complex and the stakes are institutional, I am available for a conversation.',
      link: '/contact'
    }
  ]

  const handleCardClick = (link) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
              How I Work
            </h2>
            <p className="thq-body-large">
              I do not solve problems by applying frameworks. I solve them by understanding what is
              actually at stake, who has the authority to act, and what change looks like inside a
              specific institution.
            </p>
            <p className="thq-body-large">
              The methodology follows the problem, not the other way around. Each engagement starts
              with constraints, authority structures, and the gap between strategic intent and
              operational reality.
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

export default Steps
