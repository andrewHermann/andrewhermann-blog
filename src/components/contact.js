import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Contact = (props) => {
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
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        // Hide confirmation after 5 seconds
        setTimeout(() => {
          setShowConfirmation(false)
        }, 5000)
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
    <div className="page-container">
      <div className="page-content">
        {/* Page Header */}
        <div className="page-header">
          <span className="page-subtitle">{props.content2}</span>
          <h1 className="page-title">{props.heading1}</h1>
          <p className="page-description">{props.content1}</p>
        </div>

        <div className="content-main">
          {/* Contact Information Row */}
          <div className="contact-info-grid">
            <div className="shared-card">
              <svg viewBox="0 0 1024 1024" className="contact-icon">
                <path d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
              </svg>
              <div className="contact-info-content">
                <h3>Email</h3>
                <p>{props.content3}</p>
                <span className="contact-detail">{props.email1}</span>
              </div>
            </div>

            <div className="shared-card">
              <svg viewBox="0 0 1024 1024" className="contact-icon">
                <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
              </svg>
              <div className="contact-info-content">
                <h3>Phone</h3>
                <p>{props.content4}</p>
                <span className="contact-detail">{props.phone1}</span>
              </div>
            </div>

            <div className="shared-card">
              <svg viewBox="0 0 1024 1024" className="contact-icon">
                <path d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
              </svg>
              <div className="contact-info-content">
                <h3>Office</h3>
                <p>{props.content5}</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Send me a message</h3>
              <p className="section-description">I'd love to hear from you. Send me a message and I'll respond as soon as possible.</p>
            </div>

            {showConfirmation && (
              <div className="info-card" style={{background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)'}}>
                <svg viewBox="0 0 1024 1024" style={{width: '24px', height: '24px', fill: '#22c55e', marginBottom: '8px'}}>
                  <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                </svg>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your message. I'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitError && (
              <div className="info-card" style={{background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#dc2626'}}>
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
                style={{alignSelf: 'flex-start'}}
              >
                {isSubmitting ? (
                  <>
                    <svg style={{width: '20px', height: '20px', marginRight: '8px', animation: 'spin 1s linear infinite'}} viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="31.416"
                        strokeDashoffset="31.416"
                        style={{animation: 'dash 2s ease-in-out infinite'}}
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Contact.defaultProps = {
  email1: 'cloudhopper@icloud.com',
  heading1: 'Let\'s Connect',
  content4: 'Professional Network',
  content2: 'Get in touch',
  content5: 'Available for consultation and collaboration opportunities.',
  content1:
    "I'm always interested in discussing new opportunities, sharing insights about organizational strategy and AI innovation, or exploring potential collaborations.",
  phone1: '+1-772-202-0009',
  content3: 'Direct communication',
}

Contact.propTypes = {
  email1: PropTypes.string,
  heading1: PropTypes.string,
  content4: PropTypes.string,
  content2: PropTypes.string,
  content5: PropTypes.string,
  content1: PropTypes.string,
  phone1: PropTypes.string,
  content3: PropTypes.string,
}

export default Contact
