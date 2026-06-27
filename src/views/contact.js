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
import Navbar from '../components/navbar'
import Contact from '../components/contact'
import Footer from '../components/footer'

const ContactPage = () => {
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Andrew J. Hermann",
    "description": "Contact Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces and federal AI governance at the Federal Chancellery.",
    "url": "https://andrew.cloudhopper.ch/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Professional Enquiry",
        "availableLanguage": ["English", "German", "French"]
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
        description="Contact Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces and federal AI governance at the Federal Chancellery."
        keywords="contact Andrew Hermann, AI governance, Swiss federal administration, Federal Chancellery, sovereign AI"
        url="https://andrew.cloudhopper.ch/contact"
        structuredData={contactStructuredData}
        breadcrumbs={contactBreadcrumbs}
      />

      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            If the context is complex and the stakes are institutional, I am available for a conversation.
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
