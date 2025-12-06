// FinesReport.js
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import './FinesReport.css';

const FinesReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
  const fines = borrows
    .filter(b => b.status === 'active' || b.status === 'Active')
    .map(borrow => {
      const dueDate = new Date(borrow.dueDate);
      const today = new Date();
      const daysOverdue = Math.max(0, Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)));
      const fineAmount = daysOverdue > 0 ? daysOverdue * 5 : 0;
      return { id: borrow.id, memberName: borrow.memberName, bookTitle: borrow.bookTitle, daysOverdue, fineAmount };
    })
    .filter(f => f.fineAmount > 0);

  const totalFines = fines.reduce((sum, fine) => sum + fine.fineAmount, 0);

  return (
    <div className={`report-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div className="page-main-content">
        <header className="page-header">
          <button className="menu-toggle" type="button" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
          <h1>💰 Fines Report</h1>
          <button className="export-btn" type="button">📥 Export PDF</button>
        </header>

        <div className="report-container">
          <div className="report-summary">
            <div className="summary-card">
              <h3>Total Fines</h3>
              <p className="summary-value">${totalFines}</p>
            </div>
          </div>

          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member Name</th>
                  <th>Book Title</th>
                  <th>Days Overdue</th>
                  <th>Fine Amount</th>
                </tr>
              </thead>
              <tbody>
                {fines.map(fine => (
                  <tr key={fine.id}>
                    <td>{fine.id}</td>
                    <td>{fine.memberName}</td>
                    <td>{fine.bookTitle}</td>
                    <td>{fine.daysOverdue} days</td>
                    <td className="fine-amount">${fine.fineAmount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="total-label">Total</td>
                  <td className="total-amount">${totalFines}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinesReport;