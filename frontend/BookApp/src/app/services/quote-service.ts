import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuoteModel } from '../models/quoteModel';
import { UpdateQuote } from '../models/update-quote';
import { CreateQuoteModel } from '../models/create-quote';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = `${environment.apiUrl}/Quote`;
  
  constructor(private http: HttpClient) { }
  //Hämtar alla quotes
  getQuotes(): Observable<QuoteModel[]> {
    return this.http.get<QuoteModel[]>(this.apiUrl);
  }
  createQuote(data:CreateQuoteModel): Observable<QuoteModel> {
    return this.http.post<QuoteModel>(this.apiUrl, data);
  }
  updateQuote(id: number, data: UpdateQuote): Observable<QuoteModel> {
    return this.http.put<QuoteModel>(`${this.apiUrl}/${id}`, data);
  }
  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getQuoteById(id: number): Observable<QuoteModel> {
    return this.http.get<QuoteModel>(`${this.apiUrl}/${id}`);
  }
  
}
