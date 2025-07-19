import React from 'react'
import SEO from '../components/seo'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import './cookies-policy.css'

const CookiesPolicy = () => {
  const cookiesBreadcrumbs = [
    { name: "Home", url: "https://andrewhermann.com" },
    { name: "Cookies Policy", url: "https://andrewhermann.com/cookies" }
  ]

  return (
    <div className="cookies-container">
      <SEO
        title="Cookies Policy"
        description="Cookies Policy for Andrew J. Hermann's professional website detailing how cookies and similar technologies are used, with GDPR compliance information."
        keywords="cookies policy, website cookies, tracking technologies, GDPR compliance, cookie consent, data privacy"
        url="https://andrewhermann.com/cookies"
        breadcrumbs={cookiesBreadcrumbs}
      />
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
              This Cookies Policy explains how Andrew J. Hermann ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our website andrewhermann.com. It explains what these technologies are and why we use them, as well as your rights to control their use.
            </p>
            <p>
              In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
            </p>
          </section>

          <section className="cookies-section">
            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Andrew J. Hermann) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
          </section>

          <section className="cookies-section">
            <h2>3. Why We Use Cookies</h2>
            <p>
              We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.
            </p>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
            </p>
            
            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
            
            <h3>Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
            </p>
            
            <h3>Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
            </p>
          </section>

          <section className="cookies-section">
            <h2>4. Types of Cookies We Use</h2>
            <p>
              The specific types of first and third party cookies served through our Website and the purposes they perform are described in the table below:
            </p>
            
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Cookie Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Essential Cookies</strong></td>
                  <td>These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td><strong>Analytics Cookies</strong></td>
                  <td>We use Google Analytics to collect information about how visitors use our website. We use the information to compile reports and to help us improve the website.</td>
                  <td>Up to 2 years</td>
                </tr>
                <tr>
                  <td><strong>Functionality Cookies</strong></td>
                  <td>These cookies remember choices you make to improve your experience (e.g., your username, language, or region).</td>
                  <td>Up to 1 year</td>
                </tr>
                <tr>
                  <td><strong>Performance Cookies</strong></td>
                  <td>These cookies collect information about how you use the website, for instance which pages you visit most often.</td>
                  <td>Up to 30 days</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="cookies-section">
            <h2>5. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Website, deliver advertisements on and through the Website, and so on.
            </p>
            
            <h3>Google Analytics</h3>
            <p>
              We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website.
            </p>
            
            <h3>Social Media Features</h3>
            <p>
              Our Website includes Social Media Features, such as LinkedIn buttons. These Features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the Feature to function properly.
            </p>
          </section>

          <section className="cookies-section">
            <h2>6. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager that appears when you first visit our website or by adjusting your browser settings.
            </p>
            
            <h3>Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
            </p>
            
            <h3>Cookie Consent Manager</h3>
            <p>
              When you first visit our website, you will see a cookie consent banner. You can use this to accept all cookies or only essential cookies. You can change your preferences at any time by clicking the cookie settings link in our footer.
            </p>
          </section>

          <section className="cookies-section">
            <h2>7. How Often Will You Update This Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </section>

          <section className="cookies-section">
            <h2>8. Where Can You Get Further Information?</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please <Link to="/contact" className="contact-link">contact us through our contact form</Link> or refer to our <Link to="/privacy" className="contact-link">Privacy Policy</Link> for more information about how we process personal data.
            </p>
            <p>
              For more general information about cookies, you can visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="contact-link">www.allaboutcookies.org</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CookiesPolicy
