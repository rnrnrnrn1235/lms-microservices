package com.ghada.library.libraryController;

import org.springframework.web.bind.annotation.*;

import com.ghada.library.libraryModel.Book;
import com.ghada.library.libraryService.BookService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/library/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service){ this.service = service; }

    @GetMapping
    public List<Book> getAll(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getOne(@PathVariable String id){
        Book b = service.findById(id);
        return b == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(b);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<Book> create(@RequestBody Book book){
        Book saved = service.create(book);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<Book> update(@PathVariable String id, @RequestBody Book book){
        Book updated = service.update(id, book);
        return updated == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('LIBRARIAN', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

//search
    @GetMapping("/search")
public List<Book> searchByTitle(@RequestParam("q") String q) {
    return service.searchByTitle(q);
}
 //Tests**********************************************************************:
 @GetMapping("/test")
    public HttpStatus test(){
        return HttpStatus.OK;
    }


}

