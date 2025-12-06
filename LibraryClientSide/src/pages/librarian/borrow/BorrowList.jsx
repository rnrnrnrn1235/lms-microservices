// BorrowList.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './BorrowList.css';

// دالة جلب البيانات من localStorage
const getBorrows = () => {
  const stored = localStorage.getItem('borrows');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

// دالة تحديد حالة السجل النهائية
const computeStatus = (borrow) => {
  const today = new Date();
  if (borrow.deleted) return "Deleted";
  if (borrow.status === "pending") return "Pending";
  if (borrow.status === "active") {
    if (borrow.dueDate && new Date(borrow.dueDate) < today) return "Overdue";
    return "Active";
  }
  if (borrow.status === "returned") return "Returned";
  return borrow.status || "Unknown";
};

const BorrowList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [borrows, setBorrows] = useState(getBorrows());
  const [search, setSearch] = useState("");

  // تحديث البيانات بشكل دوري ومن خلال event storage
  useEffect(() => {
    const refreshBorrows = () => {
      const data = getBorrows();
      const updated = data.map(b => ({
        ...b,
        status: computeStatus(b)
      }));
      setBorrows(updated);
    };

    window.addEventListener('storage', refreshBorrows);
    const interval = setInterval(refreshBorrows, 1000);
    return () => {
      window.removeEventListener('storage', refreshBorrows);
      clearInterval(interval);
    };
  }, []);

  const filteredBorrows = borrows
    .filter(b =>
      b.bookTitle?.toLowerCase().includes(search.toLowerCase()) ||
      b.memberName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(b => {
      const status = computeStatus(b);
      return status === "Active" || status === "Returned" || status === "Overdue";
    });

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : '-';

  return (
    <div className={`borrow-list-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="page-main-content">
        <header className="page-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>📋 Borrow List</h1>
        </header>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث عن كتاب، اسم العضو أو الحالة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="borrow-container">
          <table className="borrow-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Title</th>
                <th>Member Name</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrows.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.bookTitle}</td>
                  <td>{b.memberName}</td>
                  <td>{formatDate(b.issueDate)}</td>
                  <td>{formatDate(b.dueDate)}</td>
                  <td>{formatDate(b.returnDate)}</td>
                  <td>
                    <span className={`status-badge ${b.status?.toLowerCase()}`}>
                      {computeStatus(b)}
                    </span>
                  </td>
                  <td>{b.fine > 0 ? `${b.fine} EGP` : '-'}</td>
                </tr>
              ))}
              {filteredBorrows.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    لا توجد نتائج مطابقة للبحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowList;










