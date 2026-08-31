import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuoteService } from '../../services/quote-service';
import { CreateQuoteModel} from '../../models/create-quote';

@Component({
  selector: 'app-create-quote',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-quote.html',
  styleUrl: './create-quote.css',
})
export class CreateQuote {
  quoteForm;
  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private router: Router)
  {
    this.quoteForm = this.formBuilder.group({
    text: ['', Validators.required],
    author: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      return;
    }
    const data: CreateQuoteModel = {
      text: this.quoteForm.value.text!,
      author: this.quoteForm.value.author!
    };

    this.quoteService.createQuote(data).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (error) => {
        console.error('Failed to create quote', error);
      }
    });
  }

}
