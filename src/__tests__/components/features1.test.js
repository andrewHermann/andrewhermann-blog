import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Features1 from '../../components/features1';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock window.scrollTo specifically for this component
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Features1 Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockScrollTo.mockClear();
  });

  describe('Rendering', () => {
    test('renders main section with correct structure', () => {
      renderWithRouter(<Features1 />);
      
      const mainSection = screen.getByRole('main');
      expect(mainSection).toBeInTheDocument();
      expect(mainSection).toHaveClass('features1-portfolio-section');
    });

    test('renders all portfolio items', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = screen.getAllByText(/View Details →/);
      expect(portfolioItems.length).toBeGreaterThanOrEqual(5);
    });

    test('renders view all button', () => {
      renderWithRouter(<Features1 />);
      
      const viewAllButton = screen.getByText('View Full Portfolio');
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton.tagName).toBe('BUTTON');
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates to portfolio with scroll state when item is clicked', () => {
      renderWithRouter(<Features1 />);
      
      const firstItem = screen.getAllByText(/View Details →/)[0];
      fireEvent.click(firstItem.closest('.features1-portfolio-item'));
      
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio', {
        state: { scrollTo: expect.any(String) }
      });
    });

    test('navigates to different portfolio items correctly', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = screen.getAllByText(/View Details →/);
      
      fireEvent.click(portfolioItems[0].closest('.features1-portfolio-item'));
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio', {
        state: { scrollTo: expect.any(String) }
      });
      
      mockNavigate.mockClear();
      
      fireEvent.click(portfolioItems[1].closest('.features1-portfolio-item'));
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio', {
        state: { scrollTo: expect.any(String) }
      });
    });

    test('view all button navigates to portfolio and scrolls to top', () => {
      renderWithRouter(<Features1 />);
      
      const viewAllButton = screen.getByText('View Full Portfolio');
      fireEvent.click(viewAllButton);
      
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio');
      expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('Interactive Elements', () => {
    test('portfolio items are clickable', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = screen.getAllByRole('button');
      
      // Should have portfolio items + view all button
      expect(portfolioItems.length).toBeGreaterThanOrEqual(1);
      
      portfolioItems.forEach(item => {
        expect(item).not.toBeDisabled();
      });
    });

    test('hover states are accessible', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = document.querySelectorAll('.features1-portfolio-item');
      expect(portfolioItems.length).toBeGreaterThan(0);
      
      portfolioItems.forEach(item => {
        expect(item).toHaveStyle('cursor: pointer');
      });
    });
  });

  describe('Content Structure', () => {
    test('has proper heading hierarchy', () => {
      renderWithRouter(<Features1 />);
      
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Professional Portfolio');
      
      const itemHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(itemHeadings.length).toBeGreaterThan(0);
    });

    test('portfolio items have correct data attributes or identifiers', () => {
      renderWithRouter(<Features1 />);
      
      const portfolioItems = document.querySelectorAll('.features1-portfolio-item');
      expect(portfolioItems.length).toBeGreaterThan(0);
      
      portfolioItems.forEach(item => {
        expect(item).toHaveClass('features1-portfolio-item');
      });
    });
  });

  describe('Error Handling', () => {
    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      renderWithRouter(<Features1 />);
      
      const firstItem = screen.getAllByText(/View Details →/)[0];
      
      // Should not crash when navigation fails
      expect(() => {
        fireEvent.click(firstItem.closest('.features1-portfolio-item'));
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('interactive elements are keyboard accessible', () => {
      renderWithRouter(<Features1 />);
      
      const viewAllButton = screen.getByText('View Full Portfolio');
      expect(viewAllButton).toHaveAttribute('type', 'button');
    });

    test('has meaningful text content for screen readers', () => {
      renderWithRouter(<Features1 />);
      
      const heading = screen.getByText('Professional Portfolio');
      expect(heading).toBeInTheDocument();
      
      const subtitle = screen.getByText(/Explore my key projects/);
      expect(subtitle).toBeInTheDocument();
    });
  });
});
