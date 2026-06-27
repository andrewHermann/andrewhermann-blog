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

const HomeDe = () => {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Andrew J. Hermann",
    "description": "Andrew J. Hermann — KI-Plattformleitung in der Schweizer Armee und KI-Governance auf Ebene der Bundeskanzlei.",
    "url": "https://andrew.cloudhopper.ch/de",
    "mainEntity": {
      "@type": "Person",
      "name": "Andrew J. Hermann",
      "jobTitle": "Projektleiter, KI-Plattform, Schweizer Armee",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Projektleiter"
      }
    },
    "about": [
      { "@type": "Thing", "name": "KI-Governance" },
      { "@type": "Thing", "name": "Souveräne KI-Plattformen" },
      { "@type": "Thing", "name": "Bundesweite KI-Politik" },
      { "@type": "Thing", "name": "Projektportfolio-Management" }
    ]
  }

  const homeBreadcrumbs = [
    { name: "Startseite", url: "https://andrew.cloudhopper.ch/de" }
  ]

  return (
    <div className="page-container">
      <SEO
        title=""
        description="Andrew J. Hermann — KI-Plattformleitung in der Schweizer Armee und KI-Governance auf Ebene der Bundeskanzlei."
        keywords="Andrew Hermann, KI-Governance, Schweizer Armee, Bundeskanzlei, souveräne KI, institutionelle KI, Projektleitung, Schweiz"
        url="https://andrew.cloudhopper.ch/de"
        structuredData={homeStructuredData}
        breadcrumbs={homeBreadcrumbs}
      />
      <Navbar />

      <Hero lang="de" />

      <div className="home-sections">
        <section className="home-section">
          <WhatIDo lang="de" />
        </section>

        <section className="home-section home-section-tinted">
          <CTA lang="de" />
        </section>

        <section className="home-section">
          <Steps lang="de" />
        </section>
      </div>

      <Footer />
    </div>
  )
}

HomeDe.defaultProps = {}

export default HomeDe
