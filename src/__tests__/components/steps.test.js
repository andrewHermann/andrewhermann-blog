import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Steps from '../../components/steps';

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

describe('Steps Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockScrollTo.mockClear();
  });

  describe('Rendering', () => {
    test('renders main container with correct structure', () => {
      renderWithRouter(<Steps />);
      
      const mainContainer = document.querySelector('.steps-steps3');
      expect(mainContainer).toBeInTheDocument();
    });

    test('renders all step items', () => {
      renderWithRouter(<Steps />);
      
      const stepItems = document.querySelectorAll('.steps-container4, .steps-container5, .steps-container6');
      expect(stepItems.length).toBeGreaterThanOrEqual(3);
    });

    test('renders headings and descriptions', () => {
      renderWithRouter(<Steps />);
      
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates correctly when step is clicked', () => {
      renderWithRouter(<Steps />);
      
      const firstStep = document.querySelector('.steps-container4');
      if (firstStep) {
        fireEvent.click(firstStep);
        
        expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        expect(mockNavigate).toHaveBeenCalled();
      }
    });

    test('handles navigation with different links', () => {
      renderWithRouter(<Steps />);
      
      const stepItems = document.querySelectorAll('[style*="cursor: pointer"]');
      
      stepItems.forEach((step, index) => {
        mockNavigate.mockClear();
        mockScrollTo.mockClear();
        
        fireEvent.click(step);
        
        expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        expect(mockNavigate).toHaveBeenCalled();
      });
    });
  });

  describe('Interactive Elements', () => {
    test('step items are clickable', () => {
      renderWithRouter(<Steps />);
      
      const clickableItems = document.querySelectorAll('[style*="cursor: pointer"]');
      expect(clickableItems.length).toBeGreaterThan(0);
      
      clickableItems.forEach(item => {
        expect(item).toHaveStyle('cursor: pointer');
      });
    });

    test('keyboard navigation works', () => {
      renderWithRouter(<Steps />);
      
      const keyboardAccessible = document.querySelectorAll('[tabIndex="0"]');
      expect(keyboardAccessible.length).toBeGreaterThan(0);
      
      keyboardAccessible.forEach(item => {
        expect(item).toHaveAttribute('tabIndex', '0');
        expect(item).toHaveAttribute('role', 'button');
      });
    });
  });

  describe('Error Handling', () => {
    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation error');
      });
      
      renderWithRouter(<Steps />);
      
      const firstStep = document.querySelector('[style*="cursor: pointer"]');
      if (firstStep) {
        expect(() => {
          fireEvent.click(firstStep);
        }).not.toThrow();
      }
    });

    test('handles scroll errors gracefully', () => {
      mockScrollTo.mockImplementation(() => {
        throw new Error('Scroll error');
      });
      
      renderWithRouter(<Steps />);
      
      const firstStep = document.querySelector('[style*="cursor: pointer"]');
      if (firstStep) {
        expect(() => {
          fireEvent.click(firstStep);
        }).not.toThrow();
      }
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      renderWithRouter(<Steps />);
      
      const buttonElements = document.querySelectorAll('[role="button"]');
      expect(buttonElements.length).toBeGreaterThan(0);
      
      buttonElements.forEach(button => {
        expect(button).toHaveAttribute('role', 'button');
        expect(button).toHaveAttribute('tabIndex', '0');
      });
    });

    test('keyboard event handling works', () => {
      renderWithRouter(<Steps />);
      
      const keyboardElement = document.querySelector('[role="button"]');
      if (keyboardElement) {
        // Test Enter key
        fireEvent.keyDown(keyboardElement, { key: 'Enter' });
        expect(mockScrollTo).toHaveBeenCalled();
        
        mockScrollTo.mockClear();
        mockNavigate.mockClear();
        
        // Test Space key  
        fireEvent.keyDown(keyboardElement, { key: ' ' });
        expect(mockScrollTo).toHaveBeenCalled();
      }
    });

    test('has meaningful content structure', () => {
      renderWithRouter(<Steps />);
      
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        expect(heading.textContent.trim()).not.toBe('');
      });
    });
  });

  describe('Content Structure', () => {
    test('maintains consistent styling classes', () => {
      renderWithRouter(<Steps />);
      
      const containers = document.querySelectorAll('[class*="steps-container"]');
      expect(containers.length).toBeGreaterThan(0);
      
      containers.forEach(container => {
        expect(container.className).toMatch(/steps-container\d+/);
      });
    });

    test('has proper heading hierarchy', () => {
      renderWithRouter(<Steps />);
      
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings.length).toBeGreaterThan(0);
      
      headings.forEach(heading => {
        expect(heading).toHaveClass('thq-heading-2');
      });
    });
  });
});
