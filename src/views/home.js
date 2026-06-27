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

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import WhatIDo from '../components/what-i-do'
import CTA from '../components/cta'
import Steps from '../components/steps'
import Footer from '../components/footer'
import './home.css'

const Home = () => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Andrew J. Hermann",
    "description": "Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces and federal AI governance at the Federal Chancellery.",
    "url": "https://andrew.cloudhopper.ch",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Project Manager, AI Platform, Swiss Armed Forces",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Project Manager"
      }
    },
    "about": [
      { "@type": "Thing", "name": "AI Governance" },
      { "@type": "Thing", "name": "Sovereign AI Platforms" },
      { "@type": "Thing", "name": "Federal AI Policy" },
      { "@type": "Thing", "name": "Project Portfolio Management" }
    ]
  }

  const homeBreadcrumbs = [
    { name: "Home", url: "https://andrew.cloudhopper.ch" }
  ]

  return (
    <div className="page-container">
      <SEO
        title=""
        description="Andrew J. Hermann — AI platform leadership within the Swiss Armed Forces and federal AI governance at the Federal Chancellery."
        keywords="Andrew Hermann, AI governance, Swiss Armed Forces, Federal Chancellery, sovereign AI, institutional AI, project management, Switzerland"
        url="https://andrew.cloudhopper.ch"
        structuredData={homeStructuredData}
        breadcrumbs={homeBreadcrumbs}
      />
      <Navbar />

      <Hero />

      <div className="home-sections">
        <section className="home-section">
          <WhatIDo />
        </section>

        <section className="home-section home-section-tinted">
          <CTA />
        </section>

        <section className="home-section">
          <Steps />
        </section>
      </div>

      <Footer />
    </div>
  )
}

Home.defaultProps = {}

export default Home
