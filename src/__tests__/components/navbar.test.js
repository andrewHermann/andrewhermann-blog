import { screen, fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Navbar from '../../components/navbar'

describe('Navbar', () => {
  it('renders the desktop logo image', () => {
    renderWithRouter(<Navbar />)
    // Navbar renders two logos: one desktop, one mobile — use getAllByAltText
    const logos = screen.getAllByAltText('Andrew J. Hermann Logo')
    expect(logos.length).toBeGreaterThanOrEqual(1)
    expect(logos[0]).toBeInTheDocument()
  })

  it('renders all desktop nav links', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getAllByRole('link', { name: 'Home' })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Blog' })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toBeInTheDocument()
  })

  it('renders the portfolio dropdown trigger button', () => {
    renderWithRouter(<Navbar />)
    // The dropdown trigger is a button whose accessible name includes "Portfolio"
    const buttons = screen.getAllByRole('button')
    const portfolioBtn = buttons.find(b => b.textContent.includes('Portfolio'))
    expect(portfolioBtn).toBeInTheDocument()
  })

  it('renders the burger menu button', () => {
    renderWithRouter(<Navbar />)
    const burger = document.querySelector('[data-thq="thq-burger-menu"]')
    expect(burger).toBeTruthy()
  })

  it('opens mobile menu when burger is clicked', () => {
    renderWithRouter(<Navbar />)
    const burger = document.querySelector('[data-thq="thq-burger-menu"]')
    const mobileMenu = document.querySelector('[data-thq="thq-mobile-menu"]')
    expect(mobileMenu).not.toHaveClass('navbar-mobile-menu-open')
    fireEvent.click(burger)
    expect(mobileMenu).toHaveClass('navbar-mobile-menu-open')
  })

  it('closes mobile menu when close button is clicked', () => {
    renderWithRouter(<Navbar />)
    const burger = document.querySelector('[data-thq="thq-burger-menu"]')
    fireEvent.click(burger)
    const closeBtn = document.querySelector('[data-thq="thq-close-menu"]')
    fireEvent.click(closeBtn)
    const mobileMenu = document.querySelector('[data-thq="thq-mobile-menu"]')
    expect(mobileMenu).not.toHaveClass('navbar-mobile-menu-open')
  })

  it('opens portfolio dropdown and shows sub-links when triggered', () => {
    renderWithRouter(<Navbar />)
    const buttons = screen.getAllByRole('button')
    const portfolioBtn = buttons.find(b => b.textContent.includes('Portfolio'))
    fireEvent.click(portfolioBtn)
    const dropdownMenu = document.querySelector('.navbar-dropdown-menu-open')
    expect(dropdownMenu).toBeInTheDocument()
    // "Behind the Site" appears in both desktop dropdown and mobile menu
    const behindLinks = screen.getAllByRole('link', { name: 'Behind the Site' })
    expect(behindLinks.length).toBeGreaterThanOrEqual(1)
  })
})
