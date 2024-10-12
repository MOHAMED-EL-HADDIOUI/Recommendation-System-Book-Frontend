import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { RegisterRequest } from "../models/RegisterRequest";
import { AuthService } from "../service/AuthService";
import { Router } from "@angular/router";
import { UserServiceService } from "../service/user-service.service";
import Swal from "sweetalert2";
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-createprofile',
  standalone: true,
  imports: [
    CommonModule, // Ajout du CommonModule pour utiliser les composants Angular de base
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css'] // Corrected styleUrl to styleUrls
})
export class CreateprofileComponent implements OnInit {

  profileForm!: FormGroup; // Initialisation du type
  infoUser!: Observable<RegisterRequest>;
  infoUser_!: RegisterRequest;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userServiceService: UserServiceService
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire avec des validators si nécessaire
    this.profileForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      location: [''],
      tel: ['', Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/)], // Exemple de validation pour le téléphone
      gmail: ['', [Validators.required, Validators.email]], // Validation pour l'email
      password: ['', Validators.required]
    });

    // Charger les informations de l'utilisateur
    this.loadUserProfile();
  }
  logout(): void {
    this.authService.logout();  // Supprime le token
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }

  loadUserProfile() {
    // Récupérer les informations de l'utilisateur via le service
    this.infoUser = this.userServiceService.getInfoUser();

    this.infoUser.subscribe({
      next: (registerRequest: RegisterRequest) => {
        this.infoUser_ = registerRequest;

        // Mise à jour du formulaire avec les données récupérées
        this.profileForm.patchValue({
          prenom: this.infoUser_.prenom,
          nom: this.infoUser_.nom,
          age: this.infoUser_.age,
          location: this.infoUser_.location,
          tel: this.infoUser_.tel,
          gmail: this.infoUser_.gmail,
          password: ''  // Vous pouvez décider de laisser le champ mot de passe vide
        });
      },
      error: (err) => {
        console.error('Error fetching user info:', err);
      }
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const userId = 1;  // L'ID de l'utilisateur (à remplacer par la bonne logique)
      this.userServiceService.updateUserProfile(this.profileForm.value).subscribe(
        (response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Profil mis à jour avec succès!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/profil']);  // Redirige vers la page de connexion
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Une erreur est survenue lors de la mise à jour du profil.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Veuillez remplir correctement tous les champs obligatoires.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
