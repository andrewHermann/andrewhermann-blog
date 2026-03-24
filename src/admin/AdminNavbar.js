import { Link, useLocation } from 'react-router-dom'
import '../components/navbar.css'
import './AdminNavbar.css'

const AdminNavbar = ({ userRole }) => {
  const location = useLocation()

  if (!location.pathname.startsWith('/admin')) return null

  return (
    <header className="navbar-container">
      <header className="navbar-navbar-interactive">
        <Link to="/">
          <img
            alt="Andrew J. Hermann Logo"
            src="/ah-logo.png"
            className="navbar-image1"
          />
        </Link>
        <nav className="navbar-links1">
          <Link
            to="/admin/dashboard"
            className={`thq-body-small thq-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/posts"
            className={`thq-body-small thq-link ${location.pathname.startsWith('/admin/posts') ? 'active' : ''}`}
          >
            Posts
          </Link>
          {userRole === 'admin' && (
            <Link
              to="/admin/users"
              className={`thq-body-small thq-link ${location.pathname.startsWith('/admin/users') ? 'active' : ''}`}
            >
              Users
            </Link>
          )}
        </nav>
        <div className="admin-nav-right">
          <span className="admin-nav-badge">{userRole === 'admin' ? 'Admin' : 'Blogger'}</span>
          <Link to="/" className="thq-body-small thq-link admin-nav-site-link">
            ← View Site
          </Link>
        </div>
      </header>
    </header>
  )
}

export default AdminNavbar
