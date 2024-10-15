import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book";
import {BookServiceService} from "../service/book-service.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../service/AuthService";
import {jwtDecode} from "jwt-decode";

@Component({
  standalone: true,
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [BookServiceService]
})
export class BooksComponent implements OnInit {
  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  searchFormGroup!: FormGroup;
  totalPages: number = 0;
  errorMessage: string | undefined;

  constructor(private bookServiceService: BookServiceService, public authService: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: ['', Validators.required]
    });
    this.searchBooks();
    this.getInfo();
  }

  public searchBooks() {
    let kw = this.searchFormGroup.get('keyword')?.value;
    this.data = this.bookServiceService.searchBooks(kw, this.currentPagee).pipe(
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
