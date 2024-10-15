import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BooksComponent } from "./books/books.component";
import { BookComponent } from "./book/book.component";
import { ContactComponent } from "./contact/contact.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { AuthGuard } from "./security/auth.guard";
import {ProfilComponent} from "./profil/profil.component";
import {CreateprofileComponent} from "./createprofile/createprofile.component";
import {RecommendationComponent} from "./recommendation/recommendation.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recommendation', component: RecommendationComponent, canActivate: [AuthGuard] },
  { path: 'createprofile', component: CreateprofileComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'books', component: BooksComponent, pathMatch: 'full' },
  { path: 'book/:id_book', component: BookComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
