import React from 'react'

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './portfolio.css'

const Portfolio = (props) => {
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Portfolio",
    "description": "Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, AI innovation, and project management",
    "url": "https://andrewhermann.com/portfolio"
  }

  const portfolioBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Portfolio", url: "https://andrewhermann.com/portfolio" }
  ]

  return (
    <div className="portfolio-container">
      <SEO
        title="Professional Portfolio"
        description="View Andrew J. Hermann's professional portfolio showcasing expertise in organizational strategy, project portfolio management, AI innovation, and digital transformation. Discover successful projects and strategic initiatives."
        keywords="portfolio, projects, case studies, organizational strategy, AI innovation, project management, digital transformation, strategic planning"
        url="https://andrewhermann.com/portfolio"
        structuredData={portfolioStructuredData}
        breadcrumbs={portfolioBreadcrumbs}
      />
      
      {/* Floating Robot with purple/violet body color */}
      <PageFloatingRobot bodyColor="#7c3aed" glowColor="#a78bfa" />
      
      <Navbar></Navbar>
      
      <div className="portfolio-content">
        <div className="portfolio-header">
          <h1 className="portfolio-title">Professional Portfolio</h1>
          <p className="portfolio-subtitle">
            Showcasing my expertise in organizational strategy, project portfolio management, 
            data-driven decision-making, and applied artificial intelligence.
          </p>
        </div>
        
        <div className="portfolio-main">
          <div className="portfolio-sections-grid">
            <div className="portfolio-section">
              <h2>KI@V – Conversational AI for the Swiss Armed Forces (2023–2025)</h2>
              <p>
                Leading the development and implementation of conversational artificial intelligence systems 
                for defense applications. This project involves designing AI-driven communication and 
                decision-support tools that enhance operational effectiveness while maintaining strict 
                security and privacy standards required for defense environments.
              </p>
              <h3>Key Responsibilities & Achievements:</h3>
              <ul>
                <li>Strategic planning and architectural design for AI systems in defense contexts</li>
                <li>Cross-functional team leadership across technical and operational domains</li>
                <li>Stakeholder management and requirement gathering from military leadership</li>
                <li>Implementation of AI governance frameworks ensuring compliance with security protocols</li>
                <li>Development of training and adoption strategies for end-user acceptance</li>
              </ul>
            </div>

            <div className="portfolio-section">
              <h2>Digital Transformation & Project Portfolio Management</h2>
              <p>
                Extensive experience in leading large-scale digital transformation initiatives across 
                public sector organizations. Specialized in establishing project portfolio management 
                frameworks that align strategic objectives with operational delivery.
              </p>
              <h3>Core Competencies:</h3>
              <ul>
                <li>Strategic portfolio planning and resource allocation optimization</li>
                <li>Agile and traditional project management methodologies</li>
                <li>Change management and organizational development</li>
                <li>Stakeholder engagement and communication strategies</li>
                <li>Performance measurement and continuous improvement processes</li>
              </ul>
            </div>

            <div className="portfolio-section">
              <h2>Data-Driven Decision Making & Analytics</h2>
              <p>
                Proven track record in implementing data analytics frameworks that transform 
                organizational decision-making processes. Expertise in developing metrics, 
                KPIs, and dashboard solutions that provide actionable insights for leadership.
              </p>
              <h3>Technical & Strategic Skills:</h3>
              <ul>
                <li>Business intelligence and analytics platform implementation</li>
                <li>Data governance and quality management frameworks</li>
                <li>Predictive modeling and trend analysis for strategic planning</li>
                <li>Dashboard and reporting solution design</li>
                <li>Training and capability building for data-driven cultures</li>
              </ul>
            </div>

            <div className="portfolio-section">
              <h2>Public Administration & Policy Implementation</h2>
              <p>
                Deep understanding of public sector challenges with specialized expertise in 
                policy implementation, regulatory compliance, and citizen service delivery 
                optimization. Experience working with multiple levels of government and 
                international organizations.
              </p>
              <h3>Areas of Impact:</h3>
              <ul>
                <li>Policy development and implementation strategy</li>
                <li>Regulatory compliance and risk management</li>
                <li>Citizen service digitalization and improvement</li>
                <li>Inter-agency collaboration and coordination</li>
                <li>Public-private partnership development and management</li>
              </ul>
            </div>

            <div className="portfolio-section">
              <h2>AI Strategy & Innovation Leadership</h2>
              <p>
                Strategic leadership in artificial intelligence adoption across organizations, 
                with focus on practical implementation, ethical considerations, and measurable 
                business outcomes. Experience bridging technical possibilities with strategic 
                organizational needs.
              </p>
              <h3>Innovation Focus Areas:</h3>
              <ul>
                <li>AI strategy development and roadmap planning</li>
                <li>Ethical AI framework design and implementation</li>
                <li>Machine learning and automation solution deployment</li>
                <li>AI governance and risk management</li>
                <li>Organizational capability building for AI adoption</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  )
}

Portfolio.defaultProps = {}

export default Portfolio
