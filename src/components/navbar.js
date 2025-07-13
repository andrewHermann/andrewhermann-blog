import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navbar.css'

const Navbar = (props) => {
  const location = useLocation()
  
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
            <Link to="/about" className={`thq-body-small thq-link ${location.pathname === '/about' ? 'active' : ''}`}>
              {props.link4}
            </Link>
            <span className="thq-body-small thq-link">{props.link5}</span>
          </nav>
        </div>
        <div data-thq="thq-burger-menu" className="navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="navbar-mobile-menu">
          <div className="navbar-nav">
            <div className="navbar-top">
              <Link to="/">
                <img
                  alt={props.logoAlt}
                  src={props.logoSrc}
                  className="navbar-logo"
                />
              </Link>
              <div data-thq="thq-close-menu" className="navbar-close-menu">
                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="navbar-links2">
              <Link to="/" className={`thq-body-small thq-link ${location.pathname === '/' ? 'active' : ''}`}>
                {props.link1}
              </Link>
              <Link to="/portfolio" className={`thq-body-small thq-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>
                {props.link2}
              </Link>
              <Link to="/blog" className={`thq-body-small thq-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
                {props.link3}
              </Link>
              <Link to="/about" className={`thq-body-small thq-link ${location.pathname === '/about' ? 'active' : ''}`}>
                {props.link4}
              </Link>
              <span className="thq-body-small thq-link">{props.link5}</span>
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
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
  link3: 'Blog',
  link5: 'Contact',
  link2: 'Portfolio',
  link4: 'About',
  link1: 'Home',
}

Navbar.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link3: PropTypes.string,
  link5: PropTypes.string,
  link2: PropTypes.string,
  link4: PropTypes.string,
  link1: PropTypes.string,
}

export default Navbar
