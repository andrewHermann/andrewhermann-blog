import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cookie-consent.css'

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookieConsent')
    if (!consentStatus) {
      // Show banner after a short delay to ensure page has loaded
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
    
    // Initialize analytics and other non-essential cookies
    initializeAnalytics()
  }

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
    
    // Only essential cookies, no analytics
    console.log('Only essential cookies accepted')
  }

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        <div className="cookie-consent-content">
          <div className="cookie-consent-header">
            <h3>We use cookies</h3>
            <button 
              className="cookie-consent-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close cookie banner"
            >
              ×
            </button>
          </div>
          
          <div className="cookie-consent-body">
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
            
            {showDetails && (
              <div className="cookie-consent-details">
                <h4>Cookie Categories:</h4>
                <div className="cookie-category">
                  <strong>Essential Cookies (Always Active)</strong>
                  <p>These cookies are necessary for the website to function and cannot be switched off.</p>
                </div>
                <div className="cookie-category">
                  <strong>Analytics Cookies</strong>
                  <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                </div>
                <div className="cookie-category">
                  <strong>Functional Cookies</strong>
                  <p>These cookies enable the website to provide enhanced functionality and personalization.</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="cookie-consent-actions">
            <button
              className="cookie-consent-btn cookie-consent-btn-secondary"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            
            <div className="cookie-consent-buttons">
              <button
                className="cookie-consent-btn cookie-consent-btn-outline"
                onClick={handleAcceptEssential}
              >
                Essential Only
              </button>
              <button
                className="cookie-consent-btn cookie-consent-btn-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
          
          <div className="cookie-consent-footer">
            <p>
              Learn more in our <Link to="/cookies" className="cookie-consent-link">Cookie Policy</Link> and <Link to="/privacy" className="cookie-consent-link">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
