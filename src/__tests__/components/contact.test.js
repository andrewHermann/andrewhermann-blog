import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Contact from '../../components/contact'

describe('Contact form', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders all form fields and submit button', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText('Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject *')).toBeInTheDocument()
    expect(screen.getByLabelText('Message *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('renders the email contact info', () => {
    renderWithRouter(<Contact email1="cloudhopper@icloud.com" />)
    expect(screen.getByText('cloudhopper@icloud.com')).toBeInTheDocument()
  })

  it('updates field values on input', () => {
    renderWithRouter(<Contact />)
    const nameInput = screen.getByLabelText('Name *')
    fireEvent.change(nameInput, { target: { name: 'name', value: 'John Doe' } })
    expect(nameInput.value).toBe('John Doe')
  })

  it('shows Sending... and disables button during submission', async () => {
    global.fetch.mockImplementation(() => new Promise(() => {})) // never resolves
    renderWithRouter(<Contact />)
    fireEvent.change(screen.getByLabelText('Name *'), { target: { name: 'name', value: 'John' } })
    fireEvent.change(screen.getByLabelText('Email *'), { target: { name: 'email', value: 'j@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject *'), { target: { name: 'subject', value: 'Hello' } })
    fireEvent.change(screen.getByLabelText('Message *'), { target: { name: 'message', value: 'Test message' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled()
    })
  })

  it('shows success confirmation on successful submission', async () => {
    global.fetch.mockResolvedValue({ ok: true })
    renderWithRouter(<Contact />)
    fireEvent.change(screen.getByLabelText('Name *'), { target: { name: 'name', value: 'John' } })
    fireEvent.change(screen.getByLabelText('Email *'), { target: { name: 'email', value: 'j@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject *'), { target: { name: 'subject', value: 'Hello' } })
    fireEvent.change(screen.getByLabelText('Message *'), { target: { name: 'message', value: 'Test message' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }))
    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeInTheDocument()
    })
  })

  it('shows error message on failed submission', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    renderWithRouter(<Contact />)
    fireEvent.change(screen.getByLabelText('Name *'), { target: { name: 'name', value: 'John' } })
    fireEvent.change(screen.getByLabelText('Email *'), { target: { name: 'email', value: 'j@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject *'), { target: { name: 'subject', value: 'Hello' } })
    fireEvent.change(screen.getByLabelText('Message *'), { target: { name: 'message', value: 'Test message' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }))
    await waitFor(() => {
      expect(screen.getByText(/error sending your message/i)).toBeInTheDocument()
    })
  })
})
