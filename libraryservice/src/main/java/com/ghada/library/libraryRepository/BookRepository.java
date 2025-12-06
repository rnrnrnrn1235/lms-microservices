package com.ghada.library.libraryRepository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ghada.library.libraryModel.Book;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findByTitleContainingIgnoreCase(String titlePart);
}
