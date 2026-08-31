import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateBook as CreateBookModel} from '../../models/create-book';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-book',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-book.html',
  styleUrl: './create-book.css',
})
export class CreateBook {
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.formBuilder.group({

      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationDate: ['', Validators.required]

    });
  }


  onSubmit(): void {
    if (this.bookForm.invalid) {return;}

    const data: CreateBookModel = {
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      publicationDate: this.bookForm.value.publicationDate!
    };
    this.bookService.createBook(data).subscribe({
      next: (response) => {
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Failed to create book', error);
      }
    });
  }
}
