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


import React from 'react'
import { useNavigate } from 'react-router-dom'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import WhatIDo from '../components/what-i-do'
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
    "url": "https://andrew.cloudhopper.ch",
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
    { name: "Home", url: "https://andrew.cloudhopper.ch" }
  ]

  return (
    <div className="page-container">
      <SEO
        title=""
        description="Andrew J. Hermann specializes in organizational strategy, project portfolio management, data-driven decision-making, and applied artificial intelligence. Transform your organization with strategic leadership expertise."
        keywords="strategic leadership, AI innovation, digital transformation, organizational strategy, project portfolio management, data-driven decisions"
        url="https://andrew.cloudhopper.ch"
        structuredData={homeStructuredData}
        breadcrumbs={homeBreadcrumbs}
      />
      <Navbar />
      
      {/* Hero Section - Full viewport height */}
      <Hero />
      
      <div className="page-content">
        <div className="card-grid">
          {/* What I Do Section - First in grid */}
          <div className="section-card">
            <WhatIDo />
          </div>

          {/* Professional Portfolio section */}
          <div className="section-card">
            <Features1 />
          </div>

          {/* Core Competencies section */}
          <div className="section-card">
            <CTA />
          </div>

          {/* Features section */}
          <div className="section-card">
            <Features2 />
          </div>

          {/* My Approach section */}
          <div className="section-card">
            <Steps />
          </div>
        </div>
      </div>

      <Footer />
      <PageFloatingRobot bodyColor="#1e40af" glowColor="#3b82f6" />
    </div>
  )
}

Home.defaultProps = {}

export default Home
