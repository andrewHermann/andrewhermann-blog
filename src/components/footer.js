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
import PropTypes from 'prop-types'
import OpenSourceBadge from './OpenSourceBadge'

import './footer.css'

const Footer = (props) => {
  const handleLicenseClick = () => {
    window.open('https://github.com/andrewHermann/andrewhermann-blog/blob/main/LICENSE', '_blank', 'noreferrer noopener')
  }

  return (
    <footer className="footer-footer1 thq-section-padding">
      <div className="footer-max-width thq-section-max-width">
        <div className="footer-links">
          <div className="footer-column1">
            <strong className="thq-body-large footer-column1-title">
              {props.column1Title}
            </strong>
            <div className="footer-footer-links1">
              <a href="/portfolio" className="thq-body-small">Portfolio</a>
              <a href="/blog" className="thq-body-small">Blog</a>
              <a href="/about" className="thq-body-small">About</a>
              <a href="/contact" className="thq-body-small">Contact</a>
              <a href="/markets" className="thq-body-small">Markets</a>
            </div>
          </div>
          <div className="footer-column2">
            <strong className="thq-body-large footer-column2-title">
              {props.column2Title}
            </strong>
            <div className="footer-footer-links2">
              <a href="/terms" className="thq-body-small">Terms of Use</a>
              <a href="/privacy" className="thq-body-small">Privacy Policy</a>
              <a href="/cookies" className="thq-body-small">Cookies Policy</a>
              <a href="/contact" className="thq-body-small">Support</a>
              <a href="/contact" className="thq-body-small">Contact Us</a>
            </div>
          </div>
          <div className="footer-column3">
            <strong className="thq-body-large footer-column3-title">
              {props.column3Title}
            </strong>
            <div className="footer-footer-links3">
              <OpenSourceBadge 
                variant="minimal" 
                position="static" 
                size="small" 
                showText={true}
                className="footer-opensource-badge"
              />
              <a 
                href="#" 
                onClick={handleLicenseClick} 
                className="thq-body-small footer-license-link"
              >
                GPL v3 License
              </a>
            </div>
          </div>
          <div className="footer-column4">
            <strong className="thq-body-large footer-social-link1-title">
              {props.socialLinkTitleCategory}
            </strong>
            <div className="footer-social-links">
              <a 
                href="https://www.linkedin.com/in/andrew-hermann-transformation-leader/"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-link17"
              >
                <svg
                  viewBox="0 0 877.7142857142857 1024"
                  className="thq-icon-small"
                >
                  <path d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z">
                  </path>
                </svg>
                <span className="thq-body-small">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-credits">
          <div className="thq-divider-horizontal"></div>
          <div className="footer-row">
            <span className="thq-body-small">{props.content2}</span>
            <div className="footer-footer-links4">
              <a href="/privacy" className="thq-body-small">Privacy</a>
              <a href="/terms" className="thq-body-small">Terms</a>
              <a href="/cookies" className="thq-body-small">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  cookiesLink: '/cookies',
  link1: 'Portfolio',
  socialLinkTitleCategory: 'Follow Me',
  link8: 'LinkedIn',
  link2: 'Initiatives',
  link10: 'GitHub',
  termsLink: '/terms',
  link4: 'Contact',
  link9: 'Twitter',
  link7: 'Cookies Policy',
  content2: '© 2025 Andrew J. Hermann. All rights reserved.',
  column2Title: 'Legal',
  action1: 'Subscribe',
  link6: 'Terms of Use',
  link3: 'About',
  link5: 'Privacy Policy',
  privacyLink: '/privacy',
  column1Title: 'Explore',
  column3Title: 'Open Source',
}

Footer.propTypes = {
  cookiesLink: PropTypes.string,
  link1: PropTypes.string,
  socialLinkTitleCategory: PropTypes.string,
  link8: PropTypes.string,
  link2: PropTypes.string,
  link10: PropTypes.string,
  termsLink: PropTypes.string,
  link4: PropTypes.string,
  link9: PropTypes.string,
  link7: PropTypes.string,
  content2: PropTypes.string,
  column2Title: PropTypes.string,
  action1: PropTypes.string,
  link6: PropTypes.string,
  link3: PropTypes.string,
  link5: PropTypes.string,
  privacyLink: PropTypes.string,
  column1Title: PropTypes.string,
  column3Title: PropTypes.string,
}

export default Footer
