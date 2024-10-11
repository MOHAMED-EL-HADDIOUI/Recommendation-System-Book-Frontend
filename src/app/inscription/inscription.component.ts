import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthService } from "../service/AuthService";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe, CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule]
})
export class InscriptionComponent {
  credentials = {
    gmail: '',
    password: '',
  };
  password2: string = ''; // Correctly initialize password2 as a string
  passwordsDoNotMatch: boolean = false; // Variable pour stocker l'état de la correspondance des mots de passe

  constructor(private authService: AuthService) { }

  // Fonction pour vérifier si les deux mots de passe sont identiques
  isPasswordMatch(): boolean {
    return this.credentials.password === this.password2;
  }

  // Méthode pour enregistrer un utilisateur
  register(): void {
    // Vérification si les mots de passe ne correspondent pas
    if (!this.isPasswordMatch()) {
      this.passwordsDoNotMatch = true;
      return; // Arrêter l'exécution si les mots de passe ne correspondent pas
    }

    // Si les mots de passe correspondent, procéder à l'inscription
    this.authService.register(this.credentials).subscribe(response => {
      const token = response.access_token;
      this.authService.saveToken(token); // Stocker le token JWT
      this.passwordsDoNotMatch = false; // Réinitialiser l'état
      // Ajouter ici une logique de redirection ou de gestion après inscription
    });
  }
}
