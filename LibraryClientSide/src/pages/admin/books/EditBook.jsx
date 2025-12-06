import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import "./EditBook.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Fiction",
    copies: 1,
    available: 0,
    description: "",
  });

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const book = books.find((b) => b.id === parseInt(id, 10));
    if (!book) {
      alert("الكتاب غير موجود");
      navigate("/admin/books");
      return;
    }

    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category || "Fiction",
      copies: book.copies,
      available: book.available,
      description: book.description || "",
    });
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" || name === "available" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.available > formData.copies) {
      alert("النسخ المتاحة لا يمكن أن تكون أكثر من إجمالي النسخ");
      return;
    }

    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const index = books.findIndex((b) => b.id === parseInt(id, 10));
    if (index === -1) return;

    books[index] = {
      ...books[index],
      ...formData,
      status: formData.available > 0 ? "Available" : "Unavailable",
    };

    localStorage.setItem("books", JSON.stringify(books));
    alert("تم تحديث الكتاب بنجاح!");
    navigate("/admin/books");
  };

  return (
    <div className={`edit-book-page ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="page-main-content">
        <header className="page-header">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
          <h1>✏️ Edit Book #{id}</h1>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/admin/books")}
          >
            ← Back to Books
          </button>
        </header>

        <div className="form-container">
          <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Book Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                id="isbn"
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Technology">Technology</option>
                <option value="Literature">Literature</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="copies">Total Copies</label>
                <input
                  id="copies"
                  type="number"
                  name="copies"
                  value={formData.copies}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="available">Available Copies</label>
                <input
                  id="available"
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleChange}
                  min="0"
                  max={formData.copies}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                rows="5"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/admin/books")}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
