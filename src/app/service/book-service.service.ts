import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksDTOS } from '../models/book';
import { environment } from '../../environments/environment';
import {UsersDTO} from "../models/user";

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
  deteteBook(id:string):Observable<any>
  {
      // @ts-ignore
      const token: string | null = localStorage.getItem('token'); // Added type annotation
      if (!token) {
          throw new Error('Token not found'); // Handle missing token scenario
      }

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });

    return this.http.delete(`${this.baseUrl}/delete/${id}`,{headers});
  }

  public saveBook(book: Book): Observable<Book> {
    // @ts-ignore
    const token: string | null = localStorage.getItem('token'); // Added type annotation
    if (!token) {
      throw new Error('Token not found'); // Handle missing token scenario
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Book>(`${this.baseUrl}/save`, book,{headers});
  }

  public updateBook(book: Book, id_book: string): Observable<Book> {
    // @ts-ignore
    const token: string | null = localStorage.getItem('token'); // Added type annotation
    if (!token) {
      throw new Error('Token not found'); // Handle missing token scenario
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Book>(`${this.baseUrl}/update/${id_book}`, book,{headers});
  }
  public getTop5Books():Observable<Book[]>{
      // @ts-ignore
      const token: string | null = localStorage.getItem('token'); // Added type annotation
      if (!token) {
          throw new Error('Token not found'); // Handle missing token scenario
      }

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
    return this.http.get<Book[]>(`${this.baseUrl}/findTop5ByWeightedRating`,{headers});
  }
  public searchBooks(keyword: string, page: number): Observable<BooksDTOS> {
    return this.http.get<BooksDTOS>(
      `${this.baseUrl}/search?keyword=${keyword}&page=${page}`
    );
  }
  public searchBooks_(keyword: string,choix: string, page: number,pagesize:number): Observable<BooksDTOS> {
      // @ts-ignore
      const token: string | null = localStorage.getItem('token'); // Added type annotation
      if (!token) {
          throw new Error('Token not found'); // Handle missing token scenario
      }

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
    return this.http.get<BooksDTOS>(
      `${this.baseUrl}/x/search/book?keyword=${keyword}&page=${page}&pagesize=${pagesize}&choix=${choix}`,{headers}
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
  public getSizeBooks(): Observable<number> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number>(`${this.baseUrl}/size`, { headers });
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
