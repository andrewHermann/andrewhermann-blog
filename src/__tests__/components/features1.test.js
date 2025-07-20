import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Features1 from '../../components/features1';

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

describe('Features1 Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  describe('Rendering', () => {
    test('renders main section with correct structure', () => {
      renderWithRouter(<Features1 />);
      
      expect(screen.getByText('Professional Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Explore my key projects and initiatives in organizational strategy, AI innovation, and digital transformation.')).toBeInTheDocument();
    });

    test('renders all portfolio items', () => {
      renderWithRouter(<Features1 />);
      
      const expectedItems = [
        'KI@V – Conversational AI for the Swiss Armed Forces',
        'Cockpit – Power BI Portfolio Management Platform',
        'Digital Innovation Leadership – Bundesverwaltung & VBS',
        'TTR Implementation – European Rail Sector',
        'Oracle-Based System Management – Ascom'
      ];
      
      expectedItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    test('renders view all button', () => {
      renderWithRouter(<Features1 />);
      
      const viewAllButton = screen.getByText('View All Projects');
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton.tagName).toBe('BUTTON');
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates to portfolio with scroll state when item is clicked', () => {
      renderWithRouter(<Features1 />);
      
      const firstItem = screen.getByText('KI@V – Conversational AI for the Swiss Armed Forces');
      fireEvent.click(firstItem);
      
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio', { state: { scrollTo: 'ki-v' } });
    });

    test('navigates to different portfolio items correctly', () => {
      renderWithRouter(<Features1 />);
      
      const testCases = [
        { text: 'Cockpit – Power BI Portfolio Management Platform', id: 'cockpit' },
        { text: 'TTR Implementation – European Rail Sector', id: 'ttr' },
        { text: 'Oracle-Based System Management – Ascom', id: 'oracle-systems' }
      ];
      
      testCases.forEach(({ text, id }) => {
        const item = screen.getByText(text);
        fireEvent.click(item);
        expect(mockNavigate).toHaveBeenCalledWith('/portfolio', { state: { scrollTo: id } });
      });
    });

    test('view all button navigates to portfolio and scrolls to top', () => {
      renderWithRouter(<Features1 />);
      
      const viewAllButton = screen.getByText('View All Projects');
      fireEvent.click(viewAllButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio');
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Interactive Elements', () => {
    test('portfolio items are clickable', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = screen.getAllByRole('button');
      
      // Should have at least the portfolio items + view all button
      expect(portfolioItems.length).toBeGreaterThanOrEqual(6);
      
      portfolioItems.forEach(item => {
        expect(item).not.toBeDisabled();
      });
    });

    test('hover states are accessible', () => {
      renderWithRouter(<Features1 />);
      
      const firstItem = screen.getByText('KI@V – Conversational AI for the Swiss Armed Forces');
      expect(firstItem).toBeVisible();
      expect(firstItem).not.toHaveAttribute('disabled');
    });
  });

  describe('Content Structure', () => {
    test('has proper heading hierarchy', () => {
      renderWithRouter(<Features1 />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Professional Portfolio');
    });

    test('portfolio items have correct data attributes or identifiers', () => {
      renderWithRouter(<Features1 />);
      
      // Check that items are identifiable (through text content)
      expect(screen.getByText('KI@V – Conversational AI for the Swiss Armed Forces')).toBeInTheDocument();
      expect(screen.getByText('Cockpit – Power BI Portfolio Management Platform')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      renderWithRouter(<Features1 />);
      
      const firstItem = screen.getByText('KI@V – Conversational AI for the Swiss Armed Forces');
      
      // Should not crash when navigation fails
      expect(() => fireEvent.click(firstItem)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('interactive elements are keyboard accessible', () => {
      renderWithRouter(<Features1 />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });

    test('has meaningful text content for screen readers', () => {
      renderWithRouter(<Features1 />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      const subtitle = screen.getByText('Explore my key projects and initiatives in organizational strategy, AI innovation, and digital transformation.');
      
      expect(heading).toBeVisible();
      expect(subtitle).toBeVisible();
    });
  });
});
