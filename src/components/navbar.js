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


import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navbar.css'

const Navbar = (props) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef(null)
  const burgerMenuRef = useRef(null)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  // Close mobile menu when clicking on a link
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          burgerMenuRef.current &&
          !burgerMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }
  
  return (
    <header className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <Link to="/">
          <img
            alt={props.logoAlt}
            src={props.logoSrc}
            className="navbar-image1"
          />
        </Link>
        <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
          <nav className="navbar-links1">
            <Link to="/" className={`thq-body-small thq-link ${location.pathname === '/' ? 'active' : ''}`}>
              {props.link1}
            </Link>
            <Link to="/portfolio" className={`thq-body-small thq-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>
              {props.link2}
            </Link>
            <Link to="/blog" className={`thq-body-small thq-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
              {props.link3}
            </Link>
            <Link to="/markets" className={`thq-body-small thq-link ${location.pathname === '/markets' ? 'active' : ''}`}>
              {props.link4}
            </Link>
            <Link to="/about" className={`thq-body-small thq-link ${location.pathname === '/about' ? 'active' : ''}`}>
              {props.link5}
            </Link>
            <Link to="/contact" className={`thq-body-small thq-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              {props.link6}
            </Link>
          </nav>
        </div>
        <div 
          data-thq="thq-burger-menu" 
          className="navbar-burger-menu" ref={burgerMenuRef}
          onClick={toggleMobileMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              toggleMobileMenu()
            }
          }}
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
                <img
                  alt={props.logoAlt}
                  src={props.logoSrc}
                  className="navbar-logo"
                />
              </Link>
              <div 
                data-thq="thq-close-menu" 
                className="navbar-close-menu"
                onClick={closeMobileMenu}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    closeMobileMenu()
                  }
                }}
              >
                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="navbar-links2">
              <Link 
                to="/" 
                className={`thq-body-small thq-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link1}
              </Link>
              <Link 
                to="/portfolio" 
                className={`thq-body-small thq-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link2}
              </Link>
              <Link 
                to="/blog" 
                className={`thq-body-small thq-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link3}
              </Link>
              <Link 
                to="/markets" 
                className={`thq-body-small thq-link ${location.pathname === '/markets' ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link4}
              </Link>
              <Link 
                to="/about" 
                className={`thq-body-small thq-link ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link5}
              </Link>
              <Link 
                to="/contact" 
                className={`thq-body-small thq-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {props.link6}
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </header>
  )
}

Navbar.defaultProps = {
  logoAlt: 'Andrew J. Hermann Logo',
  logoSrc:
    '/ah-logo.png',
  link3: 'Blog',
  link6: 'Contact',
  link2: 'Portfolio',
  link4: 'Markets',
  link5: 'About',
  link1: 'Home',
}

Navbar.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link3: PropTypes.string,
  link6: PropTypes.string,
  link2: PropTypes.string,
  link4: PropTypes.string,
  link5: PropTypes.string,
  link1: PropTypes.string,
}

export default Navbar
