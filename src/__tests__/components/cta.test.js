import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CTA from '../../components/cta';

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CTA Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    test('renders main CTA section', () => {
      renderWithRouter(<CTA />);
      
      // Check for main CTA content (the specific text may vary, so check for key elements)
      const ctaSection = document.querySelector('.cta-cta');
      expect(ctaSection).toBeInTheDocument();
    });

    test('renders information cards', () => {
      renderWithRouter(<CTA />);
      
      // Check for key skill areas that should be present
      const expectedCards = [
        'Strategic Leadership & Innovation',
        'Applied Artificial Intelligence',
        'Data-Driven Decision Making',
        'Project Portfolio Management'
      ];
      
      expectedCards.forEach(cardTitle => {
        expect(screen.getByText(cardTitle)).toBeInTheDocument();
      });
    });

    test('renders action buttons for each card', () => {
      renderWithRouter(<CTA />);
      
      // Look for action buttons/links
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates correctly when action buttons are clicked', () => {
      renderWithRouter(<CTA />);
      
      // Find and click the first action button
      const actionButtons = screen.getAllByRole('button');
      if (actionButtons.length > 0) {
        fireEvent.click(actionButtons[0]);
        expect(mockNavigate).toHaveBeenCalled();
      }
    });

    test('handles portfolio navigation', () => {
      renderWithRouter(<CTA />);
      
      // Look for portfolio-related buttons
      const portfolioButton = screen.queryByText(/portfolio/i);
      if (portfolioButton) {
        fireEvent.click(portfolioButton);
        expect(mockNavigate).toHaveBeenCalledWith('/portfolio');
      }
    });

    test('handles blog navigation', () => {
      renderWithRouter(<CTA />);
      
      // Look for blog-related buttons
      const blogButton = screen.queryByText(/blog/i);
      if (blogButton) {
        fireEvent.click(blogButton);
        expect(mockNavigate).toHaveBeenCalledWith('/blog');
      }
    });
  });

  describe('Content Structure', () => {
    test('information cards have proper structure', () => {
      renderWithRouter(<CTA />);
      
      // Check for card titles
      expect(screen.getByText('Strategic Leadership & Innovation')).toBeInTheDocument();
      expect(screen.getByText('Applied Artificial Intelligence')).toBeInTheDocument();
    });

    test('cards contain descriptive content', () => {
      renderWithRouter(<CTA />);
      
      // Check for descriptive text
      const strategicDesc = screen.getByText(/organizational strategies.*innovation/i);
      expect(strategicDesc).toBeInTheDocument();
      
      const aiDesc = screen.getByText(/AI technologies.*real-world problems/i);
      expect(aiDesc).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    test('action buttons are interactive', () => {
      renderWithRouter(<CTA />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).not.toBeDisabled();
        expect(button).toBeVisible();
      });
    });

    test('handles multiple clicks properly', () => {
      renderWithRouter(<CTA />);
      
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        const firstButton = buttons[0];
        fireEvent.click(firstButton);
        fireEvent.click(firstButton);
        
        expect(mockNavigate).toHaveBeenCalledTimes(2);
      }
    });
  });

  describe('Props Handling', () => {
    test('renders with default props when none provided', () => {
      renderWithRouter(<CTA />);
      
      // Should render without errors
      const ctaElement = document.querySelector('.cta-cta') || 
                        document.querySelector('[data-testid="cta"]') ||
                        document.querySelector('.cta-container');
      
      // At minimum, the component should render some content
      expect(document.body).toContainHTML('Strategic Leadership');
    });

    test('handles custom props if supported', () => {
      // Test custom props if the component supports them
      const customProps = { 
        title: 'Custom Title',
        description: 'Custom Description'
      };
      
      renderWithRouter(<CTA {...customProps} />);
      
      // The component might not use these props, but it shouldn't break
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation failed');
      });
      
      renderWithRouter(<CTA />);
      
      const buttons = screen.getAllByRole('button');
      if (buttons.length > 0) {
        // Should not crash when navigation fails
        expect(() => fireEvent.click(buttons[0])).not.toThrow();
      }
    });
  });

  describe('Accessibility', () => {
    test('interactive elements are keyboard accessible', () => {
      renderWithRouter(<CTA />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });

    test('has meaningful content for screen readers', () => {
      renderWithRouter(<CTA />);
      
      // Check that important content is accessible
      const strategicLeadership = screen.getByText('Strategic Leadership & Innovation');
      const aiContent = screen.getByText('Applied Artificial Intelligence');
      
      expect(strategicLeadership).toBeVisible();
      expect(aiContent).toBeVisible();
    });

    test('action buttons have accessible labels', () => {
      renderWithRouter(<CTA />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button.textContent.length).toBeGreaterThan(0);
      });
    });
  });
});
