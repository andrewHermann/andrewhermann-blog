import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './cookies-policy.css'

const CookiesPolicy = () => {
  return (
    <div className="cookies-container">
      <Helmet>
        <title>Cookies Policy - Andrew J. Hermann</title>
        <meta property="og:title" content="Cookies Policy - Andrew J. Hermann" />
        <meta name="description" content="Cookies Policy for Andrew J. Hermann's professional website detailing how cookies are used." />
      </Helmet>
      <Navbar />
      <div className="cookies-content">
        <div className="cookies-header">
          <h1 className="cookies-title">Cookies Policy</h1>
          <p className="cookies-subtitle">Last updated: January 19, 2025</p>
        </div>
        <div className="cookies-body">
          <section className="cookies-section">
            <h2>1. Introduction</h2>
            <p>
              This Cookies Policy explains how Andrew J. Hermann uses cookies and similar technologies to recognize you when you visit our website.
              It explains what these technologies are and why we use them, as well as your rights to control their use.
            </p>
          </section>

          <section className="cookies-section">
            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section className="cookies-section">
            <h2>3. Why We Use Cookies</h2>
            <p>
              We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
              Other cookies enable us to track and target the interests of our users to enhance the experience on our website.
            </p>
          </section>

          <section className="cookies-section">
            <h2>4. Controlling Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.
            </p>
          </section>

          <section className="cookies-section">
            <h2>5. Updates to This Policy</h2>
            <p>
              We may update this Cookies Policy from time to time in order to reflect operational, legal or regulatory reasons.
              Please therefore re-visit this Cookies Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CookiesPolicy;
