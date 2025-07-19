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
    <div className="about-container">
      <SEO
        title="About"
        description="Learn about Andrew J. Hermann's background, expertise in strategic leadership, AI innovation, and approach to organizational transformation. Discover his professional journey and core competencies."
        keywords="about Andrew Hermann, background, expertise, strategic leadership, AI innovation, professional experience, qualifications, organizational transformation"
        url="https://andrewhermann.com/about"
        structuredData={aboutStructuredData}
        breadcrumbs={aboutBreadcrumbs}
      />
      <Navbar />
      <div className="about-content">
        <div className="about-header">
          <h1 className="about-title">About Andrew J. Hermann</h1>
          <p className="about-subtitle">
            Strategic Leadership & AI Innovation Expert
          </p>
        </div>
        
        <div className="about-body">
          <section className="about-section">
            <h2>Professional Overview</h2>
            <p>
              Andrew J. Hermann is a distinguished expert in strategic leadership and artificial intelligence innovation, specializing in organizational strategy, project portfolio management, and data-driven decision-making. With extensive experience in public administration and digital transformation, Andrew brings a unique blend of strategic vision and technical expertise to complex organizational challenges.
            </p>
            <p>
              His approach combines proven leadership methodologies with cutting-edge AI technologies to drive sustainable organizational change and measurable business outcomes. Andrew's work focuses on bridging the gap between strategic vision and practical implementation, ensuring that organizations can effectively navigate the complexities of modern digital transformation.
            </p>
          </section>

          <section className="about-section">
            <h2>Core Competencies</h2>
            <div className="competencies-grid">
              <div className="competency-card">
                <h3>Strategic Leadership</h3>
                <p>Developing and executing comprehensive organizational strategies that align vision with operational excellence.</p>
              </div>
              <div className="competency-card">
                <h3>AI Innovation</h3>
                <p>Implementing artificial intelligence solutions to enhance decision-making processes and operational efficiency.</p>
              </div>
              <div className="competency-card">
                <h3>Project Portfolio Management</h3>
                <p>Establishing frameworks for effective project governance, resource allocation, and strategic alignment.</p>
              </div>
              <div className="competency-card">
                <h3>Digital Transformation</h3>
                <p>Leading organization-wide initiatives to modernize processes and leverage emerging technologies.</p>
              </div>
              <div className="competency-card">
                <h3>Data-Driven Decision Making</h3>
                <p>Creating analytics frameworks that transform data into actionable strategic insights.</p>
              </div>
              <div className="competency-card">
                <h3>Public Administration</h3>
                <p>Specialized expertise in public sector challenges, governance, and citizen service delivery.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Approach & Philosophy</h2>
            <p>
              Andrew's methodology is rooted in the belief that successful organizational transformation requires a careful balance of strategic vision, technological innovation, and human-centered change management. He emphasizes collaborative leadership, data-informed decision-making, and sustainable implementation practices.
            </p>
            <p>
              His work is characterized by a commitment to measurable outcomes, stakeholder engagement, and the integration of emerging technologies with established organizational processes. Andrew believes that artificial intelligence and strategic leadership, when properly combined, can unlock unprecedented levels of organizational effectiveness and innovation.
            </p>
          </section>

          <section className="about-section">
            <h2>Professional Focus Areas</h2>
            <ul className="focus-areas">
              <li><strong>Organizational Strategy:</strong> Developing comprehensive strategic frameworks that align organizational capabilities with market opportunities and stakeholder expectations.</li>
              <li><strong>AI Implementation:</strong> Designing and deploying artificial intelligence solutions that enhance operational efficiency and decision-making capabilities.</li>
              <li><strong>Change Management:</strong> Leading transformational initiatives that ensure successful adoption of new processes, technologies, and organizational structures.</li>
              <li><strong>Performance Optimization:</strong> Creating measurement systems and continuous improvement processes that drive sustained organizational excellence.</li>
              <li><strong>Stakeholder Engagement:</strong> Building consensus and commitment across diverse stakeholder groups through effective communication and collaborative decision-making.</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

About.defaultProps = {}

export default About
