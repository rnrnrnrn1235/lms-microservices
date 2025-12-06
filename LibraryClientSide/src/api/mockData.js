// Mock Data for development/testing
export const mockUsers = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Member', status: 'Active', phone: '1234567890' },
  { id: 2, name: 'Sara Mohamed', email: 'sara@example.com', role: 'Librarian', status: 'Active', phone: '1234567891' },
  { id: 3, name: 'Omar Hassan', email: 'omar@example.com', role: 'Member', status: 'Inactive', phone: '1234567892' },
  { id: 4, name: 'Fatima Ibrahim', email: 'fatima@example.com', role: 'Member', status: 'Active', phone: '1234567893' }
];

export const mockBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', status: 'Available', copies: 5, available: 3 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', status: 'Borrowed', copies: 3, available: 0 },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', status: 'Available', copies: 8, available: 5 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', status: 'Available', copies: 4, available: 2 }
];

export const mockBorrows = [
  { id: 1, bookId: 1, bookTitle: 'The Great Gatsby', memberId: 1, memberName: 'Ahmed Ali', issueDate: '2024-01-15', dueDate: '2024-02-15', status: 'Active' },
  { id: 2, bookId: 3, bookTitle: '1984', memberId: 2, memberName: 'Sara Mohamed', issueDate: '2024-01-20', dueDate: '2024-02-20', status: 'Active' },
  { id: 3, bookId: 4, bookTitle: 'Pride and Prejudice', memberId: 3, memberName: 'Omar Hassan', issueDate: '2024-01-10', dueDate: '2024-02-10', status: 'Overdue' }
];

// Mock API functions for development
export const mockAPI = {
  users: {
    getAll: () => Promise.resolve({ data: mockUsers }),
    getById: (id) => Promise.resolve({ data: mockUsers.find(u => u.id === id) }),
    create: (userData) => Promise.resolve({ data: { ...userData, id: mockUsers.length + 1 } }),
    update: (id, userData) => Promise.resolve({ data: { ...userData, id } }),
    delete: (id) => Promise.resolve({ success: true })
  },
  books: {
    getAll: () => Promise.resolve({ data: mockBooks }),
    getById: (id) => Promise.resolve({ data: mockBooks.find(b => b.id === id) }),
    search: (query) => Promise.resolve({ 
      data: mockBooks.filter(b => 
        b.title.toLowerCase().includes(query.toLowerCase()) || 
        b.author.toLowerCase().includes(query.toLowerCase())
      )
    }),
    create: (bookData) => Promise.resolve({ data: { ...bookData, id: mockBooks.length + 1 } }),
    update: (id, bookData) => Promise.resolve({ data: { ...bookData, id } }),
    delete: (id) => Promise.resolve({ success: true })
  },
  borrows: {
    getAll: () => Promise.resolve({ data: mockBorrows }),
    getById: (id) => Promise.resolve({ data: mockBorrows.find(b => b.id === id) }),
    getByUser: (userId) => Promise.resolve({ 
      data: mockBorrows.filter(b => b.memberId === userId) 
    }),
    issue: (borrowData) => Promise.resolve({ data: { ...borrowData, id: mockBorrows.length + 1 } }),
    return: (id) => Promise.resolve({ data: { ...mockBorrows.find(b => b.id === id), status: 'Returned' } }),
    getOverdue: () => Promise.resolve({ data: mockBorrows.filter(b => b.status === 'Overdue') })
  }
};










