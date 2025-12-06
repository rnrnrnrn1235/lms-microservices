import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Notification from '../../components/Notification';
import './MemberDashboard.css';

const MemberDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem('currentUser');
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      const storedBorrows = JSON.parse(localStorage.getItem('borrows') || '[]');
      setBorrows(storedBorrows);
    };

    loadData();
    window.addEventListener('storage', loadData);
    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener('storage', loadData);
      clearInterval(interval);
    };
  }, []);

  const activeBorrows = useMemo(() => {
    if (!currentUser) return [];
    return borrows.filter(
      (borrow) => String(borrow.memberId) === String(currentUser.id) && borrow.status === 'active'
    );
  }, [borrows, currentUser]);

  return (
    <div className={`member-dashboard ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Notification />

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>Member Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">👤 {currentUser?.name || 'Member User'}</span>
          </div>
        </header>

        <div className="dashboard-content">

          <div className="recent-books">
            <h2>📚 Currently Borrowed Books</h2>
            <div className="books-list">
              {activeBorrows.length === 0 && (
                <p className="empty-state">لا توجد استعارات حالياً.</p>
              )}
              {activeBorrows.map((borrow, index) => (
                <div key={index} className="book-card">
                  <div className="book-info">
                    <h3>{borrow.bookTitle}</h3>
                    <p>Due Date: {borrow.dueDate}</p>
                  </div>
                  <span className="status-badge active">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;



