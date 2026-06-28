/*
 * Andrew Hermann Blog
 * Copyright (C) 2024 Andrew Hermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
            src="/ah-mark-geometric.svg"
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
          {userRole === 'admin' && (
            <Link
              to="/admin/analytics/pages"
              className={`thq-body-small thq-link ${location.pathname.startsWith('/admin/analytics') ? 'active' : ''}`}
            >
              Analytics
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
