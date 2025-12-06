package com.ghada.library.libraryService;

import org.springframework.stereotype.Service;

import com.ghada.library.libraryModel.Book;
import com.ghada.library.libraryRepository.BookRepository;

import java.util.List;

@Service
public class BookService {
    private final BookRepository repo;
    public BookService(BookRepository repo){ this.repo = repo; }

    public List<Book> findAll(){ return repo.findAll(); }
    public Book findById(String id){ return repo.findById(id).orElse(null); }
    public Book create(Book b){ return repo.save(b); }
    public Book update(String id, Book b){
        Book exist = repo.findById(id).orElse(null);
        if(exist == null) return null;
        exist.setTitle(b.getTitle());
        exist.setAuthor(b.getAuthor());
        exist.setIsbn(b.getIsbn());
        exist.setCopies(b.getCopies());
        return repo.save(exist);
    }
    public void delete(String id){ repo.deleteById(id); }
    public List<Book> searchByTitle(String q) {
    return repo.findByTitleContainingIgnoreCase(q);
}

}

