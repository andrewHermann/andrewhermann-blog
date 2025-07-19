import React from 'react'

import SEO from '../components/seo'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './about.css'

const About = (props) => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Andrew J. Hermann",
    "description": "Learn about Andrew J. Hermann's background, expertise, and approach to strategic leadership and AI innovation",
    "url": "https://***REMOVED***/about",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Strategic Leadership & AI Innovation Expert",
      "description": "Expert in organizational strategy, project portfolio management, and applied artificial intelligence",
      "knowsAbout": [
        "Strategic Leadership",
        "Organizational Strategy", 
        "Artificial Intelligence",
        "Project Portfolio Management",
        "Digital Transformation",
        "Data-Driven Decision Making",
        "Public Administration"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Strategic Leadership Consultant",
        "occupationLocation": {
          "@type": "Country",
          "name": "Switzerland"
        }
      }
    }
  }

  const aboutBreadcrumbs = [
    { name: "Home", url: "https://***REMOVED***" },
    { name: "About", url: "https://***REMOVED***/about" }
  ]

  return (
    <div className="about-container">
      <SEO
        title="About"
        description="Learn about Andrew J. Hermann's background, expertise in strategic leadership, AI innovation, and approach to organizational transformation. Discover his professional journey and core competencies."
        keywords="about Andrew Hermann, background, expertise, strategic leadership, AI innovation, professional experience, qualifications, organizational transformation"
        url="https://***REMOVED***/about"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />
      <Navbar />
      <div className="about-content">
        <div className="about-header">
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">
            A structural account of how I work, what I've done, and what that reveals about the systems I build.
          </p>
        </div>
        
        <div className="about-main">
          <div className="about-section">
            <h2>Early Foundation</h2>
            <p>My relationship with technology began in 1984, when I was introduced to BASIC programming on an MSX machine during primary school. Within weeks, I had written a functioning game, not because it was required, but because the logic was accessible and the feedback was immediate. It was my first encounter with structured systems, and it set the tone for everything that followed.</p>
          </div>

          <div className="about-section">
            <h2>Professional Journey</h2>
            <p>My career has traversed multiple domains, including public administration, artificial intelligence, and strategic leadership. I've led teams of talented professionals, delivered comprehensive projects, and facilitated strategic change within complex organizational structures.</p>
          </div>

          <div className="about-section">
            <h2>Core Competencies</h2>
            <ul>
              <li>Strategic Leadership</li>
              <li>AI Innovation</li>
              <li>Project Portfolio Management</li>
              <li>Organizational Transformation</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Personal Philosophy</h2>
            <p>I believe that technology should empower humans to achieve more, not replace them. My work is guided by a commitment to ethical practices, transparency, and a passion for lifelong learning.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

About.defaultProps = {}

export default About
