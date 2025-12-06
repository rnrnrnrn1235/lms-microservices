import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Users', value: '1,234', icon: '👥', color: '#667eea' },
    { title: 'Total Books', value: '5,678', icon: '📚', color: '#f093fb' },
    { title: 'Borrowed Books', value: '456', icon: '📖', color: '#4facfe' },
    { title: 'Overdue Books', value: '23', icon: '⚠️', color: '#fa709a' }
  ];

  const adminLinks = [
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/books', label: 'Manage Books' },
    { to: '/admin/reports/borrowed', label: 'Reports Center' }
  ];

  const librarianLinks = [
    { to: '/librarian/dashboard', label: 'Librarian Dashboard' },
    { to: '/librarian/borrow/issue', label: 'Issue Books' },
    { to: '/librarian/borrow/return', label: 'Return Books' }
  ];

  const memberLinks = [
    { to: '/member/dashboard', label: 'Member Dashboard' },
    { to: '/member/search', label: 'Search Books' },
    { to: '/member/history', label: 'Borrowing History' }
  ];

  return (
    <div className={`admin-dashboard ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen((prev) => !prev)}>
            ☰
          </button>
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">👤 Admin User</span>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ '--card-color': stat.color }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-sections">
            <div className="section-card">
              <h2>🛠 Admin Operations</h2>
              <div className="section-links">
                {adminLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="section-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="section-card">
              <h2>📚 Librarian Workspace</h2>
              <div className="section-links">
                {librarianLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="section-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="section-card">
              <h2>👥 Member Experience</h2>
              <div className="section-links">
                {memberLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="section-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

