import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../service/AuthService"; // Importation correcte du décodeur JWT
import { jwtDecode } from 'jwt-decode';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule]
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

            // Redirection vers la page d'accueil
            this.router.navigate(['/profil']);
          } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
          }

        } else {
          console.error('Échec de l\'authentification, aucun token reçu');
        }
      },
      (error) => {
        console.error('Erreur lors de l\'authentification:', error);
      }
    );
  }
}
