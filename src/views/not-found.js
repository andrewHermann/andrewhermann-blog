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

import { Link } from 'react-router-dom'

import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import PageFloatingRobot from '../components/PageFloatingRobot'
import './not-found.css'

const NotFound = () => {
  return (
    <div className="page-container">
      <SEO
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist. Navigate back to explore Andrew J. Hermann's website."
        keywords="404, page not found, error"
        url="https://andrew.cloudhopper.ch/404"
      />
      
      <PageFloatingRobot bodyColor="#1e3a5f" glowColor="#2563eb" />
      
      <Navbar />
      
      <div className="page-content">
        <div className="content-main">
          <div className="section-card text-center">
            <div className="error-code">404</div>
            <h1 className="page-title">Page Not Found</h1>
            <p className="page-subtitle">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
              <Link to="/about" className="btn btn-secondary">
                About Me
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                Portfolio
              </Link>
            </div>
            
            <div className="helpful-links">
              <h3>You might be looking for:</h3>
              <ul>
                <li><Link to="/blog" className="link-primary">Blog Posts</Link></li>
                <li><Link to="/contact" className="link-primary">Contact Information</Link></li>
                <li><Link to="/markets" className="link-primary">Market Data</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default NotFound
