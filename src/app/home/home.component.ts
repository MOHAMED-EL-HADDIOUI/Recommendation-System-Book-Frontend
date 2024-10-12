import { Book, BooksDTOS } from "../models/book";
import { BookServiceService } from "../service/book-service.service";
import { async, catchError, Observable, throwError } from "rxjs";
import { Component, OnInit } from '@angular/core';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../service/AuthService";
import {AuthInterceptor} from "../security/auth.interceptor";
import {jwtDecode} from "jwt-decode";
import {UserServiceService} from "../service/user-service.service";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    BookServiceService,UserServiceService,HttpClient
  ]
})

export class HomeComponent implements OnInit {
  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  searchFormGroup!: FormGroup;
  totalPages: number = 0;
  errorMessage: string | undefined;

  constructor(private bookServiceService: BookServiceService,
              public authService: AuthService,
              private router:Router, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.searchBooks();
    this.getInfo();

  }

  // Changez private en public ici
  public searchBooks() {
    let kw = this.searchFormGroup.value.keyword;
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
  getInfo():void{
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const username = decodedToken.sub;
        this.authService.setUsername(username);
      } catch (error) {
      }

    }
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


  protected readonly async = async;
}
