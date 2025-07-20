import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Steps from '../../components/steps';

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

describe('Steps Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Rendering', () => {
    test('renders steps section with correct structure', () => {
      renderWithRouter(<Steps />);
      
      expect(screen.getByText('Explore My Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Discover Current Initiatives')).toBeInTheDocument();
      expect(screen.getByText('Connect with Complex Systems')).toBeInTheDocument();
    });

    test('renders all step cards with descriptions', () => {
      renderWithRouter(<Steps />);
      
      expect(screen.getByText(/Browse through a collection of my past projects/i)).toBeInTheDocument();
      expect(screen.getByText(/Learn about ongoing projects like KI@V/i)).toBeInTheDocument();
      expect(screen.getByText(/data-driven decision-making and applied artificial intelligence/i)).toBeInTheDocument();
    });

    test('displays step numbers', () => {
      renderWithRouter(<Steps />);
      
      expect(screen.getByText('01')).toBeInTheDocument();
      expect(screen.getByText('02')).toBeInTheDocument();
      expect(screen.getByText('03')).toBeInTheDocument();
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates to portfolio when first step is clicked', () => {
      renderWithRouter(<Steps />);
      
      const portfolioStep = screen.getByText('Explore My Portfolio');
      fireEvent.click(portfolioStep);
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio');
    });

    test('navigates to blog when second step is clicked', () => {
      renderWithRouter(<Steps />);
      
      const blogStep = screen.getByText('Discover Current Initiatives');
      fireEvent.click(blogStep);
      expect(mockNavigate).toHaveBeenCalledWith('/blog');
    });

    test('navigates to about when third step is clicked', () => {
      renderWithRouter(<Steps />);
      
      const aboutStep = screen.getByText('Connect with Complex Systems');
      fireEvent.click(aboutStep);
      expect(mockNavigate).toHaveBeenCalledWith('/about');
    });
  });

  describe('Interactive Elements', () => {
    test('step cards are clickable buttons', () => {
      renderWithRouter(<Steps />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button).not.toBeDisabled();
        expect(button).toBeVisible();
      });
    });

    test('handles multiple clicks on same step', () => {
      renderWithRouter(<Steps />);
      
      const portfolioStep = screen.getByText('Explore My Portfolio');
      fireEvent.click(portfolioStep);
      fireEvent.click(portfolioStep);
      
      expect(mockNavigate).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith('/portfolio');
    });
  });

  describe('Error Handling', () => {
    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      renderWithRouter(<Steps />);
      
      const portfolioStep = screen.getByText('Explore My Portfolio');
      expect(() => fireEvent.click(portfolioStep)).not.toThrow();
    });
  });

  describe('Props Handling', () => {
    test('renders with default props when none provided', () => {
      renderWithRouter(<Steps />);
      
      expect(screen.getByText('Explore My Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Discover Current Initiatives')).toBeInTheDocument();
      expect(screen.getByText('Connect with Complex Systems')).toBeInTheDocument();
    });

    test('handles custom props if component supports them', () => {
      // Test that component doesn't break with unexpected props
      const customProps = { customProp: 'test' };
      renderWithRouter(<Steps {...customProps} />);
      
      expect(screen.getByText('Explore My Portfolio')).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    test('step cards contain all required elements', () => {
      renderWithRouter(<Steps />);
      
      // Check that each step has number, title, and description
      const step01 = screen.getByText('01');
      const step02 = screen.getByText('02');
      const step03 = screen.getByText('03');
      
      expect(step01).toBeInTheDocument();
      expect(step02).toBeInTheDocument();
      expect(step03).toBeInTheDocument();
    });

    test('descriptions contain relevant keywords', () => {
      renderWithRouter(<Steps />);
      
      expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
      expect(screen.getByText(/projects/i)).toBeInTheDocument();
      expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('step cards are keyboard accessible', () => {
      renderWithRouter(<Steps />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });

    test('cards have meaningful content for screen readers', () => {
      renderWithRouter(<Steps />);
      
      const portfolioStep = screen.getByText('Explore My Portfolio');
      const blogStep = screen.getByText('Discover Current Initiatives');
      const aboutStep = screen.getByText('Connect with Complex Systems');
      
      expect(portfolioStep).toBeVisible();
      expect(blogStep).toBeVisible();
      expect(aboutStep).toBeVisible();
    });

    test('step numbers are accessible', () => {
      renderWithRouter(<Steps />);
      
      const stepNumbers = ['01', '02', '03'];
      stepNumbers.forEach(number => {
        const element = screen.getByText(number);
        expect(element).toBeVisible();
      });
    });
  });

  describe('Visual Structure', () => {
    test('maintains proper step sequence', () => {
      renderWithRouter(<Steps />);
      
      // Verify that steps appear in correct order
      const allText = document.body.textContent;
      const portfolioIndex = allText.indexOf('Explore My Portfolio');
      const initiativeIndex = allText.indexOf('Discover Current Initiatives');
      const systemsIndex = allText.indexOf('Connect with Complex Systems');
      
      expect(portfolioIndex).toBeLessThan(initiativeIndex);
      expect(initiativeIndex).toBeLessThan(systemsIndex);
    });
  });
});
