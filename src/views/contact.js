import React from 'react'
import SEO from '../components/seo'

import Navbar from '../components/navbar'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './contact.css'

const ContactPage = (props) => {
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Andrew J. Hermann",
    "description": "Get in touch with Andrew J. Hermann for strategic leadership consultation and AI innovation services",
    "url": "https://***REMOVED***/contact",
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
    { name: "Home", url: "https://***REMOVED***" },
    { name: "Contact", url: "https://***REMOVED***/contact" }
  ]

  return (
    <div className="contact-page-container">
      <SEO
        title="Contact"
        description="Get in touch with Andrew J. Hermann for strategic leadership consultation, AI innovation services, and organizational transformation expertise. Professional consultation available."
        keywords="contact Andrew Hermann, consultation, strategic leadership services, AI innovation consultation, organizational transformation, professional services"
        url="https://***REMOVED***/contact"
        structuredData={contactStructuredData}
        breadcrumbs={contactBreadcrumbs}
      />
      <Navbar />
      <Contact />
      <Footer />
    </div>
  )
}

ContactPage.defaultProps = {}

export default ContactPage
