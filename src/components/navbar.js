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

import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import './navbar.css'

const DE_ROUTES = {
  '/': '/de',
  '/portfolio': '/portfolio/de',
  '/about': '/about/de',
  '/contact': '/contact/de',
}
const EN_ROUTES = Object.fromEntries(Object.entries(DE_ROUTES).map(([en, de]) => [de, en]))

const Navbar = ({
  logoAlt = 'Andrew J. Hermann Logo',
  logoSrc = '/ah-logo.png',
  link1 = 'Home',
  link2 = 'Portfolio',
  link3 = 'Blog',
  link5 = 'About',
  link6 = 'Contact',
}) => {
  const location = useLocation()
  const { pathname } = location
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const burgerMenuRef = useRef(null)
  const portfolioDropdownRef = useRef(null)

  // Language routing
  const isDE = pathname in EN_ROUTES
  const enPath = isDE ? EN_ROUTES[pathname] : pathname
  const dePath = isDE ? pathname : (DE_ROUTES[pathname] ?? null)

  // Active state (handles both EN and DE paths)
  const isHomeActive = pathname === '/' || pathname === '/de'
  const isPortfolioActive = ['/portfolio', '/portfolio/de', '/behind-the-site'].includes(pathname)
  const isBlogActive = pathname.startsWith('/blog')
  const isAboutActive = pathname === '/about' || pathname === '/about/de'
  const isContactActive = pathname === '/contact' || pathname === '/contact/de'

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const togglePortfolioDropdown = () => setIsPortfolioDropdownOpen(!isPortfolioDropdownOpen)
  const closePortfolioDropdown = () => setIsPortfolioDropdownOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen &&
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target) &&
          burgerMenuRef.current &&
          !burgerMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (isPortfolioDropdownOpen &&
          portfolioDropdownRef.current &&
          !portfolioDropdownRef.current.contains(event.target)) {
        setIsPortfolioDropdownOpen(false)
      }
    }

    if (isMobileMenuOpen || isPortfolioDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen, isPortfolioDropdownOpen])

  const handleMobileLinkClick = () => setIsMobileMenuOpen(false)

  const LangSwitcher = ({ mobile = false }) => (
    <div className={mobile ? 'navbar-lang-mobile' : 'navbar-lang'}>
      {isDE
        ? <Link to={enPath} className="navbar-lang-link" onClick={mobile ? handleMobileLinkClick : undefined}>EN</Link>
        : <span className="navbar-lang-active">EN</span>}
      <span className="navbar-lang-sep">|</span>
      {isDE
        ? <span className="navbar-lang-active">DE</span>
        : dePath
          ? <Link to={dePath} className="navbar-lang-link" onClick={mobile ? handleMobileLinkClick : undefined}>DE</Link>
          : <span className="navbar-lang-none">DE</span>}
    </div>
  )

  return (
    <header className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <Link to="/">
          <img alt={logoAlt} src={logoSrc} className="navbar-image1" />
        </Link>

        <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
          <nav className="navbar-links1">
            <Link to="/" className={`thq-body-small thq-link ${isHomeActive ? 'active' : ''}`}>
              {link1}
            </Link>

            <div className="navbar-dropdown" ref={portfolioDropdownRef}>
              <button
                className={`thq-body-small thq-link navbar-dropdown-trigger ${isPortfolioActive ? 'active' : ''}`}
                onClick={togglePortfolioDropdown}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePortfolioDropdown() }
                }}
              >
                {link2}
                <svg
                  className={`navbar-dropdown-arrow ${isPortfolioDropdownOpen ? 'navbar-dropdown-arrow-open' : ''}`}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`navbar-dropdown-menu ${isPortfolioDropdownOpen ? 'navbar-dropdown-menu-open' : ''}`}>
                <Link
                  to="/portfolio"
                  className={`navbar-dropdown-item ${pathname === '/portfolio' || pathname === '/portfolio/de' ? 'active' : ''}`}
                  onClick={closePortfolioDropdown}
                >
                  Portfolio
                </Link>
                <Link
                  to="/behind-the-site"
                  className={`navbar-dropdown-item ${pathname === '/behind-the-site' ? 'active' : ''}`}
                  onClick={closePortfolioDropdown}
                >
                  Behind the Site
                </Link>
              </div>
            </div>

            <Link to="/blog" className={`thq-body-small thq-link ${isBlogActive ? 'active' : ''}`}>
              {link3}
            </Link>
            <Link to="/about" className={`thq-body-small thq-link ${isAboutActive ? 'active' : ''}`}>
              {link5}
            </Link>
            <Link to="/contact" className={`thq-body-small thq-link ${isContactActive ? 'active' : ''}`}>
              {link6}
            </Link>
          </nav>

          <LangSwitcher />
        </div>

        <div
          data-thq="thq-burger-menu"
          className="navbar-burger-menu" ref={burgerMenuRef}
          onClick={toggleMobileMenu}
          role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMobileMenu() }}
        >
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>

        <div
          data-thq="thq-mobile-menu"
          className={`navbar-mobile-menu ${isMobileMenuOpen ? 'navbar-mobile-menu-open' : ''}`} ref={mobileMenuRef}
        >
          <div className="navbar-nav">
            <div className="navbar-top">
              <Link to="/" onClick={handleMobileLinkClick}>
                <img alt={logoAlt} src={logoSrc} className="navbar-logo" />
              </Link>
              <div
                data-thq="thq-close-menu"
                className="navbar-close-menu"
                onClick={closeMobileMenu}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeMobileMenu() }}
              >
                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="navbar-links2">
              <Link
                to="/"
                className={`thq-body-small thq-link ${isHomeActive ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {link1}
              </Link>

              <div className="navbar-mobile-section">
                <div className="navbar-mobile-section-header">Portfolio</div>
                <Link
                  to="/portfolio"
                  className={`thq-body-small thq-link navbar-mobile-subsection ${pathname === '/portfolio' || pathname === '/portfolio/de' ? 'active' : ''}`}
                  onClick={handleMobileLinkClick}
                >
                  Portfolio
                </Link>
                <Link
                  to="/behind-the-site"
                  className={`thq-body-small thq-link navbar-mobile-subsection ${pathname === '/behind-the-site' ? 'active' : ''}`}
                  onClick={handleMobileLinkClick}
                >
                  Behind the Site
                </Link>
              </div>

              <Link
                to="/blog"
                className={`thq-body-small thq-link ${isBlogActive ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {link3}
              </Link>
              <Link
                to="/about"
                className={`thq-body-small thq-link ${isAboutActive ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {link5}
              </Link>
              <Link
                to="/contact"
                className={`thq-body-small thq-link ${isContactActive ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {link6}
              </Link>

              <LangSwitcher mobile />
            </nav>
          </div>
        </div>
      </header>
    </header>
  )
}

export default Navbar
