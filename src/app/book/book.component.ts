import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookServiceService} from "../service/book-service.service";
import {Book, BooksDTOS} from "../models/book";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../service/AuthService";
import {jwtDecode} from "jwt-decode";
import {UserServiceService} from "../service/user-service.service";
import {catchError, Observable, throwError} from "rxjs";
import {BookratingService} from "../service/bookrating.service";
import {AuthInterceptor} from "../security/auth.interceptor";

@Component({
  standalone: true,
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BookServiceService,UserServiceService,AuthService
  ]
})
export class BookComponent implements OnInit {
  id_book: string | null = "";
  book!: Book;
  bookRating!: number;
  bookRating_!: Observable<number>;

  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  errorMessage: string | undefined;


  showRatingForm = false;
  currentRating = 0;

  constructor(
    private bookServiceService: BookServiceService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    private userServiceService: UserServiceService,
    private bookratingService:BookratingService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id_book = params.get('id_book');
      this.fetchBookDetails(this.id_book);
    });
    this.getInfo();
    this.getBooksRecommendForBook(this.id_book);
    this.bookRating_ = this.bookratingService.getbookRating(this.id_book);
    this.bookRating_.subscribe((bookRating_: number) => {
      this.bookRating = bookRating_;
    });
  }

  fetchBookDetails(id_book: string | null): void {
    if (id_book) {
      this.bookServiceService.getBook(id_book).subscribe(
        (data: Book) => {
          this.book = data;
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    }
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

  rate(star: number) {
    this.currentRating = star;
  }
  navigateToBook(id_book: string) {
    this.router.navigate(['/book/', id_book]);
  }

  public getBooksRecommendForBook(id_book: string | null) {
    this.data = this.bookServiceService.getBooksRecommendForBook(id_book, this.currentPagee).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

    this.data.subscribe((booksDTOS: BooksDTOS) => {
      this.books = booksDTOS.bookDTOList;
    });
  }

  submitRating() {
    if (this.id_book) {
      console.log(this.currentRating)
      this.bookratingService.rateBook(this.id_book, this.currentRating).subscribe(
        () => {
          console.log('Book rated successfully');
          this.bookRating = this.currentRating;
          this.showRatingForm = false;
        },
        error => {
          console.error('Error rating book:', error);
        }
      );
    }
  }
}
