import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    checkOverdueBooks();
    const interval = setInterval(checkOverdueBooks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkOverdueBooks = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'member') return;

    const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
    const userBorrows = borrows.filter(b => b.memberId === user.id && b.status === 'Active');
    
    const today = new Date();
    const overdue = userBorrows.filter(borrow => {
      const dueDate = new Date(borrow.dueDate);
      return dueDate < today;
    });

    if (overdue.length > 0) {
      const newNotifications = overdue.map(borrow => ({
        id: borrow.id,
        message: `⚠️ الكتاب "${borrow.bookTitle}" متأخر! تاريخ الاستحقاق: ${borrow.dueDate}`,
        type: 'overdue',
        date: new Date().toISOString()
      }));
      setNotifications(newNotifications);
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      <button 
        className="notification-bell" 
        onClick={() => setShowNotifications(!showNotifications)}
      >
        🔔 {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </button>
      
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>الإشعارات</h3>
            <button onClick={() => setShowNotifications(false)}>✕</button>
          </div>
          <div className="notification-list">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <p>{notification.message}</p>
                <button onClick={() => dismissNotification(notification.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;










