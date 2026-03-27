import { screen, fireEvent, act } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import CookieConsent from '../../components/cookie-consent'

jest.mock('../../services/analytics', () => ({
  trackPageView: jest.fn(),
}))

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('does not show banner when consent already set', () => {
    localStorage.setItem('cookieConsent', 'all')
    renderWithRouter(<CookieConsent />)
    act(() => { jest.advanceTimersByTime(1500) })
    expect(screen.queryByText('We use cookies')).not.toBeInTheDocument()
  })

  it('shows banner after delay when no consent stored', () => {
    renderWithRouter(<CookieConsent />)
    expect(screen.queryByText('We use cookies')).not.toBeInTheDocument()
    act(() => { jest.advanceTimersByTime(1100) })
    expect(screen.getByText('We use cookies')).toBeInTheDocument()
  })

  it('Accept All sets localStorage to "all" and hides banner', () => {
    renderWithRouter(<CookieConsent />)
    act(() => { jest.advanceTimersByTime(1100) })
    fireEvent.click(screen.getByRole('button', { name: 'Accept All' }))
    expect(localStorage.getItem('cookieConsent')).toBe('all')
    expect(screen.queryByText('We use cookies')).not.toBeInTheDocument()
  })

  it('Essential Only sets localStorage to "essential" and hides banner', () => {
    renderWithRouter(<CookieConsent />)
    act(() => { jest.advanceTimersByTime(1100) })
    fireEvent.click(screen.getByRole('button', { name: 'Essential Only' }))
    expect(localStorage.getItem('cookieConsent')).toBe('essential')
    expect(screen.queryByText('We use cookies')).not.toBeInTheDocument()
  })

  it('Show Details / Hide Details toggles cookie categories', () => {
    renderWithRouter(<CookieConsent />)
    act(() => { jest.advanceTimersByTime(1100) })
    expect(screen.queryByText('Cookie Categories:')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Show Details' }))
    expect(screen.getByText('Cookie Categories:')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hide Details' }))
    expect(screen.queryByText('Cookie Categories:')).not.toBeInTheDocument()
  })

  it('close button hides the banner', () => {
    renderWithRouter(<CookieConsent />)
    act(() => { jest.advanceTimersByTime(1100) })
    fireEvent.click(screen.getByLabelText('Close cookie banner'))
    expect(screen.queryByText('We use cookies')).not.toBeInTheDocument()
  })
})
