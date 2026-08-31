import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UpdateBook } from '../../models/update-book';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-book',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook implements OnInit{
  bookForm!: FormGroup;
  bookId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.bookForm = this.formBuilder.group({

      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          publicationDate: book.publicationDate
        });
      },
      error: (error) => {
        console.error('Failed to load book: ', error);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      return;
    }

      const data: UpdateBook = {
        title: this.bookForm.value.title!,
        author: this.bookForm.value.author!,
        publicationDate: this.bookForm.value.publicationDate!
      };


        this.bookService.updateBook(this.bookId, data).subscribe({
          next: () => {
            this.router.navigate(['/books']);
          },
          error: (error) => {
            console.error('Failed to update book: ', error);
          }
        });
    }
  
}
