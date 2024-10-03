import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-contact',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
