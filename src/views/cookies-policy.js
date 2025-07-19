import React from 'react'
import SEO from '../components/seo'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './cookies-policy.css'

const CookiesPolicy = () => {
  const cookiesBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Cookies Policy", url: "https://andrewhermann.com/cookies" }
  ]

  return (
    <div className="cookies-container">
      <SEO
        title="Cookies Policy"
        description="Cookies Policy for Andrew J. Hermann's professional website detailing how cookies and similar technologies are used, with GDPR compliance information."
        keywords="cookies policy, website cookies, tracking technologies, GDPR compliance, cookie consent, data privacy"
        url="https://andrewhermann.com/cookies"
        breadcrumbs={cookiesBreadcrumbs}
      />
      <Navbar />
      <div className="cookies-content">
        <div className="cookies-header">
          <h1 className="cookies-title">Cookies Policy</h1>
          <p className="cookies-subtitle">Last updated: January 19, 2025</p>
        </div>
        
        <div className="cookies-body">
          <section className="cookies-section">
            <h2>1. Introduction</h2>
            <p>
              This Cookies Policy explains how Andrew J. Hermann ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our website andrewhermann.com. It explains what these technologies are and why we use them, as well as your rights to control their use.
            </p>
            <p>
              In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
            </p>
          </section>

          <section className="cookies-section">
            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section className="cookies-section">
            <h2>3. Contact Information</h2>
            <p>
              If you have questions about our use of cookies, please <Link to="/contact" className="contact-link">contact us through our contact form</Link>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CookiesPolicy
