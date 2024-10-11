import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksDTOS } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(environment.apiUrl + '/books');
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:9462/books/${id}`);
  }

  public saveBook(book: Book): Observable<Book> {
    return this.http.post<any>(environment.apiUrl + '/books', book);
  }

  public updateBook(book: Book, id_book: string): Observable<Book> {
    return this.http.put<Book>(environment.apiUrl + '/updatebook/' + id_book, book);
  }

  public searchBooks(keyword: string, page: number): Observable<BooksDTOS> {
    return this.http.get<BooksDTOS>(
      `${environment.apiUrl}/books/search?keyword=${keyword}&page=${page}`
    );
  }
}
