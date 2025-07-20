import React from 'react'

import SEO from '../components/seo'
import PageFloatingRobot from '../components/PageFloatingRobot'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './about.css'

const About = (props) => {
  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Andrew J. Hermann",
    "description": "Learn about Andrew J. Hermann's background, expertise, and approach to strategic leadership and AI innovation",
    "url": "https://andrewhermann.com/about",
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
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "About", url: "https://andrewhermann.com/about" }
  ]

  return (
    <div className="page-container">
      <SEO
        title="About"
        description="Learn about Andrew J. Hermann's background, expertise in strategic leadership, AI innovation, and approach to organizational transformation. Discover his professional journey and core competencies."
        keywords="about Andrew Hermann, background, expertise, strategic leadership, AI innovation, professional experience, qualifications, organizational transformation"
        url="https://andrewhermann.com/about"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />
      
      {/* Floating Robot with blue/sky body color */}
      <PageFloatingRobot bodyColor="#06b6d4" glowColor="#67e8f9" />
      
      <Navbar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">
            A structural account of how I work, what I've done, and what that reveals about the systems I build.
          </p>
        </div>
        
        <div className="content-main card-grid-compact">
          <div className="section-card">
            <h2>Early Foundation</h2>
            <p>My relationship with technology began in 1984, when I was introduced to BASIC programming on an MSX machine during primary school. Within weeks, I had written a functioning game, not because it was required, but because the logic was accessible and the feedback was immediate. It was my first encounter with structured systems, and it set the tone for everything that followed.</p>
            
            <p>In the years that followed, I expanded my focus far beyond programming. I built and maintained my own hardware, set up small networks, and began developing systems using Oracle Forms and relational databases. By the time I was in my teens, I had independently introduced myself to Linux, UNIX, HP-UX, and Solaris, navigating these operating systems out of pure interest in how real-world, enterprise-grade systems functioned beneath the surface.</p>
            
            <p>I wasn't collecting certificates. I was gaining fluency in systems—how they behave under load, how they fail, and how they can be made resilient. That foundational knowledge, acquired outside any formal structure, continues to inform my approach to infrastructure, data management, and digital governance to this day.</p>
          </div>
          
          <div className="section-card">
            <h2>Professional Trajectory</h2>
            <p>Today, I work within the Swiss federal administration, currently in the Armed Forces, where I manage cross-functional digital projects under institutional and security constraints. I lead initiatives involving AI deployment, enterprise reporting, and system lifecycle governance. All designed to function in real-world, non-ideal conditions.</p>
            
            <p>I created and led the Cockpit platform, a federated Power BI system now used across several divisions for project portfolio oversight. I also initiated and currently manage KI@V, a secure conversational AI tool tailored for administrative workflows in classified domains. Both projects required not just technical execution, but strategic alignment across fragmented institutions with differing mandates and priorities.</p>
            
            <p>Earlier in my career, I co-led the implementation of the TTR (Timetable Redesign) initiative in the European rail sector, coordinating 150+ stakeholders and establishing cross-border governance and funding structures between Forum Train Europe and RailNetEurope. I operated in politically sensitive contexts, often without formal mandate but with measurable outcomes.</p>
          </div>
          
          <div className="section-card">
            <h2>Working Philosophy</h2>
            <p>I approach systems with a mix of pragmatism and skepticism. I don't deploy technology for its own sake. I look for failure points, simplify where possible, and design for longevity. Many of the environments I work in lack clean interfaces, current documentation, or ideal preconditions. That doesn't obstruct the work. It defines its boundaries.</p>
            
            <p>I build tools and platforms that can be maintained, understood, and handed off without risk. I avoid vendor lock-in, resist premature optimization, and consider legacy not as a burden, but as a constraint to be respected and navigated. I am not interested in fashionable abstractions. I work on what matters operationally, and I build to institutional scale.</p>
            
            <p>Privately, I continue to maintain my own infrastructure and test new tools on controlled systems. I prefer open-source technology, minimal surface area, and components that fail transparently. I maintain the same standards for private experimentation as I do for public-sector architecture: lean, legible, and reliable.</p>
          </div>
          
          <div className="section-card">
            <h2>Core Competencies</h2>
            <div className="competency-list">
              <p><strong>System Architecture & Lifecycle Management</strong> – Designing long-term viable systems across heterogeneous platforms and institutional structures.</p>
              
              <p><strong>Data Infrastructure & Reporting</strong> – Implementing multi-source analytics platforms with a focus on strategic governance and decision-making.</p>
              
              <p><strong>Secure AI Integration</strong> – Leading low-risk, high-value AI applications tailored to real administrative workflows in regulated domains.</p>
              
              <p><strong>Cross-Domain Leadership</strong> – Bridging technical, legal, and organizational silos across defense, transportation, and public administration.</p>
              
              <p><strong>Legacy System Integration</strong> – Working with what exists—databases, platforms, and processes—to extract value without disruption.</p>
            </div>
          </div>
          
          <div className="section-card">
            <h2>Languages & Context</h2>
            <p>I live and work in Bern, Switzerland, and operate fluently in German, English, and French, depending on the situation. I am fully embedded in the operational realities of the Swiss public sector, including its legal frameworks, procurement regimes, and federated governance. I understand the difference between strategic ambition and institutional bandwidth and how to move one in the direction of the other.</p>
          </div>
          
          <div className="section-card">
            <h2>Final Note</h2>
            <p><em>This is not a résumé. It's a structural account of how I work, what I've done, and what that reveals about the systems I build. I don't aim to disrupt. I aim to stabilize quietly, precisely, and at scale.</em></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

About.defaultProps = {}

export default About
