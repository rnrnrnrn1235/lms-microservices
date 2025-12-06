import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './MyBorrowingHistory.css';

const MyBorrowingHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [borrows, setBorrows] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); 
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem('currentUser');
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
      const storedBorrows = JSON.parse(localStorage.getItem('borrows') || '[]');
      setBorrows(storedBorrows);
    };

    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('storage', handleStorage);

    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const { activeBorrows, historyBorrows } = useMemo(() => {
    if (!currentUser) return { activeBorrows: [], historyBorrows: [] };
    const userBorrows = borrows.filter(b => b.memberId === currentUser.id);
    return {
      activeBorrows: userBorrows.filter(b => b.status === 'active'),
      historyBorrows: userBorrows.filter(b => b.status === 'returned')
    };
  }, [borrows, currentUser]);

  const filteredActive = activeBorrows.filter(b => b.bookTitle.toLowerCase().includes(search.toLowerCase()));
  const filteredHistory = historyBorrows.filter(b => b.bookTitle.toLowerCase().includes(search.toLowerCase()));

  const getBorrowStatus = (bookId) => {
    if (filteredActive.some(b => b.bookId === bookId)) return 'Active';
    if (filteredHistory.some(b => b.bookId === bookId)) return 'Returned';
    return 'Available';
  };

  return (
    <div className={`borrowing-history-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>📖 My Borrowing History</h1>
        </header>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by book title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="history-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active Borrows ({activeBorrows.length})
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History ({historyBorrows.length})
            </button>
          </div>

          <div className="content-area">
            {activeTab === 'active' && (
              <div className="borrows-list">
                {filteredActive.length === 0 && <p className="empty-state">No active borrows.</p>}
                {filteredActive.map(b => (
                  <div key={b.id} className="borrow-card">
                    <div className="borrow-info">
                      <h3>{b.bookTitle}</h3>
                      <p><strong>Issue Date:</strong> {new Date(b.issueDate).toLocaleDateString()}</p>
                      <p><strong>Due Date:</strong> {new Date(b.dueDate).toLocaleDateString()}</p>
                    </div>
                    <span className="status-badge active">{getBorrowStatus(b.bookId)}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-list">
                {filteredHistory.length === 0 && <p className="empty-state">No history records.</p>}
                {filteredHistory.map(b => (
                  <div key={b.id} className="history-card">
                    <div className="history-info">
                      <h3>{b.bookTitle}</h3>
                      <p><strong>Issue Date:</strong> {new Date(b.issueDate).toLocaleDateString()}</p>
                      <p><strong>Return Date:</strong> {new Date(b.returnDate).toLocaleDateString()}</p>
                      {b.fine > 0 && <p><strong>Late Fee:</strong> {b.fine} EGP</p>}
                    </div>
                    <span className="status-badge returned">{getBorrowStatus(b.bookId)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBorrowingHistory;








