import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './LibrarianDashboard.css';

const LibrarianDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const stats = [
    { title: 'Books Issued Today', value: '12', icon: '📖', color: '#667eea' },
    { title: 'Books Returned Today', value: '8', icon: '↩️', color: '#4facfe' },
    { title: 'Pending Returns', value: '45', icon: '⏳', color: '#f093fb' },
    { title: 'Active Borrowers', value: '234', icon: '👥', color: '#fa709a' }
  ];

  return (
    <div className={`librarian-dashboard ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <h1>Librarian Dashboard</h1>

          <div className="header-actions">
            <span className="user-info">👤 Librarian User</span>

            {/* ⭐ زر الإشعارات الجديد */}
            <button
              className="notifications-btn"
              onClick={() => navigate('/librarian/notifications')}
            >
              🔔 Notifications
            </button>
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
        </div>

      </div>
    </div>
  );
};

export default LibrarianDashboard;


