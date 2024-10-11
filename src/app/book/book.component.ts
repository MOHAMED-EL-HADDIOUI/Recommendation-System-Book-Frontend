import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BookServiceService} from "../service/book-service.service";
import {Book, BooksDTOS} from "../models/book";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../service/AuthService";
import {jwtDecode} from "jwt-decode";
import {UserServiceService} from "../service/user-service.service";
import {Observable} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  imports: [CommonModule,HttpClientModule, ReactiveFormsModule],
  providers: [BookServiceService,UserServiceService]
})
export class BookComponent implements OnInit {
    id_book: string | null = "";
    book!: Book;
    bookRating!:number;
    bookRating_!:Observable<number>;

  showRatingForm = false;
  currentRating = 0;

  constructor(
        private bookServiceService: BookServiceService,
        private router: Router,
        public authService: AuthService,
        private route: ActivatedRoute,
        private userServiceService :UserServiceService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id_book = params.get('id_book');
            this.fetchBookDetails(this.id_book);
        });
        this.getInfo();
        this.bookRating_ = this.userServiceService.getbookRating(this.id_book);
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
  rate(star: number) {
    this.currentRating = star;
  }

  submitRating() {
    if (this.id_book) {
      console.log("this.currentRating")
      console.log(this.currentRating)
      this.userServiceService.rateBook(this.id_book, this.currentRating).subscribe(
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
