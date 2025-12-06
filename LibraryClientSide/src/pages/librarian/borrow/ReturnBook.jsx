import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReturnBook.css';

const ReturnBook = () => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    borrowId: '',
    returnDate: new Date().toISOString().split('T')[0],
    condition: 'good'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
    const borrow = borrows.find(b => b.id === parseInt(formData.borrowId));

    if (!borrow) return alert('سجل الاستعارة غير موجود');
    if (borrow.status === 'returned') return alert('هذا الكتاب تم إرجاعه بالفعل');

    const returnDate = new Date(formData.returnDate);
    const dueDate = new Date(borrow.dueDate);
    const daysOverdue = Math.max(0, Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
    const fineAmount = daysOverdue * 5;

    borrow.returnDate = formData.returnDate;
    borrow.status = 'returned';
    borrow.condition = formData.condition;
    borrow.fine = fineAmount;

    const updatedBorrows = borrows.map(b => b.id === borrow.id ? borrow : b);
    localStorage.setItem('borrows', JSON.stringify(updatedBorrows));

    // تحديث الكتاب
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const book = books.find(b => b.id === borrow.bookId);
    if (book) {
      book.available += 1;
      book.status = book.available > 0 ? 'Available' : 'Unavailable';
      const updatedBooks = books.map(b => b.id === book.id ? book : b);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    }

    if (fineAmount > 0) {
      alert(`تم إرجاع الكتاب بنجاح! الغرامة: ${fineAmount} EGP (${daysOverdue} أيام تأخير)`);
    } else {
      alert('تم إرجاع الكتاب بنجاح!');
    }

    navigate('/my-borrowing-history');
  };

  return (
    <div className="return-book-page">
      <header className="page-header">
        <h1>↩️ Return Book</h1>
        <button onClick={() => navigate('/librarian/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="return-form">
          <div className="form-group">
            <label htmlFor="borrowId">Borrow ID</label>
            <input
              type="text"
              id="borrowId"
              name="borrowId"
              value={formData.borrowId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="condition">Book Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/librarian/dashboard')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Return Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;



