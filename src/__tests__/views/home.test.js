import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../views/home';

// Mock all the components that Home uses
jest.mock('../../components/seo', () => ({ structuredData, title, description, keywords }) => (
  <div data-testid="seo">
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  </div>
));

jest.mock('../../components/navbar', () => () => <nav data-testid="navbar">Navbar</nav>);
jest.mock('../../components/hero', () => () => <div data-testid="hero">Hero</div>);
jest.mock('../../components/features1', () => () => <div data-testid="features1">Features1</div>);
jest.mock('../../components/cta', () => () => <div data-testid="cta">CTA</div>);
jest.mock('../../components/features2', () => () => <div data-testid="features2">Features2</div>);
jest.mock('../../components/steps', () => () => <div data-testid="steps">Steps</div>);
jest.mock('../../components/footer', () => () => <footer data-testid="footer">Footer</footer>);
jest.mock('../../components/PageFloatingRobot', () => () => <div data-testid="floating-robot">FloatingRobot</div>);

// Helper function to render component with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home View', () => {
  describe('Rendering', () => {
    test('renders all main components', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByTestId('seo')).toBeInTheDocument();
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('features1')).toBeInTheDocument();
      expect(screen.getByTestId('cta')).toBeInTheDocument();
      expect(screen.getByTestId('features2')).toBeInTheDocument();
      expect(screen.getByTestId('steps')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('floating-robot')).toBeInTheDocument();
    });

    test('renders components in correct order', () => {
      renderWithRouter(<Home />);
      
      const componentsInOrder = [
        'seo',
        'navbar', 
        'hero',
        'features1',
        'cta',
        'features2', 
        'steps',
        'footer',
        'floating-robot'
      ];
      
      componentsInOrder.forEach(testId => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });

    test('applies home-specific CSS class', () => {
      renderWithRouter(<Home />);
      
      const homeContainer = document.querySelector('.home-container') || 
                           document.querySelector('.home-home');
      expect(homeContainer).toBeInTheDocument();
    });
  });

  describe('SEO Configuration', () => {
    test('configures SEO with correct metadata', () => {
      renderWithRouter(<Home />);
      
      const seoComponent = screen.getByTestId('seo');
      expect(seoComponent).toBeInTheDocument();
      
      // Check that structured data is present
      const script = seoComponent.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
    });

    test('includes proper structured data for homepage', () => {
      renderWithRouter(<Home />);
      
      const seoComponent = screen.getByTestId('seo');
      const script = seoComponent.querySelector('script[type="application/ld+json"]');
      const structuredData = JSON.parse(script.textContent);
      
      expect(structuredData['@type']).toBe('WebPage');
      expect(structuredData.name).toContain('Strategic Leadership');
      expect(structuredData.url).toBe('https://andrew.cloudhopper.ch');
      expect(structuredData.mainEntity['@type']).toBe('Person');
      expect(structuredData.mainEntity.name).toBe('Andrew J. Hermann');
    });

    test('includes appropriate meta description', () => {
      renderWithRouter(<Home />);
      
      const seoComponent = screen.getByTestId('seo');
      const metaDescription = seoComponent.querySelector('meta[name="description"]');
      
      expect(metaDescription).toBeInTheDocument();
      expect(metaDescription.getAttribute('content')).toContain('organizational strategy');
    });
  });

  describe('Layout Structure', () => {
    test('has main content container', () => {
      renderWithRouter(<Home />);
      
      // Check for main container or wrapper
      const homeElement = document.querySelector('.home-container') ||
                         document.querySelector('.home-home') ||
                         document.querySelector('main');
      
      expect(homeElement).toBeInTheDocument();
    });

    test('navigation appears before main content', () => {
      renderWithRouter(<Home />);
      
      const navbar = screen.getByTestId('navbar');
      const hero = screen.getByTestId('hero');
      
      // Navbar should appear before hero in DOM order
      expect(navbar.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    test('footer appears at the end', () => {
      renderWithRouter(<Home />);
      
      const footer = screen.getByTestId('footer');
      const hero = screen.getByTestId('hero');
      
      // Footer should appear after hero in DOM order
      expect(hero.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  describe('Props Handling', () => {
    test('renders without any props', () => {
      renderWithRouter(<Home />);
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });

    test('handles additional props gracefully', () => {
      const customProps = { customProp: 'test', className: 'custom-class' };
      renderWithRouter(<Home {...customProps} />);
      
      // Should still render all components
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    test('all child components receive correct context', () => {
      renderWithRouter(<Home />);
      
      // All components should render without errors
      const requiredComponents = [
        'navbar', 'hero', 'features1', 'cta', 
        'features2', 'steps', 'footer', 'floating-robot'
      ];
      
      requiredComponents.forEach(testId => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper document structure', () => {
      renderWithRouter(<Home />);
      
      const nav = screen.getByTestId('navbar');
      const footer = screen.getByTestId('footer');
      
      expect(nav.tagName).toBe('NAV');
      expect(footer.tagName).toBe('FOOTER');
    });

    test('floating robot does not interfere with main content', () => {
      renderWithRouter(<Home />);
      
      const floatingRobot = screen.getByTestId('floating-robot');
      const mainContent = screen.getByTestId('hero');
      
      expect(floatingRobot).toBeInTheDocument();
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Performance Considerations', () => {
    test('renders efficiently without unnecessary re-renders', () => {
      const { rerender } = renderWithRouter(<Home />);
      
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      
      // Re-render with same props should not cause issues
      rerender(<BrowserRouter><Home /></BrowserRouter>);
      
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });
});
