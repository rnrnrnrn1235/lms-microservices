import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Get current role from path
  const getRole = () => {
    if (location.pathname.includes('/admin')) return 'admin';
    if (location.pathname.includes('/librarian')) return 'librarian';
    if (location.pathname.includes('/member')) return 'member';
    return 'member';
  };

  const role = getRole();

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/users', icon: '👥', label: 'Users' },
    { path: '/admin/users/add', icon: '➕', label: 'Add User' },
    { path: '/admin/books', icon: '📚', label: 'Books' },
    { path: '/admin/books/add', icon: '➕', label: 'Add Book' },
    { path: '/admin/reports/borrowed', icon: '📊', label: 'Borrowed Books' },
    { path: '/admin/reports/overdue', icon: '⚠️', label: 'Overdue Books' },
    { path: '/admin/reports/fines', icon: '💰', label: 'Fines Report' },
    { path: '/admin/reports/availability', icon: '📖', label: 'Availability' }
  ];

  const librarianMenuItems = [
    { path: '/librarian/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/librarian/borrow/issue', icon: '📖', label: 'Issue Book' },
    { path: '/librarian/borrow/return', icon: '↩️', label: 'Return Book' },
    { path: '/librarian/borrow/list', icon: '📋', label: 'Borrow List' },
    { path: '/librarian/books', icon: '📚', label: 'Books' }
  ];

  const memberMenuItems = [
    { path: '/member/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/member/search', icon: '🔍', label: 'Search Books' },
    { path: '/member/history', icon: '📖', label: 'My History' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : 
                   role === 'librarian' ? librarianMenuItems : 
                   memberMenuItems;

  return (
    <>
      {/* Overlay only shows on mobile when sidebar is open */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">📚</span>
            {isOpen && <span className="logo-text">Library</span>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={toggleSidebar}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {isOpen && <span className="sidebar-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/login" className="sidebar-logout">
            <span className="sidebar-icon">🚪</span>
            {isOpen && <span className="sidebar-label">Logout</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

