import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book"; // Ensure the path to your Book model is correct
import {environment} from "../../environments/environment";
import {RegisterRequest} from "../models/RegisterRequest";

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {
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

    return this.http.get<BooksDTOS>(`${environment.apiUrl}/bookRatings/books?page=${page}`, {headers});
  }

  public getInfoUser(): Observable<RegisterRequest> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegisterRequest>(`${environment.apiUrl}/user`, { headers });
  }
  public getbookRating(id_book: string | null): Observable<number> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number>(`${environment.apiUrl}/bookRatings/`+id_book, { headers });
  }


  rateBook(bookId: string, rating: number): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construire l'URL de l'API avec le bookId et rating dans le chemin
    const url = `${environment.apiUrl}/bookRatings/${bookId}/${rating}`;

    // Effectuer la requête POST
    return this.http.post(url,{}, { headers });
  }

}
