import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './IssueBook.css';

const IssueBook = () => {
  const navigate = useNavigate();
  const { borrowId } = useParams();

  const [formData, setFormData] = useState({
    memberId: '',
    bookId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: ''
  });

  useEffect(() => {
    if (borrowId) {
      const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');
      const borrow = borrows.find(b => b.id === parseInt(borrowId));
      if (borrow) {
        setFormData({
          memberId: borrow.memberId,
          bookId: borrow.bookId,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: borrow.dueDate || ''
        });
      }
    }
  }, [borrowId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const book = books.find(b => b.id === parseInt(formData.bookId));
    if (!book) return alert('الكتاب غير موجود');
    if (book.available <= 0) return alert('الكتاب غير متاح حالياً');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const member = users.find(u => u.id === parseInt(formData.memberId) && u.role === 'member');
    if (!member) return alert('العضو غير موجود');

    const issueDate = new Date(formData.issueDate);
    const calculatedDueDate = new Date(issueDate);
    calculatedDueDate.setDate(calculatedDueDate.getDate() + 30);

    let borrows = JSON.parse(localStorage.getItem('borrows') || '[]');

    if (borrowId) {
      borrows = borrows.map(b => {
        if (b.id === parseInt(borrowId)) {
          return {
            ...b,
            issueDate: formData.issueDate,
            dueDate: formData.dueDate || calculatedDueDate.toISOString().split('T')[0],
            status: 'active',
            deleted: true // الرسالة تختفي من الإشعارات
          };
        }
        return b;
      });
    } else {
      const borrowRecord = {
        id: Date.now(),
        bookId: parseInt(formData.bookId),
        bookTitle: book.title,
        memberId: parseInt(formData.memberId),
        memberName: member.name,
        issueDate: formData.issueDate,
        dueDate: formData.dueDate || calculatedDueDate.toISOString().split('T')[0],
        returnDate: null,
        status: 'active',
        fine: 0,
        deleted: false
      };
      borrows.push(borrowRecord);
    }

    localStorage.setItem('borrows', JSON.stringify(borrows));
    window.dispatchEvent(new Event('storage'));

    book.available -= 1;
    book.status = book.available > 0 ? 'Available' : 'Unavailable';
    const updatedBooks = books.map(b => b.id === book.id ? book : b);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    alert('تم إصدار الكتاب بنجاح!');
    navigate('/librarian/borrow/list');
  };

  return (
    <div className="issue-book-page">
      <header className="page-header">
        <h1>📖 Issue Book</h1>
        <button onClick={() => navigate('/librarian/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="issue-form">
          <div className="form-group">
            <label htmlFor="memberId">Member ID</label>
            <input
              type="text"
              id="memberId"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookId">Book ID</label>
            <input
              type="text"
              id="bookId"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issueDate">Issue Date</label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/librarian/dashboard')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;




