import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../service/AuthService';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule]
})
export class InscriptionComponent {
  credentials = {
    gmail: '',
    password: '',
    prenom: '',
    nom: '',
    location: '',
    age: '',
    tel: ''
  };
  password2: string = ''; // Variable pour confirmer le mot de passe
  passwordsDoNotMatch: boolean = false; // Indicateur si les mots de passe ne correspondent pas

  constructor(private authService: AuthService, private router: Router) {
  }

  // Fonction pour vérifier si les mots de passe correspondent
  isPasswordMatch(): boolean {
    return this.credentials.password === this.password2;
  }

  // Méthode pour enregistrer un utilisateur
  register(): void {
    // Vérifier si les mots de passe ne correspondent pas
    if (!this.isPasswordMatch() || this.credentials.password == '') {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.authService.register(this.credentials).subscribe(
      (response) => {
        // Vérifie si la réponse contient bien un token
        if (response && response.access_token) {
          const token = response.access_token;
          this.authService.saveToken(token);  // Sauvegarde du token
          this.passwordsDoNotMatch = false;   // Réinitialiser l'état en cas de succès

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inscription réussie!',
            showConfirmButton: false,
            timer: 1500
          });

          // Redirige vers la page de connexion après un court délai pour afficher le message de succès
          setTimeout(() => {
            this.router.navigate(['/profil']);
          }, 1500);
        }
      },
      (error) => {
        // Gérer les erreurs lors de l'inscription
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue lors de l\'inscription.',
          text: error.error?.message || 'Veuillez réessayer plus tard.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
