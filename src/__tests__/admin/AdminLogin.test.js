import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import AdminLogin from '../../admin/AdminLogin'
import { apiRequest } from '../../config/api'

jest.mock('../../config/api', () => ({
  apiRequest: jest.fn(),
  API_ENDPOINTS: { LOGIN: '/api/admin/login' },
}))

// useNavigate requires a router context — renderWithRouter provides it
const mockOnLogin = jest.fn()

describe('AdminLogin', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders username and password fields', () => {
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders the Login button', () => {
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('updates credentials on input', () => {
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    const usernameInput = screen.getByLabelText('Username')
    fireEvent.change(usernameInput, { target: { name: 'username', value: 'admin' } })
    expect(usernameInput.value).toBe('admin')
  })

  it('shows Logging in... and disables button during submission', async () => {
    apiRequest.mockImplementation(() => new Promise(() => {}))
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    fireEvent.change(screen.getByLabelText('Username'), { target: { name: 'username', value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { name: 'password', value: 'pass' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled()
    })
  })

  it('shows error message when API returns an error', async () => {
    apiRequest.mockResolvedValue({ error: 'Invalid credentials' })
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    fireEvent.change(screen.getByLabelText('Username'), { target: { name: 'username', value: 'wrong' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { name: 'password', value: 'wrong' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })
  })

  it('shows network error when API throws', async () => {
    apiRequest.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    fireEvent.change(screen.getByLabelText('Username'), { target: { name: 'username', value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { name: 'password', value: 'pass' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(screen.getByText('Network error. Please try again.')).toBeInTheDocument()
    })
  })

  it('calls onLogin with role on successful login', async () => {
    apiRequest.mockResolvedValue({ message: 'Login successful', role: 'admin' })
    renderWithRouter(<AdminLogin onLogin={mockOnLogin} />)
    fireEvent.change(screen.getByLabelText('Username'), { target: { name: 'username', value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { name: 'password', value: 'correct' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Login' }))
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('admin')
    })
  })
})
