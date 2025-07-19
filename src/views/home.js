import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import Features2 from '../components/features2'
import Steps from '../components/steps'
import Footer from '../components/footer'
import FloatingRobot from "../components/FloatingRobot"
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Andrew J. Hermann - Strategic Leadership & Innovation</title>
        <meta 
          name="description" 
          content="Andrew J. Hermann - Expert in organizational strategy, AI innovation, and project portfolio management. Transforming complex systems through data-driven leadership." 
        />
        <meta name="keywords" content="Andrew Hermann, strategic leadership, AI innovation, organizational transformation, project management, data-driven decisions" />
        <meta name="author" content="Andrew J. Hermann" />
        
        {/* OpenGraph tags for social sharing */}
        <meta property="og:title" content="Andrew J. Hermann - Strategic Leadership & Innovation" />
        <meta property="og:description" content="Expert in organizational strategy, AI innovation, and project portfolio management. Transforming complex systems through data-driven leadership." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://andrew.cloudhopper.ch" />
        <meta property="og:site_name" content="Andrew J. Hermann" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Andrew J. Hermann - Strategic Leadership & Innovation" />
        <meta name="twitter:description" content="Expert in organizational strategy, AI innovation, and project portfolio management. Transforming complex systems through data-driven leadership." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://andrew.cloudhopper.ch" />
      </Helmet>
      
      <FloatingRobot />
      <Navbar></Navbar>
      
      <div className="home-content">
        <div className="home-hero">
          <div className="home-section">
            <Hero></Hero>
          </div>
        </div>
        
        <div className="home-features1">
          <div className="home-section">
            <Features1
              feature1Title="Strategic Leadership"
              feature2Title="AI Innovation"
              feature3Title="Project Portfolio Management"
              feature1Description="Developing and implementing organizational strategies that drive innovation and operational excellence across complex systems."
              feature2Description="Leveraging artificial intelligence technologies to solve real-world problems in public administration and organizational management."
              feature3Description="Expert management of complex project portfolios, resource allocation, and stakeholder coordination across multiple initiatives."
            ></Features1>
          </div>
        </div>
        
        <div className="home-cta">
          <div className="home-section">
            <CTA></CTA>
          </div>
        </div>
        
        <div className="home-features2">
          <div className="home-section">
            <Features2
              feature1Title="Data-Driven Excellence"
              feature2Title="Innovation Leadership"  
              feature3Title="Organizational Impact"
              feature1Description="Utilizing advanced analytics and data science methodologies to inform strategic decisions and optimize organizational performance."
              feature2Description="Leading transformative initiatives that integrate cutting-edge technology with proven business strategies for sustainable growth."
              feature3Description="Creating measurable impact through systematic approaches to organizational development and process optimization."
            ></Features2>
          </div>
        </div>
        
        <div className="home-steps">
          <div className="home-section">
            <Steps></Steps>
          </div>
        </div>
      </div>

      <Footer content3="© 2025 Andrew J. Hermann. Professional portfolio website."></Footer>
    </div>
  )
}

export default Home
