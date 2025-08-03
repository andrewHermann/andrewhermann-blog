import React from 'react'
import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'

import Navbar from '../components/navbar'
import Contact from '../components/contact'
import Footer from '../components/footer'

const ContactPage = (props) => {
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Andrew J. Hermann",
    "description": "Get in touch with Andrew J. Hermann for strategic leadership consultation and AI innovation services",
    "url": "https://andrew.cloudhopper.ch/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Professional Services",
        "availableLanguage": ["English"]
      }
    }
  }

  const contactBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" },
    { name: "Contact", url: "https://andrew.cloudhopper.ch/contact" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="Contact"
        description="Get in touch with Andrew J. Hermann for strategic leadership consultation, AI innovation services, and organizational transformation expertise. Professional consultation available."
        keywords="contact Andrew Hermann, consultation, strategic leadership services, AI innovation consultation, organizational transformation, professional services"
        url="https://andrew.cloudhopper.ch/contact"
        structuredData={contactStructuredData}
        breadcrumbs={contactBreadcrumbs}
      />
      
      {/* Floating Robot with red/rose body color */}
      <PageFloatingRobot bodyColor="#e11d48" glowColor="#f43f5e" />
      
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            Get in touch for strategic leadership consultation and AI innovation services.
          </p>
        </div>
        
        <div className="content-main">
          <div className="section-card">
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

ContactPage.defaultProps = {}

export default ContactPage
