import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../components/hero';

describe('Hero Component', () => {
  describe('Rendering', () => {
    test('renders with default props', () => {
      render(<Hero />);
      
      expect(screen.getByText('Andrew J. Hermann')).toBeInTheDocument();
      expect(screen.getByText('Strategic Leadership, AI Innovation, and Organizational Excellence')).toBeInTheDocument();
    });

    test('renders with custom props', () => {
      const customHeading = 'Custom Heading';
      const customContent = 'Custom content description';
      
      render(<Hero heading1={customHeading} content1={customContent} />);
      
      expect(screen.getByText(customHeading)).toBeInTheDocument();
      expect(screen.getByText(customContent)).toBeInTheDocument();
    });

    test('applies correct CSS classes', () => {
      render(<Hero />);
      
      const container = document.querySelector('.hero-simple-container');
      const content = document.querySelector('.hero-simple-content');
      const title = document.querySelector('.hero-simple-title');
      const description = document.querySelector('.hero-simple-description');
      
      expect(container).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    test('heading is rendered as h1 element', () => {
      render(<Hero />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Andrew J. Hermann');
    });

    test('description is rendered as paragraph element', () => {
      render(<Hero />);
      
      const description = screen.getByText('Strategic Leadership, AI Innovation, and Organizational Excellence');
      expect(description.tagName).toBe('P');
    });
  });

  describe('Props Handling', () => {
    test('handles empty string props', () => {
      render(<Hero heading1="" content1="" />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      const description = document.querySelector('.hero-simple-description');
      
      expect(heading).toHaveTextContent('');
      expect(description).toHaveTextContent('');
    });

    test('handles undefined props gracefully', () => {
      render(<Hero heading1={undefined} content1={undefined} />);
      
      // Should fall back to default props
      expect(screen.getByText('Andrew J. Hermann')).toBeInTheDocument();
      expect(screen.getByText('Strategic Leadership, AI Innovation, and Organizational Excellence')).toBeInTheDocument();
    });

    test('handles long content strings', () => {
      const longHeading = 'This is a very long heading that might wrap to multiple lines in certain viewport conditions';
      const longContent = 'This is a very long content description that spans multiple lines and tests how the component handles extensive text content without breaking the layout or functionality of the hero section component.';
      
      render(<Hero heading1={longHeading} content1={longContent} />);
      
      expect(screen.getByText(longHeading)).toBeInTheDocument();
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      render(<Hero />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveProperty('tagName', 'H1');
    });

    test('content is accessible to screen readers', () => {
      render(<Hero />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      const content = screen.getByText('Strategic Leadership, AI Innovation, and Organizational Excellence');
      
      expect(heading).toBeVisible();
      expect(content).toBeVisible();
    });
  });
});
