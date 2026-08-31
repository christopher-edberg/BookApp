import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote-service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UpdateQuote } from '../../models/update-quote';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-quote',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './edit-quote.html',
  styleUrl: './edit-quote.css',
})
export class EditQuote {
  quoteForm;
  quoteId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quoteForm = this.formBuilder.group({
      text: ['', Validators.required],
      author: ['', Validators.required]
    });
    this.quoteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuote();
  }

  loadQuote(): void {
    this.quoteService.getQuoteById(this.quoteId).subscribe({
      next: (quote) => {
        this.quoteForm.patchValue({
          text: quote.text,
          author: quote.author
        });
      },
      error: (error) => {
        console.error('Failed to load quote', error);
      }
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) { return; }

    const data: UpdateQuote = {
      text: this.quoteForm.value.text!,
      author: this.quoteForm.value.author!
    };
    this.quoteService.updateQuote(this.quoteId, data).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (error) => {
        console.error('Failed to edit quote', error);
      }
    });
  }


}
