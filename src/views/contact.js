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

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'

import Navbar from '../components/navbar'
import Contact from '../components/contact'
import Footer from '../components/footer'

const ContactPage = () => {
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
      <PageFloatingRobot bodyColor="#1e3a5f" glowColor="#2563eb" />
      
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            Get in touch for strategic leadership consultation and AI innovation services.
          </p>
        </div>
        
        <div className="content-main">
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  )
}

ContactPage.defaultProps = {}

export default ContactPage
