import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BookServiceService} from "../service/book-service.service";
import {Book} from "../models/book";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
    providers: [BookServiceService],
    templateUrl: './book.component.html',
    styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
    id_book: string | null = "";
    book!: Book;

    constructor(
        private bookServiceService: BookServiceService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id_book = params.get('id_book');
            this.fetchBookDetails(this.id_book);
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
}
