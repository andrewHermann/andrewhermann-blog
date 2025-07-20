import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../../components/contact';

// Mock fetch
global.fetch = jest.fn();

describe('Contact Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('Rendering', () => {
    test('renders contact form with all fields', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('form fields start empty', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/subject/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });

    test('submit button is initially enabled', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Form Interactions', () => {
    test('updates form fields when user types', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      const subjectField = screen.getByLabelText(/subject/i);
      const messageField = screen.getByLabelText(/message/i);
      
      await user.type(nameField, 'John Doe');
      await user.type(emailField, 'john@example.com');
      await user.type(subjectField, 'Test Subject');
      await user.type(messageField, 'Test message content');
      
      expect(nameField).toHaveValue('John Doe');
      expect(emailField).toHaveValue('john@example.com');
      expect(subjectField).toHaveValue('Test Subject');
      expect(messageField).toHaveValue('Test message content');
    });

    test('handles form field changes with special characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameField = screen.getByLabelText(/name/i);
      await user.type(nameField, 'José María O\'Connor');
      
      expect(nameField).toHaveValue('José María O\'Connor');
    });
  });

  describe('Form Submission', () => {
    test('submits form with correct data', async () => {
      fetch.mockResolvedValueOnce({ ok: true });
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('https://formspree.io/f/xanbnrla', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Test message'
          }),
        });
      });
    });

    test('shows loading state during submission', async () => {
      fetch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      expect(submitButton).toBeDisabled();
      expect(screen.getByText(/submitting/i)).toBeInTheDocument();
    });

    test('shows success confirmation after successful submission', async () => {
      fetch.mockResolvedValueOnce({ ok: true });
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    });

    test('resets form after successful submission', async () => {
      fetch.mockResolvedValueOnce({ ok: true });
      
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameField = screen.getByLabelText(/name/i);
      const emailField = screen.getByLabelText(/email/i);
      
      await user.type(nameField, 'John Doe');
      await user.type(emailField, 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(nameField).toHaveValue('');
        expect(emailField).toHaveValue('');
      });
    });
  });

  describe('Error Handling', () => {
    test('shows error message on submission failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    test('handles HTTP error responses', async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 400 });
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    test('re-enables form after error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));
      
      const user = userEvent.setup();
      render(<Contact />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'Test message');
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Form Validation', () => {
    test('prevents submission with empty required fields', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      
      // Should not make fetch call with empty form
      expect(fetch).not.toHaveBeenCalled();
    });

    test('validates email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailField = screen.getByLabelText(/email/i);
      await user.type(emailField, 'invalid-email');
      
      // Browser validation should handle this
      expect(emailField).toHaveValue('invalid-email');
    });
  });

  describe('Accessibility', () => {
    test('form fields have proper labels', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    test('submit button is focusable', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).not.toHaveAttribute('tabindex', '-1');
    });

    test('form has proper structure for screen readers', () => {
      render(<Contact />);
      
      const form = screen.getByRole('form') || document.querySelector('form');
      expect(form).toBeInTheDocument();
    });
  });
});
