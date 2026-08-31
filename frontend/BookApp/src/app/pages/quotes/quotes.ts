import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote-service';
import { QuoteModel } from '../../models/quoteModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotes',
  imports: [RouterLink],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes implements OnInit{
  
  quotes: QuoteModel[] = [];
  constructor(private qouteService: QuoteService) {

  }

  ngOnInit(): void {
    this.qouteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: (error) => {
        console.error('Failed to load quotes: ', error);
      }
    });
  }
  //Kollar så man inte har 5 quotes redan då detta är max. Flyttat till html koden
  /*
  canAddQuote(): boolean {
    return this.quotes.length < 5;
  }*/
  deleteQuote(id: number): void {
    this.qouteService.deleteQuote(id).subscribe({
      next: () => {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete quote: ', error);
      }
    });
  }
}
