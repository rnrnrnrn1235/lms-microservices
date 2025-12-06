// SearchBooks.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './SearchBooks.css';

const getStoredBooks = () => {
  const stored = localStorage.getItem('books');
  if (stored) {
    try { return JSON.parse(stored); } 
    catch { return []; }
  }
  return [];
};

const SearchBooks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [books, setBooks] = useState(getStoredBooks());
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const refreshBooks = () => setBooks(getStoredBooks());

  useEffect(() => {
    window.addEventListener('storage', refreshBooks);
    const interval = setInterval(refreshBooks, 1000);
    return () => {
      window.removeEventListener('storage', refreshBooks);
      clearInterval(interval);
    };
  }, []);

  const handleRequestBorrow = (book) => {
    if (!user || user.role !== 'member') 
      return alert('Only members can borrow!');

    if (book.status !== 'Available') 
      return alert('This book is not available for borrowing!');

    const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');

    const newBorrow = {
      id: Date.now(),
      bookId: book.id,
      bookTitle: book.title,
      memberId: user.id,
      memberName: user.name,
      status: "pending",
      requestDate: new Date().toISOString()
    };

    borrows.push(newBorrow);
    localStorage.setItem('borrows', JSON.stringify(borrows));
    window.dispatchEvent(new Event('storage'));

    const storedNotifs = JSON.parse(localStorage.getItem('memberNotifications') || '{}');
    const memberNotifs = storedNotifs[user.id] || [];
    memberNotifs.push({
      id: Date.now(),
      message: `طلب استعارة الكتاب "${book.title}" تم إرساله!`,
      date: new Date().toISOString()
    });
    storedNotifs[user.id] = memberNotifs;
    localStorage.setItem('memberNotifications', JSON.stringify(storedNotifs));

    alert("Request sent to librarian!");
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.isbn && b.isbn.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`search-books-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="page-main-content" style={{ minHeight: '100vh', padding: '30px' }}>
        <header className="page-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1>🔍 Search Books</h1>
        </header>

        <div className="search-box" style={{ marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="books-grid">
          {filteredBooks.length === 0 && <div className="no-results">No books found.</div>}
          {filteredBooks.map(book => {
            // قراءة الاستعارات من التخزين لمعرفة حالة الكتاب
            const borrows = JSON.parse(localStorage.getItem('borrows') || '[]');

            // تحقق من استعارة المستخدم الحالية (Active)
            const userActiveBorrow = borrows.find(
              b => b.bookId === book.id && b.memberId === user.id && b.status === 'active'
            );

            // تحقق إذا تم نقل الاستعارة إلى التاريخ (History)
            const userHistoryBorrow = borrows.find(
              b => b.bookId === book.id && b.memberId === user.id && b.status === 'history'
            );

            // تحديد حالة الزر
            let buttonLabel = 'Request Borrow';
            let disableButton = false;

            if (userActiveBorrow) {
              buttonLabel = 'Borrowed';
              disableButton = true;
            } else if (userHistoryBorrow) {
              buttonLabel = 'Request Borrow';
              disableButton = false;
            }

            return (
              <div key={book.id} className="book-card">
                <div className="book-cover"><span className="book-icon">📚</span></div>
                <div className="book-details">
                  <h3>{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-isbn">ISBN: {book.isbn}</p>
                  <div className="book-availability">
                    {book.status === 'Available'
                      ? <span className="available-badge">✓ Available</span>
                      : <span className="unavailable-badge">✗ Not Available</span>
                    }
                  </div>
                  {book.status === 'Available' && user.role === 'member' && (
                    <button
                      className="borrow-btn"
                      onClick={() => handleRequestBorrow(book)}
                      disabled={disableButton}
                    >
                      {buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;

// SearchBooks.js import React, { useEffect, useState } from 'react'; import Sidebar from '../../components/Sidebar'; import './SearchBooks.css'; const getStoredBooks = () => { const stored = localStorage.getItem('books'); if (stored) { try { return JSON.parse(stored); } catch { return []; } } return []; }; const SearchBooks = () => { const [sidebarOpen, setSidebarOpen] = useState(true); const [books, setBooks] = useState(getStoredBooks()); const [searchTerm, setSearchTerm] = useState(''); const user = JSON.parse(localStorage.getItem('currentUser') || '{}'); const refreshBooks = () => setBooks(getStoredBooks()); useEffect(() => { window.addEventListener('storage', refreshBooks); const interval = setInterval(refreshBooks, 1000); return () => { window.removeEventListener('storage', refreshBooks); clearInterval(interval); }; }, []); const handleRequestBorrow = (book) => { if (!user || user.role !== 'member') return alert('Only members can borrow!'); if (book.status !== 'Available') return alert('This book is not available for borrowing!'); const borrows = JSON.parse(localStorage.getItem('borrows') || '[]'); const newBorrow = { id: Date.now(), bookId: book.id, bookTitle: book.title, memberId: user.id, memberName: user.name, status: "pending", requestDate: new Date().toISOString() }; borrows.push(newBorrow); localStorage.setItem('borrows', JSON.stringify(borrows)); window.dispatchEvent(new Event('storage')); const storedNotifs = JSON.parse(localStorage.getItem('memberNotifications') || '{}'); const memberNotifs = storedNotifs[user.id] || []; memberNotifs.push({ id: Date.now(), message: طلب استعارة الكتاب "${book.title}" تم إرساله!, date: new Date().toISOString() }); storedNotifs[user.id] = memberNotifs; localStorage.setItem('memberNotifications', JSON.stringify(storedNotifs)); alert("Request sent to librarian!"); }; const filteredBooks = books.filter( (b) => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()) || (b.isbn && b.isbn.toLowerCase().includes(searchTerm.toLowerCase())) ); return ( <div className={search-books-page ${!sidebarOpen ? 'sidebar-collapsed' : ''}}> <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> <div className="page-main-content" style={{ minHeight: '100vh', padding: '30px' }}> <header className="page-header"> <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button> <h1>🔍 Search Books</h1> </header> <div className="search-box" style={{ marginBottom: '25px' }}> <input type="text" placeholder="Search by title, author, or ISBN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" /> <span className="search-icon">🔍</span> </div> <div className="books-grid"> {filteredBooks.length === 0 && <div className="no-results">No books found.</div>} {filteredBooks.map(book => ( <div key={book.id} className="book-card"> <div className="book-cover"><span className="book-icon">📚</span></div> <div className="book-details"> <h3>{book.title}</h3> <p className="book-author">by {book.author}</p> <p className="book-isbn">ISBN: {book.isbn}</p> <div className="book-availability"> {book.status === 'Available' ? <span className="available-badge">✓ Available</span> : <span className="unavailable-badge">✗ Not Available</span> } </div> {book.status === 'Available' && user.role === 'member' && ( <button className="borrow-btn" onClick={() => handleRequestBorrow(book)}> Request Borrow </button> )} </div> </div> ))} </div> </div> </div> ); }; export default SearchBooks;








 