import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  ngOnInit(): void {

  }

}
