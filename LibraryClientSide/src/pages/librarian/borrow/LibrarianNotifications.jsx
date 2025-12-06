// LibrarianNotifications.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './LibrarianNotifications.css';

const LibrarianNotifications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [borrows, setBorrows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadBorrows = () => {
      const stored = JSON.parse(localStorage.getItem('borrows') || '[]');
      const pendingOnly = stored.filter(b => b.status === 'pending'); // طلبات معلقة فقط
      setBorrows(pendingOnly);
    };

    loadBorrows();
    window.addEventListener('storage', loadBorrows);
    const interval = setInterval(loadBorrows, 1000);

    return () => {
      window.removeEventListener('storage', loadBorrows);
      clearInterval(interval);
    };
  }, []);

  // حذف الرسالة
  const handleDeleteNotification = (borrowId) => {
    let storedBorrows = JSON.parse(localStorage.getItem('borrows') || '[]');
    // حذف الطلب من borrows المحلي
    storedBorrows = storedBorrows.filter(b => b.id !== borrowId);
    localStorage.setItem('borrows', JSON.stringify(storedBorrows));
    window.dispatchEvent(new Event('storage'));
    alert("تم حذف الرسالة!");
  };

  const filteredBorrows = borrows.filter(b =>
    b.bookTitle?.toLowerCase().includes(search.toLowerCase()) ||
    b.memberName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`notifications-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-main-content">
        <header className="page-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>🔔 Borrow Requests</h1>
        </header>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث بالكتاب أو العضو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book ID</th>
              <th>Book</th>
              <th>Member Name</th>
              <th>Member ID</th>
              <th>Request Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrows.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.bookId}</td>
                <td>{b.bookTitle}</td>
                <td>{b.memberName}</td>
                <td>{b.memberId}</td>
                <td>{new Date(b.requestDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteNotification(b.id)} 
                    className="delete-btn"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredBorrows.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  لا توجد رسائل حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianNotifications;




















