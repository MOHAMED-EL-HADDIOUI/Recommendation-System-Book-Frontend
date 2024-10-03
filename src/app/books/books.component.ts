import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {async,catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book";
import {BookServiceService} from "../service/book-service.service";
import {HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [BookServiceService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  data!: Observable<BooksDTOS>;
  books!: Book[];
  currentPagee: number = 0;
  searchFormGroup!: UntypedFormGroup;
  totalPages: number = 0;
  errorMessage: string | undefined;

  constructor(private bookServiceService: BookServiceService,private router:Router, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.searchBooks();
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


  protected readonly async = async;
}
