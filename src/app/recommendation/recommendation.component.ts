import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book";
import {BookServiceService} from "../service/book-service.service";
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode/build/esm";
import {UserServiceService} from "../service/user-service.service";

@Component({
  selector: 'app-recommendation',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent implements OnInit{
  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  totalPages: number = 0;
  errorMessage: string | undefined;

  constructor(private userServiceService :UserServiceService,public authService: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchBooks();
  }

  public searchBooks() {
    this.data = this.userServiceService.getBooksrecommendforUser(this.currentPagee).pipe(
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

  previousPage(): void {
    if (this.currentPagee >= 1) {
      this.currentPagee--;
      this.searchBooks();
    }
  }

  nextPage(): void {
    if (this.currentPagee < this.totalPages) {
      this.currentPagee++;
      this.searchBooks();
    }
  }

  navigateToBook(id_book: string) {
    this.router.navigate(['/book/', id_book]);
  }
  logout(): void {
    this.authService.logout();  // Supprime le token
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }

}
