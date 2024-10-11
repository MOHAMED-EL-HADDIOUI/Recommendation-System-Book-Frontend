import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookServiceService} from "../service/book-service.service";
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book";
import {UserServiceService} from "../service/user-service.service";
import {RegisterRequest} from "../models/RegisterRequest";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  totalPages: number = 0;
  errorMessage: string | undefined;
  infoUser !:Observable<RegisterRequest>;
  infoUser_ !:RegisterRequest;

  constructor(public authService: AuthService,private router: Router,private userServiceService :UserServiceService) {
  }
  ngOnInit(): void {
    this.getBooksRatedByUser();
    this.getInfo();
  }
  public getBooksRatedByUser()
  {
    this.data = this.userServiceService.getBooksRatedByUser(this.currentPagee).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

    this.data.subscribe((booksDTOS: BooksDTOS) => {
      this.totalPages = booksDTOS.totalpage;
      this.books = booksDTOS.bookDTOList;
    });

  }
  logout(): void {
    this.authService.logout();  // Supprime le token
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }
  getInfo(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const username = decodedToken.sub;
        this.authService.setUsername(username); // Set username in authService if needed
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    this.infoUser = this.userServiceService.getInfoUser();

    this.infoUser.subscribe({
      next: (registerRequest: RegisterRequest) => {
        this.infoUser_ = registerRequest; // Store the received user data
        console.log('User Info:', this.infoUser_); // Log the received user information
      },
      error: (err) => {
        console.error('Error fetching user info:', err); // Log any errors encountered
      }
    });
  }
  previousPage(): void {
    if (this.currentPagee >= 1) {
      this.currentPagee--;
      this.getBooksRatedByUser();
    }
  }

  nextPage(): void {
    if (this.currentPagee < this.totalPages) {
      this.currentPagee++;
      this.getBooksRatedByUser();
    }
  }

  navigateToBook(id_book: string) {
    this.router.navigate(['/book/', id_book]);
  }


}