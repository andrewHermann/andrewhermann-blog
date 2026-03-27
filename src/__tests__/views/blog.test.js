import { screen, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../../testUtils'
import Blog from '../../views/blog'
import { apiRequest } from '../../config/api'

jest.mock('../../components/PageFloatingRobot', () => () => null)
jest.mock('../../config/api', () => ({
  apiRequest: jest.fn(),
  API_ENDPOINTS: { POSTS: '/api/posts' },
}))

const mockPosts = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    excerpt: 'Excerpt for the first post.',
    published: true,
    created_at: '2024-03-01T00:00:00.000Z',
    category: 'Leadership',
    tags: 'strategy,AI',
    featured_image: null,
  },
  {
    id: 2,
    title: 'Second Post',
    slug: 'second-post',
    excerpt: 'Excerpt for the second post.',
    published: true,
    created_at: '2024-02-01T00:00:00.000Z',
    category: null,
    tags: null,
    featured_image: null,
  },
]

describe('Blog page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', () => {
    apiRequest.mockImplementation(() => new Promise(() => {}))
    renderWithRouter(<Blog />)
    expect(screen.getByText('Loading posts...')).toBeInTheDocument()
  })

  it('renders posts after API resolves', async () => {
    apiRequest.mockResolvedValue(mockPosts)
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument()
      expect(screen.getByText('Second Post')).toBeInTheDocument()
    })
  })

  it('only shows published posts', async () => {
    const mixed = [
      ...mockPosts,
      { id: 3, title: 'Draft Post', slug: 'draft', excerpt: '', published: false, created_at: '2024-01-01T00:00:00.000Z' }
    ]
    apiRequest.mockResolvedValue(mixed)
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.queryByText('Draft Post')).not.toBeInTheDocument()
    })
  })

  it('shows empty state when no posts are returned', async () => {
    apiRequest.mockResolvedValue([])
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.getByText('Articles Coming Soon')).toBeInTheDocument()
    })
  })

  it('shows error state when API throws', async () => {
    apiRequest.mockRejectedValue(new Error('Network error'))
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.getByText('Unable to load blog posts at this time.')).toBeInTheDocument()
    })
  })

  it('renders Read More links for each post', async () => {
    apiRequest.mockResolvedValue(mockPosts)
    renderWithRouter(<Blog />)
    await waitFor(() => {
      const readMoreLinks = screen.getAllByRole('link', { name: /read more/i })
      expect(readMoreLinks).toHaveLength(2)
      expect(readMoreLinks[0].getAttribute('href')).toBe('/blog/first-post')
    })
  })

  it('renders post category badge when present', async () => {
    apiRequest.mockResolvedValue(mockPosts)
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.getByText('Leadership')).toBeInTheDocument()
    })
  })

  it('renders post tags when present', async () => {
    apiRequest.mockResolvedValue(mockPosts)
    renderWithRouter(<Blog />)
    await waitFor(() => {
      expect(screen.getByText('strategy')).toBeInTheDocument()
      expect(screen.getByText('AI')).toBeInTheDocument()
    })
  })
})
