import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Home from '../../views/home'
import About from '../../views/about'
import Portfolio from '../../views/portfolio'
import NotFound from '../../views/not-found'

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
      // Navbar renders two logos (desktop + mobile)
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
})
