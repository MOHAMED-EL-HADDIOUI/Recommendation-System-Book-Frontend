import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksDTOS } from '../models/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private baseUrl = environment.apiUrl + '/api/v1/books'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  public getBooks(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(this.baseUrl);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  public saveBook(book: Book): Observable<Book> {
    return this.http.post<any>(this.baseUrl, book);
  }

  public updateBook(book: Book, id_book: string): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/update/${id_book}`, book);
  }

  public searchBooks(keyword: string, page: number): Observable<BooksDTOS> {
    return this.http.get<BooksDTOS>(
      `${this.baseUrl}/search?keyword=${keyword}&page=${page}`
    );
  }
  public getBooksRecommendForBook(id_book: string | null, page: number): Observable<BooksDTOS> {
    return this.http.get<BooksDTOS>(
      `${this.baseUrl}/similaires/${id_book}?page=${page}`
    );
  }
  public getBooksRatedByUser(page: number): Observable<BooksDTOS> {
    // @ts-ignore
    const token: string | null = localStorage.getItem('token'); // Added type annotation
    if (!token) {
      throw new Error('Token not found'); // Handle missing token scenario
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<BooksDTOS>(`${this.baseUrl}/user?page=${page}`, {headers});
  }
  public getBooksrecommendforUser(page: number): Observable<BooksDTOS> {
    // @ts-ignore
    const token: string | null = localStorage.getItem('token'); // Added type annotation
    if (!token) {
      throw new Error('Token not found'); // Handle missing token scenario
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<BooksDTOS>(`${this.baseUrl}/recommend?page=${page}`, {headers});
  }
}
