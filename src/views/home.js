import React from 'react'
import { useNavigate } from 'react-router-dom'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import Features2 from '../components/features2'
import Steps from '../components/steps'
import Footer from '../components/footer'
import PageFloatingRobot from "../components/PageFloatingRobot"
import './home.css'

const Home = (props) => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Strategic Leadership & AI Innovation Expert",
    "description": "Andrew J. Hermann specializes in organizational strategy, project portfolio management, and AI innovation",
    "url": "https://***REMOVED***",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Strategic Leadership & AI Innovation Expert",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Strategic Leadership Consultant"
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Strategic Leadership"
      },
      {
        "@type": "Thing", 
        "name": "Artificial Intelligence"
      },
      {
        "@type": "Thing",
        "name": "Project Portfolio Management"
      },
      {
        "@type": "Thing",
        "name": "Digital Transformation"
      }
    ]
  }

  const homeBreadcrumbs = [
    { name: "Home", url: "https://***REMOVED***" }
  ]

  return (
    <div className="home-container">
      <SEO
        title=""
        description="Andrew J. Hermann specializes in organizational strategy, project portfolio management, data-driven decision-making, and applied artificial intelligence. Transform your organization with strategic leadership expertise."
        keywords="strategic leadership, AI innovation, digital transformation, organizational strategy, project portfolio management, data-driven decisions"
        url="https://***REMOVED***"
        structuredData={homeStructuredData}
        breadcrumbs={homeBreadcrumbs}
      />
      <Navbar />
      
      <div className="home-content">
        {/* Hero section - no frame */}
        <div className="home-hero">
          <Hero />
        </div>

        {/* Professional Portfolio section - framed */}
        <div className="home-section-frame">
          <Features1 />
        </div>

        {/* Core Competencies section - framed */}
        <div className="home-section-frame">
          <CTA />
        </div>

        {/* Features section - framed */}
        <div className="home-section-frame">
          <Features2 />
        </div>

        {/* My Approach section - framed */}
        <div className="home-section-frame">
          <Steps />
        </div>
      </div>

      <Footer />
      <PageFloatingRobot bodyColor="#1e40af" glowColor="#3b82f6" />
    </div>
  )
}

Home.defaultProps = {}

export default Home
