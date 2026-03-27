import { render } from '@testing-library/react'
import SEO from '../../components/seo'

// react-helmet schedules DOM updates asynchronously and doesn't flush in jsdom.
// Mock it to render children as regular DOM elements so we can query them directly.
jest.mock('react-helmet', () => ({
  Helmet: ({ children }) => <>{children}</>
}))

describe('SEO', () => {
  it('sets default title when no title prop given', () => {
    render(<SEO />)
    const title = document.querySelector('title')
    expect(title?.textContent).toBe('Andrew J. Hermann - Strategic Leadership & AI Innovation Expert')
  })

  it('sets page title with suffix when title prop is given', () => {
    render(<SEO title="Blog" />)
    const title = document.querySelector('title')
    expect(title?.textContent).toBe('Blog - Andrew J. Hermann')
  })

  it('sets meta description', () => {
    render(<SEO description="Custom description for testing" />)
    const meta = document.querySelector('meta[name="description"]')
    expect(meta?.getAttribute('content')).toBe('Custom description for testing')
  })

  it('uses default description when none provided', () => {
    render(<SEO />)
    const meta = document.querySelector('meta[name="description"]')
    expect(meta?.getAttribute('content')).toContain('organizational strategy')
  })

  it('sets canonical URL', () => {
    render(<SEO canonical="https://andrew.cloudhopper.ch/blog" />)
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical?.getAttribute('href')).toBe('https://andrew.cloudhopper.ch/blog')
  })

  it('sets og:title meta tag', () => {
    render(<SEO title="Portfolio" />)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle?.getAttribute('content')).toBe('Portfolio - Andrew J. Hermann')
  })

  it('appends custom keywords to defaults', () => {
    render(<SEO keywords="digital transformation, Swiss public sector" />)
    const meta = document.querySelector('meta[name="keywords"]')
    expect(meta?.getAttribute('content')).toContain('Andrew Hermann')
    expect(meta?.getAttribute('content')).toContain('digital transformation')
  })
})
