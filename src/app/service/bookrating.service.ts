import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BookratingService {
  private baseUrl = environment.apiUrl + '/api/v1/bookratings'; // URL de l'API backend

  constructor(private http: HttpClient) {

  }
  public getbookRating(id_book: string | null): Observable<number> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number>(`${this.baseUrl}/`+id_book, { headers });
  }


  public rateBook(bookId: string, rating: number): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Construire l'URL de l'API avec le bookId et rating dans le chemin
    const url = `${this.baseUrl}/${bookId}/${rating}`;

    // Effectuer la requête POST
    return this.http.post(url,{}, { headers });
  }
}
