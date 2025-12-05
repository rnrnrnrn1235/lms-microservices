package com.ghada.library.book;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("books")
public class Book {
    @Id
    private String id;
    private String title;
    private String author;
    private String isbn;
    private Integer copies;

    public Book() {}
    public Book(String title, String author, String isbn, Integer copies){
        this.title = title; this.author = author; this.isbn = isbn; this.copies = copies;
    }
    // getters & setters
    public String getId(){ return id; }
    public void setId(String id){ this.id = id; }
    public String getTitle(){ return title; }
    public void setTitle(String t){ this.title = t; }
    public String getAuthor(){ return author; }
    public void setAuthor(String a){ this.author = a; }
    public String getIsbn(){ return isbn; }
    public void setIsbn(String i){ this.isbn = i; }
    public Integer getCopies(){ return copies; }
    public void setCopies(Integer c){ this.copies = c; }
}

