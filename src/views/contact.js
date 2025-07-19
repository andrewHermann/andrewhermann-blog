import React from 'react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './contact.css'

const ContactPage = (props) => {
  return (
    <div className="contact-page-container">
      <Helmet>
        <title>Contact - Andrew J. Hermann</title>
        <meta 
          name="description" 
          content="Get in touch with Andrew J. Hermann for consultations, collaborations, or inquiries about organizational strategy and AI innovation." 
        />
        <meta name="keywords" content="contact Andrew Hermann, consultation, collaboration, organizational strategy, AI innovation" />
        
        {/* OpenGraph tags for social sharing */}
        <meta property="og:title" content="Contact - Andrew J. Hermann" />
        <meta property="og:description" content="Get in touch with Andrew J. Hermann for consultations, collaborations, or inquiries about organizational strategy and AI innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andrew.cloudhopper.ch/contact" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact - Andrew J. Hermann" />
        <meta name="twitter:description" content="Get in touch with Andrew J. Hermann for consultations, collaborations, or inquiries." />
      </Helmet>
      
      <Navbar />
      
      <div className="contact-page-content">
        <Contact
          email1="cloudhopper@icloud.com"
          phone1="+1-772-202-0009"
          content4="Connect on LinkedIn"
          heading1="Get In Touch"
          content1="I'm always interested in discussing new opportunities, sharing insights about organizational strategy and AI innovation, or exploring potential collaborations. Let's connect!"
          content2="Ready to connect?"
          content3="Direct communication"
          content5="Available for consultation and collaboration opportunities."
        />
      </div>

      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website." />
    </div>
  )
}

export default ContactPage
