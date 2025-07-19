import React, { useState } from 'react'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './contact.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/mvggnjva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      setError('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Andrew J. Hermann",
    "description": "Get in touch with Andrew J. Hermann for strategic leadership consultation and AI innovation services",
    "url": "https://andrewhermann.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Professional Services",
        "email": "contact@andrewhermann.com",
        "availableLanguage": ["English"]
      }
    }
  }

  const contactBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Contact", url: "https://andrewhermann.com/contact" }
  ]

  return (
    <div className="contact-container">
      <SEO
        title="Contact"
        description="Get in touch with Andrew J. Hermann for strategic leadership consultation, AI innovation services, and organizational transformation expertise. Professional consultation available."
        keywords="contact Andrew Hermann, consultation, strategic leadership services, AI innovation consultation, organizational transformation, professional services"
        url="https://andrewhermann.com/contact"
        structuredData={contactStructuredData}
        breadcrumbs={contactBreadcrumbs}
      />
      <Navbar />
      <div className="contact-content">
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Let's discuss how strategic leadership and AI innovation can transform your organization
          </p>
        </div>
        
        <div className="contact-body">
          {isSubmitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you for reaching out. I'll get back to you within 24-48 hours to discuss your strategic leadership and innovation needs.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Please describe your project, goals, or questions in detail. Include information about your organization, current challenges, and how you believe strategic leadership or AI innovation could help."
                />
              </div>
              
              {error && <div className="contact-error">{error}</div>}
              
              <button 
                type="submit" 
                className="contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
          
          <div className="contact-info">
            <div className="contact-info-section">
              <h3>Professional Services</h3>
              <ul>
                <li>Strategic Leadership Consultation</li>
                <li>AI Innovation & Implementation</li>
                <li>Organizational Transformation</li>
                <li>Project Portfolio Management</li>
                <li>Digital Transformation Strategy</li>
              </ul>
            </div>
            
            <div className="contact-info-section">
              <h3>Response Time</h3>
              <p>
                I typically respond to inquiries within 24-48 hours. For urgent matters, 
                please indicate the priority level in your message subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactPage
