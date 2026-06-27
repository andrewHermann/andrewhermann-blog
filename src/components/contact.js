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

import { useState } from 'react'

const Contact = ({ email1 = 'cloudhopper@icloud.com' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('https://formspree.io/f/xanbnrla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowConfirmation(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setShowConfirmation(false), 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setSubmitError('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-wrapper">
      {/* Contact info cards */}
      <div className="contact-info-grid">
        <div className="shared-card contact-info-card">
          <svg viewBox="0 0 1024 1024" className="contact-icon">
            <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z" />
          </svg>
          <div className="contact-info-content">
            <h3>Email</h3>
            <span className="contact-detail">{email1}</span>
          </div>
        </div>

        <div className="shared-card contact-info-card">
          <svg viewBox="0 0 1024 1024" className="contact-icon">
            <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z" />
          </svg>
          <div className="contact-info-content">
            <h3>Location</h3>
            <span className="contact-detail">Bern, Switzerland</span>
          </div>
        </div>

        <div className="shared-card contact-info-card">
          <svg viewBox="0 0 1024 1024" className="contact-icon">
            <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z" />
          </svg>
          <div className="contact-info-content">
            <h3>Languages</h3>
            <span className="contact-detail">German · French · English</span>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="section-card">
        <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-xl)', fontSize: 'var(--font-size-xl)', fontWeight: 600 }}>
          Send me a message
        </h3>

        {showConfirmation && (
          <div className="info-card" style={{ background: 'rgba(34, 197, 94, 0.08)', borderColor: 'rgba(34, 197, 94, 0.25)', marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ color: '#16a34a' }}>Message Sent!</h3>
            <p>Thank you. I&apos;ll get back to you as soon as possible.</p>
          </div>
        )}

        {submitError && (
          <div className="info-card" style={{ background: 'rgba(239, 68, 68, 0.08)', borderColor: 'rgba(239, 68, 68, 0.25)', color: '#dc2626', marginBottom: 'var(--space-lg)' }}>
            <p>{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="form-textarea"
              placeholder="Your message here..."
              rows="6"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg"
            style={{ alignSelf: 'flex-start' }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
