import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {BooksComponent} from "./books/books.component";
import {BookComponent} from "./book/book.component";
import {ContactComponent} from "./contact/contact.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Keep this route
  { path: 'books', component: BooksComponent },
  { path: 'book/:id_book', component: BookComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
