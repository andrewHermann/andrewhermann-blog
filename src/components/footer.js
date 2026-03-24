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

import OpenSourceBadge from './OpenSourceBadge'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer-root thq-section-padding">
      <div className="footer-inner thq-section-max-width">

        <div className="footer-top">
          <div className="footer-brand">
            <img
              alt="Andrew J. Hermann Logo"
              src="/ah-logo.png"
              className="footer-logo"
            />
            <p className="footer-tagline">Strategic Leadership & AI Innovation</p>
            <p className="footer-location">Bern, Switzerland</p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/andrew-hermann-transformation-leader/"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-social-link"
              >
                <svg viewBox="0 0 877.714 1024" className="footer-social-icon">
                  <path d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/andrewHermann"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-social-link"
              >
                <svg viewBox="0 0 1024 1024" className="footer-social-icon">
                  <path d="M512 76c-240.9 0-437 196.1-437 437 0 193.1 125.1 356.6 299 414.5 21.8 4 29.7-9.5 29.7-21.3v-81.4c-122.5 26.7-148.3-59-148.3-59-19.8-50.1-48.4-63.4-48.4-63.4-39.6-27.1 3-26.6 3-26.6 43.8 3.1 66.8 45 66.8 45 38.8 66.5 101.8 47.3 126.5 36.1 4-28.1 15.2-47.3 27.7-58.3-97.8-11.1-200.5-48.9-200.5-217.6 0-48.1 17.2-87.5 45.4-118.3-4.6-11.2-19.7-56 4.3-116.7 0 0 37.1-11.9 121.5 45.5 35.3-9.8 73.2-14.7 110.9-14.9 37.5 0.2 75.3 5.1 110.9 14.9 84.3-57.4 121.5-45.5 121.5-45.5 24 60.7 8.9 105.5 4.3 116.7 28.2 30.8 45.4 70.2 45.4 118.3 0 169.2-102.8 206.3-200.9 217.1 15.7 13.5 29.7 40.3 29.7 81v120.1c0 11.8 7.9 25.4 30 21.1 174.2-57.9 299.3-221.4 299.3-414.5 0-240.9-196.1-437-437-437z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-col">
              <span className="footer-nav-heading">Explore</span>
              <a href="/portfolio" className="footer-nav-link">Portfolio</a>
              <a href="/blog" className="footer-nav-link">Blog</a>
              <a href="/about" className="footer-nav-link">About</a>
              <a href="/contact" className="footer-nav-link">Contact</a>
              <a href="/markets" className="footer-nav-link">Markets</a>
            </div>

            <div className="footer-nav-col">
              <span className="footer-nav-heading">Legal</span>
              <a href="/terms" className="footer-nav-link">Terms of Use</a>
              <a href="/privacy" className="footer-nav-link">Privacy Policy</a>
              <a href="/cookies" className="footer-nav-link">Cookies Policy</a>
            </div>

            <div className="footer-nav-col">
              <span className="footer-nav-heading">Open Source</span>
              <a href="/behind-the-site" className="footer-nav-link">Behind the Site</a>
              <a
                href="https://github.com/andrewHermann/andrewhermann-blog/blob/main/LICENSE"
                target="_blank"
                rel="noreferrer noopener"
                className="footer-nav-link"
              >
                GPL v3 License
              </a>
              <OpenSourceBadge
                variant="minimal"
                position="static"
                size="small"
                showText={true}
                className="footer-opensource-badge"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="thq-divider-horizontal footer-divider"></div>
          <div className="footer-bottom-row">
            <span>© 2026 Andrew J. Hermann. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/cookies">Cookies</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
