import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateBook } from '../../models/create-book';
import { UpdateBook } from '../../models/update-book';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-books',
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  /*bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationDate: ['', Validators.required]
  });
  */
  bookForm! : FormGroup;
  books: any[] = [];
  editingBookId: number | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public auth: Auth
  ) { 
    this.bookForm= this.formBuilder.group({

      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void { 
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books = response;
        console.log('Böcker', response);
      },
      error: (error) => {
        console.error('Failed to get books', error);
      }
    });
  }
  editBook(book: any) : void {
    this.editingBookId = book.id;
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      publicationDate: book.publicationDate
    });
  }

  cancelEdit(): void {
    this.editingBookId = null;
    this.bookForm.reset();
  }
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete book:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }


    if (this.editingBookId !== null) {

      const data: UpdateBook = {
        title: this.bookForm.value.title!,
        author: this.bookForm.value.author!,
        publicationDate: this.bookForm.value.publicationDate!
      };


      this.bookService.updateBook(this.editingBookId, data).subscribe({
        next: () => {
          this.editingBookId = null;
          this.bookForm.reset();
          this.loadBooks();
        },
        error: (error) => {
          console.error('Failed to update book: ', error);
        }
      });
    } else {

      const data: CreateBook = {
        title: this.bookForm.value.title!,
        author: this.bookForm.value.author!,
        publicationDate: this.bookForm.value.publicationDate!
      };
      this.bookService.createBook(data).subscribe({
        next: (response) => {
          console.log('bok skapad', response);
          this.bookForm.reset();
          this.loadBooks();
        },
        error: (error) => {
          console.error('Failed to create book', error);
        }
      });
    }

    

  }

}
