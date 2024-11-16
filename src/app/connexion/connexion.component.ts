import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../service/AuthService"; // Importation correcte du décodeur JWT
import { jwtDecode } from 'jwt-decode';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import Swal from "sweetalert2";
import {AuthInterceptor} from "../security/auth.interceptor";
import {BookServiceService} from "../service/book-service.service";
import {UserServiceService} from "../service/user-service.service";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BookServiceService,UserServiceService,AuthService
  ]
})
export class ConnexionComponent {
  credentials = {
    gmail: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        const accessToken = response.access_token;
        if (accessToken) {
          this.authService.saveToken(accessToken);
          try {
            // Décoder le token pour obtenir les infos utilisateur
            const decodedToken: any = jwtDecode(accessToken);
            const username = decodedToken.sub; // Assure-toi que la clé "sub" correspond bien au nom d'utilisateur
            // Stocker le nom de l'utilisateur pour l'utiliser dans d'autres composants
            this.authService.setUsername(username);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Connexion réussie!',
              showConfirmButton: false,
              timer: 1500
            });
            // Redirection vers la page d'accueil
            this.router.navigate(['/profil']);
          } catch (error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Une erreur est survenue lors de l\'inscription.',
              text: 'Erreur lors du décodage du token.',
              showConfirmButton: false,
              timer: 2000
            });
          }

        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Une erreur est survenue lors de l\'inscription.',
            text: 'Échec de l\'authentification, aucun token reçu',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erreur lors de l\'authentification:',
          text: error.error?.message || 'Veuillez réessayer plus tard.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
