import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter, setupUser } from '../../testUtils';
import Navbar from '../../components/navbar';

describe('Navbar Component', () => {
  let user;

  beforeEach(() => {
    user = setupUser();
  });

  test('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    
    // Check that we have navigation links (should be multiple due to desktop/mobile)
    expect(screen.getAllByRole('link', { name: /home/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /blog/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /markets/i }).length).toBeGreaterThanOrEqual(1);
  });

  test('renders logo images', () => {
    renderWithRouter(<Navbar />);
    
    // Check for logo images
    const logoImages = screen.getAllByAltText(/Andrew J. Hermann Logo/i);
    expect(logoImages.length).toBeGreaterThan(0);
  });

  test('has burger menu button', () => {
    renderWithRouter(<Navbar />);
    
    // Look for the burger menu button using class name
    const burgerMenu = document.querySelector('.navbar-burger-menu');
    expect(burgerMenu).toBeInTheDocument();
    expect(burgerMenu).toHaveAttribute('role', 'button');
  });

  test('contains navigation elements', () => {
    renderWithRouter(<Navbar />);
    
    // Check for multiple nav elements (desktop and mobile)
    const allNavElements = screen.getAllByRole('navigation');
    expect(allNavElements.length).toBeGreaterThanOrEqual(2);
  });

  test('renders navbar structure', () => {
    renderWithRouter(<Navbar />);
    
    // Check that the main navbar container exists using class
    const navbarContainer = document.querySelector('.navbar-container');
    expect(navbarContainer).toBeInTheDocument();
    
    // Verify we have links
    const allLinks = screen.getAllByRole('link');
    expect(allLinks.length).toBeGreaterThan(0);
  });
});
