import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Home from '../../views/home'
import About from '../../views/about'
import Portfolio from '../../views/portfolio'
import NotFound from '../../views/not-found'
import ContactPage from '../../views/contact'
import CookiesPolicy from '../../views/cookies-policy'
import PrivacyPolicy from '../../views/privacy-policy'
import TermsOfUse from '../../views/terms-of-use'
import BehindTheSite from '../../views/behind-the-site'

// Three.js doesn't run in jsdom — mock the WebGL component
jest.mock('../../components/PageFloatingRobot', () => () => null)

describe('Page smoke tests', () => {
  describe('Home', () => {
    it('renders without crashing', () => {
      renderWithRouter(<Home />)
      expect(document.body).toBeInTheDocument()
    })

    it('renders the navbar logo', () => {
      renderWithRouter(<Home />)
      const logos = screen.getAllByAltText('Andrew J. Hermann Logo')
      expect(logos.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('About', () => {
    it('renders without crashing', () => {
      renderWithRouter(<About />)
      expect(document.body).toBeInTheDocument()
    })

    it('renders the navbar', () => {
      renderWithRouter(<About />)
      const logos = screen.getAllByAltText('Andrew J. Hermann Logo')
      expect(logos.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Portfolio', () => {
    it('renders without crashing', () => {
      renderWithRouter(<Portfolio />)
      expect(document.body).toBeInTheDocument()
    })

    it('renders the navbar', () => {
      renderWithRouter(<Portfolio />)
      const logos = screen.getAllByAltText('Andrew J. Hermann Logo')
      expect(logos.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('NotFound', () => {
    it('renders 404 text', () => {
      renderWithRouter(<NotFound />)
      expect(screen.getByText('404')).toBeInTheDocument()
      expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    })

    it('renders Go Home link pointing to /', () => {
      renderWithRouter(<NotFound />)
      const homeLink = screen.getByRole('link', { name: 'Go Home' })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink.getAttribute('href')).toBe('/')
    })

    it('renders helpful navigation links', () => {
      renderWithRouter(<NotFound />)
      expect(screen.getByRole('link', { name: 'Blog Posts' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Contact Information' })).toBeInTheDocument()
    })
  })

  describe('Contact page', () => {
    it('renders without crashing', () => {
      renderWithRouter(<ContactPage />)
      // "Contact" appears in navbar link and page title — check the h1
      expect(screen.getByRole('heading', { name: 'Contact', level: 1 })).toBeInTheDocument()
    })

    it('renders the contact form', () => {
      renderWithRouter(<ContactPage />)
      expect(screen.getByLabelText('Name *')).toBeInTheDocument()
      expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    })
  })

  describe('Cookies Policy', () => {
    it('renders without crashing', () => {
      renderWithRouter(<CookiesPolicy />)
      expect(screen.getByRole('heading', { name: 'Cookies Policy', level: 1 })).toBeInTheDocument()
    })

    it('renders key sections', () => {
      renderWithRouter(<CookiesPolicy />)
      expect(screen.getByText('1. Introduction')).toBeInTheDocument()
      expect(screen.getByText('2. What Are Cookies?')).toBeInTheDocument()
    })
  })

  describe('Privacy Policy', () => {
    it('renders without crashing', () => {
      renderWithRouter(<PrivacyPolicy />)
      expect(screen.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeInTheDocument()
    })

    it('renders key sections', () => {
      renderWithRouter(<PrivacyPolicy />)
      expect(screen.getByText('1. Introduction')).toBeInTheDocument()
      expect(screen.getByText('9. Your Rights (GDPR)')).toBeInTheDocument()
    })
  })

  describe('Terms of Use', () => {
    it('renders without crashing', () => {
      renderWithRouter(<TermsOfUse />)
      expect(screen.getByRole('heading', { name: 'Terms of Use', level: 1 })).toBeInTheDocument()
    })

    it('renders key sections', () => {
      renderWithRouter(<TermsOfUse />)
      expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument()
      expect(screen.getByText('11. Governing Law')).toBeInTheDocument()
    })
  })

  describe('Behind the Site', () => {
    it('renders without crashing', () => {
      renderWithRouter(<BehindTheSite />)
      expect(screen.getByRole('heading', { name: 'Behind the Site', level: 1 })).toBeInTheDocument()
    })

    it('renders key sections', () => {
      renderWithRouter(<BehindTheSite />)
      expect(screen.getByText('My Digital Philosophy')).toBeInTheDocument()
      expect(screen.getByText('Architecture & Hosting')).toBeInTheDocument()
    })
  })
})
