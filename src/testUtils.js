import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Custom render function that includes common providers
export function renderWithRouter(ui, { initialEntries = ['/'] } = {}) {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
}

// Mock data factories
export const mockBlogPost = {
  id: 1,
  title: 'Test Blog Post',
  content: 'This is test content for a blog post.',
  excerpt: 'This is a test excerpt...',
  author: 'Test Author',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
};

export const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role: 'admin',
  created_at: '2024-01-01T00:00:00.000Z'
};

// API response mocks
export const mockApiResponse = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(data),
  text: () => Promise.resolve(JSON.stringify(data))
});

// User event setup
export const setupUser = () => userEvent.setup();

// Common test assertions
export const expectElementToBeVisible = (element) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveAccessibleName = (element, name) => {
  expect(element).toHaveAccessibleName(name);
};

// Wait for async operations
export const waitForApiCall = () => new Promise(resolve => setTimeout(resolve, 0));

export default {
  renderWithRouter,
  mockBlogPost,
  mockUser,
  mockApiResponse,
  setupUser,
  expectElementToBeVisible,
  expectElementToHaveAccessibleName,
  waitForApiCall
};
