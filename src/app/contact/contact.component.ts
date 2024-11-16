import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {BookServiceService} from "../service/book-service.service";
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "../security/auth.interceptor";
import {UserServiceService} from "../service/user-service.service";

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [
    NgIf,HttpClientModule, ReactiveFormsModule,CommonModule
  ],
  styleUrl: './contact.component.css',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },AuthService
  ]
})
export class ContactComponent  implements OnInit {
  ngOnInit(): void {
    this.getInfo();
  }
  constructor(public authService: AuthService,private router: Router) {}

  logout(): void {
    this.authService.logout();  // Supprime le token
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }
  getInfo(): void {
    const username = localStorage.getItem('username');
    if (username) {
      try {
        this.authService.setUsername(username);
      } catch (error) {
      }

    }
  }

}
