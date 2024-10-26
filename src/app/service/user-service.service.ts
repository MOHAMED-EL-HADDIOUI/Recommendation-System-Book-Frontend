import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book"; // Ensure the path to your Book model is correct
import {environment} from "../../environments/environment";
import {RegisterRequest} from "../models/RegisterRequest";
import {User, UsersDTO} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = environment.apiUrl + '/api/v1/users'; // URL de l'API backend

  constructor(private http: HttpClient) {
  }

  public getInfoUser(): Observable<RegisterRequest> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegisterRequest>(`${this.baseUrl}/get`, { headers });
  }

  public getSizeUsers(): Observable<number> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<number>(`${this.baseUrl}/size`, { headers });
  }
  public saveUser(user: User): Observable<any> {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/adduser`, user,{headers});
  }

  public updateUser(user: User, id_user: number): Observable<User> {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<User>(`${this.baseUrl}/update/${id_user}`, user,{headers});
  }
  public deteteUser(id_user: number): Observable<any> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/delete/${id_user}`,{headers});
  }

  public searchUsers(keyword: string,choix: string, page: number,pagesize:number): Observable<UsersDTO> {
    const token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      throw new Error('Token not found'); // Handle the case where no token is found
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UsersDTO>(
      `${this.baseUrl}/search?keyword=${keyword}&page=${page}&pagesize=${pagesize}&choix=${choix}`,{headers}
    );
  }




  updateUserProfile(updatedData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/update`, updatedData,{headers});
  }

}
