import React from 'react'
import { Link } from 'react-router-dom'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PageFloatingRobot from '../components/PageFloatingRobot'
import './not-found.css'

const NotFound = (props) => {
  return (
    <div className="page-container">
      <SEO
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist. Navigate back to explore Andrew J. Hermann's website."
        keywords="404, page not found, error"
        url="https://andrew.cloudhopper.ch/404"
      />
      
      <PageFloatingRobot bodyColor="#ef4444" glowColor="#f87171" />
      
      <Navbar />
      
      <div className="page-content">
        <div className="content-main">
          <div className="section-card text-center">
            <div className="error-code">404</div>
            <h1 className="page-title">Page Not Found</h1>
            <p className="page-subtitle">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
              <Link to="/about" className="btn btn-secondary">
                About Me
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                Portfolio
              </Link>
            </div>
            
            <div className="helpful-links">
              <h3>You might be looking for:</h3>
              <ul>
                <li><Link to="/blog" className="link-primary">Blog Posts</Link></li>
                <li><Link to="/contact" className="link-primary">Contact Information</Link></li>
                <li><Link to="/markets" className="link-primary">Market Data</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default NotFound
