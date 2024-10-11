import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment'; // Utiliser les variables d'environnement

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + '/api/v1/auth'; // URL de l'API backend
  private helper = new JwtHelperService(); // Initialisation de JwtHelperService
  private username: string | null = null; // Utilisation du type string | null

  constructor(private http: HttpClient) {}

  // Setter pour définir le nom d'utilisateur
  setUsername(username: string): void {
    this.username = username;
  }

  // Getter pour obtenir le nom d'utilisateur
  getUsername(): string | null {
    return this.username;
  }

  // Méthode pour se connecter et obtenir le token JWT
  login(credentials: { gmail: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, credentials);
  }

  // Méthode pour s'enregistrer (register)
  register(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, credentials);
  }

  // Méthode pour stocker le token JWT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Méthode pour déconnecter l'utilisateur et supprimer le token
  logout(): void {
    localStorage.removeItem('token');
    this.username = null; // Reset username lors de la déconnexion
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.helper.isTokenExpired(token) : false;
  }

  // Méthode pour rafraîchir le token JWT
  refreshToken(): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh-token`, {});
  }
}
