import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Markets from '../../views/markets'

jest.mock('react-helmet', () => ({
  Helmet: ({ children }) => <>{children}</>
}))

jest.mock('../../components/PageFloatingRobot', () => () => null)

describe('Markets page', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders without crashing', () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { CHF: 0.9 } }),
    })
    renderWithRouter(<Markets />)
    expect(document.body).toBeInTheDocument()
  })

  it('shows loading state for crypto prices initially', () => {
    global.fetch.mockImplementation(() => new Promise(() => {}))
    renderWithRouter(<Markets />)
    expect(screen.getByText(/loading cryptocurrency prices/i)).toBeInTheDocument()
  })

  it('falls back to hardcoded crypto data when API fails', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<Markets />)
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument()
    })
  })

  it('renders navbar', () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { CHF: 0.9 } }),
    })
    renderWithRouter(<Markets />)
    const logos = screen.getAllByAltText('Andrew J. Hermann Logo')
    expect(logos.length).toBeGreaterThanOrEqual(1)
  })
})
