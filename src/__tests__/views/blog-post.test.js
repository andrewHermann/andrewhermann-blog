import { screen, waitFor } from '@testing-library/react'
import BlogPost from '../../views/blog-post'
import { apiRequest } from '../../config/api'

jest.mock('react-helmet', () => ({
  Helmet: ({ children }) => <>{children}</>
}))

jest.mock('../../config/api', () => ({
  apiRequest: jest.fn(),
  API_ENDPOINTS: { POSTS: '/api/posts' },
}))

// react-markdown renders markdown to HTML — mock to keep tests simple
jest.mock('react-markdown', () => function ReactMarkdown({ children }) { return <div>{children}</div> })

const mockPost = {
  id: 1,
  title: 'Test Article',
  slug: 'test-article',
  content: '## Heading\n\nSome content here.',
  excerpt: 'A short excerpt.',
  created_at: '2024-03-01T00:00:00.000Z',
  updated_at: '2024-03-01T00:00:00.000Z',
}

// BlogPost reads slug from useParams — render inside a route with params
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'

function renderBlogPost(slug = 'test-article') {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BlogPost page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state initially', () => {
    apiRequest.mockImplementation(() => new Promise(() => {}))
    renderBlogPost()
    expect(screen.getByText('Loading post...')).toBeInTheDocument()
  })

  it('renders post title and content after load', async () => {
    apiRequest.mockResolvedValue(mockPost)
    renderBlogPost()
    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument()
    })
  })

  it('renders back to blog link', async () => {
    apiRequest.mockResolvedValue(mockPost)
    renderBlogPost()
    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: /back to blog/i })[0]).toBeInTheDocument()
    })
  })

  it('shows Post Not Found when API throws', async () => {
    apiRequest.mockRejectedValue(new Error('Not found'))
    renderBlogPost()
    await waitFor(() => {
      expect(screen.getByText('Post Not Found')).toBeInTheDocument()
    })
  })

  it('shows Post Not Found when API returns null', async () => {
    apiRequest.mockResolvedValue(null)
    renderBlogPost()
    await waitFor(() => {
      expect(screen.getByText('Post Not Found')).toBeInTheDocument()
    })
  })

  it('renders publication date for a loaded post', async () => {
    apiRequest.mockResolvedValue(mockPost)
    renderBlogPost()
    await waitFor(() => {
      expect(screen.getByText(/published on/i)).toBeInTheDocument()
    })
  })
})
