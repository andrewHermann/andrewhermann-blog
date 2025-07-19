import React from 'react'
import SEO from '../components/seo'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './privacy-policy.css'

const PrivacyPolicy = () => {
  const privacyBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Privacy Policy", url: "https://andrewhermann.com/privacy" }
  ]

  return (
    <div className="privacy-container">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Andrew J. Hermann's professional website describing how we collect, use, and protect your personal information in compliance with data protection regulations."
        keywords="privacy policy, data protection, personal information, GDPR compliance, data privacy, information security"
        url="https://andrewhermann.com/privacy"
        breadcrumbs={privacyBreadcrumbs}
      />
      <Navbar />
      <div className="privacy-content">
        <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">Last updated: January 19, 2025</p>
        </div>
        
        <div className="privacy-body">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Andrew J. Hermann ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website andrewhermann.com.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please <Link to="/contact" className="contact-link">contact us through our contact form</Link>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
