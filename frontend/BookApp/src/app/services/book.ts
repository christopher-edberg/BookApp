import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBook } from '../models/create-book';
import { UpdateBook } from '../models/update-book';
import { Book } from '../models/book';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/Book`;
  constructor(private http: HttpClient) { }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  createBook(data: CreateBook): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  updateBook(id: number, data: UpdateBook): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, data);
  }
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
