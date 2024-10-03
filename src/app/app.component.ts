import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import {BooksComponent} from "./books/books.component";
import {BookComponent} from "./book/book.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent,BooksComponent,BookComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Books';
}
