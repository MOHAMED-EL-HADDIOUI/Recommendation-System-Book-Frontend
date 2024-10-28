import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserServiceService} from "../service/user-service.service";
import {BookServiceService} from "../service/book-service.service";
import {catchError, Observable, throwError} from "rxjs";
import {Book, BooksDTOS} from "../models/book";
import {User, UsersDTO} from "../models/user";
import Swal from "sweetalert2";
import {BaseChartDirective} from "ng2-charts";
import {RegisterRequest} from "../models/RegisterRequest";
import {AuthService} from "../service/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  infoUser !:Observable<RegisterRequest>;
  infoUser_ !:RegisterRequest;
  colors: string[] = ["#0b0f3b", "#11195d", "#14248f", "#172386", "#3447e8"];
  data!: Observable<BooksDTOS>;
  topBooks: Book[] = [];
  books!: Book[];
  addBook: Book = new Book(
    '',
    '',
    '',
    new Date().getFullYear(),
    '',
    '',
    '',
    '',
    0,
    0
  );
  addUser: User = new User(
    0,
    '',
    '',
    '',
    '',
    'USER',
    '',
    0,
    ''
  );
  updateBook: Book = new Book(
    '',
    '',
    '',
    new Date().getFullYear(),
    '',
    '',
    '',
    '',
    0,
    0
  );
  updateUser: User = new User(
    0,
    '',
    '',
    '',
    '',
    'USER',
    '',
    0,
    ''
  );
  data_!: Observable<UsersDTO>;
  users!: User[];
  currentPage_: number = 0;
  totalPages_: number = 0;
  size_books: number = 0;
  size_users: number = 0;
  activeCard: string = 'dashboard';
  currentPagee: number = 0;
  totalPages: number = 0;
  errorMessage: string | undefined;
  searchFormGroup!: FormGroup;
  searchFormGroup_!: FormGroup;


  constructor(
    private userServiceService: UserServiceService,
    private bookServiceService: BookServiceService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: ['', Validators.required],
      choix_: ['title', Validators.required],
      pagesize_: ['5', Validators.required],
    });
    this.searchFormGroup_ = this.fb.group({
      keyword: ['', Validators.required],
      choix: ['nom', Validators.required],
      pagesize: ['5', Validators.required],
    });
    this.getTopBooks();
    this.searchBooks();
    this.searchUsers();
    this.getSize();
    this.getInfo();
  }





  // Toggle sidebar visibility
  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const mainContent = document.getElementById('mainContent') as HTMLElement;
    const textElements = sidebar.querySelectorAll('.menu-item .text');
    const sidebarHeaderh3 = sidebar.querySelector('.sidebar-header h3') as HTMLElement;  // Utiliser querySelector pour un seul élément

    if (sidebar && mainContent) {
      // Bascule la classe "collapsed"
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');

      // Si la barre latérale est réduite (collapsed)
      if (sidebar.classList.contains('collapsed')) {
        sidebar.style.width = '130px';  // Réduire la largeur à 20px
        sidebar.style.margin = '10px';
        textElements.forEach((textElement) => {
          (textElement as HTMLElement).style.display = 'none';  // Cacher le texte
        });
        sidebarHeaderh3.style.display = 'none';
      } else {
        sidebar.style.width = '300px';  // Rétablir la largeur par défaut
        sidebar.style.margin = '5px';
        textElements.forEach((textElement) => {
          (textElement as HTMLElement).style.display = 'inline';  // Afficher le texte
        });
        sidebarHeaderh3.style.display = 'inline';
      }
    }
  }

  public searchBooks() {
    let kw = this.searchFormGroup.get('keyword')?.value;
    let choix_ = this.searchFormGroup.get('choix_')?.value;
    let pagesize_ = this.searchFormGroup.get('pagesize_')?.value;
    this.data = this.bookServiceService.searchBooks_(kw, choix_, this.currentPagee, pagesize_).pipe(
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

  getTopBooks(): void {
    console.log("get books");
    this.bookServiceService.getTop5Books().subscribe(
      (books) => {
        this.topBooks = books;
      },
      (error) => {
        console.error('Error fetching top books', error);
      }
    );
  }
  searchUsers(): void {
    let kw = this.searchFormGroup_.get('keyword')?.value;
    let choix = this.searchFormGroup_.get('choix')?.value;
    let pagesize = this.searchFormGroup_.get('pagesize')?.value;
    this.data_ = this.userServiceService.searchUsers(kw, choix, this.currentPage_, pagesize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

    this.data_.subscribe((usersDTO: UsersDTO) => {
      this.totalPages_ = usersDTO.totalpage;
      this.users = usersDTO.userDTOList;
    });

  }


  // Modal management
  openModalBook(modalId: string, book: Book): void {
    this.updateBook = book;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openModalUser(modalId: string, user: User): void {
    this.updateUser = user;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }
  getInfo(): void {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (username && role) {
      try {
        this.authService.setUsername(username);
        this.authService.setRole(role);
      } catch (error) {
      }
    }
    this.infoUser = this.userServiceService.getInfoUser();

    this.infoUser.subscribe({
      next: (registerRequest: RegisterRequest) => {
        this.infoUser_ = registerRequest; // Store the received user data
      },
      error: (err) => {
        console.error('Error fetching user info:', err); // Log any errors encountered
      }
    });
  }

  getSize(): void {

    this.bookServiceService.getSizeBooks().subscribe(
      (data: number) => {
        this.size_books = data;
      },
      (error) => {
        console.error('Error fetching size:', error);
      }
    );
    this.userServiceService.getSizeUsers().subscribe(
      (data: number) => {
        this.size_users = data;
      },
      (error) => {
        console.error('Error fetching size:', error);
      }
    );
  }


  switch(card: string): void {
    this.activeCard = card;
  }

  previousPage(): void {
    if (this.currentPagee >= 1) {
      this.currentPagee--;
    }
    this.searchBooks()

  }

  nextPage(): void {
    if (this.currentPagee < this.totalPages) {
      this.currentPagee++;
    }
    this.searchBooks()
  }

  previousPage_(): void {
    if (this.currentPage_ >= 1) {
      this.currentPage_--;
    }
    this.searchUsers()

  }

  nextPage_(): void {
    if (this.currentPage_ < this.totalPages_) {
      this.currentPage_++;
    }
    this.searchUsers()
  }


  saveBook(): void {
    console.log(this.addBook)
    this.bookServiceService.saveBook(this.addBook).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le livre a été ajouté avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.closeModal('bookModal');
    this.addBook = new Book(
      '',
      '',
      '',
      new Date().getFullYear(),
      '',
      '',
      '',
      '',
      0,
      0
    );

  }

  saveUser(): void {
    console.log(this.addUser)
    this.userServiceService.saveUser(this.addUser).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le user a été ajouté avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.closeModal('userModal');
    this.addUser = new User(
      0,
      '',
      '',
      '',
      '',
      'USER',
      '',
      0,
      ''
    );

  }

  updateBook_(): void {
    console.log(this.updateBook)
    this.bookServiceService.updateBook(this.updateBook, this.updateBook.isbn).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le livre a été mis à jour avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.closeModal('updateBookModal');
    this.updateBook = new Book(
      '',
      '',
      '',
      new Date().getFullYear(),
      '',
      '',
      '',
      '',
      0,
      0
    );
  }

  updateUser_(): void {
    console.log(this.updateUser)
    this.userServiceService.updateUser(this.updateUser, this.updateUser.id).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le user a été mis à jour avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.closeModal('updateUserModal');
    this.updateUser = new User(
      0,
      '',
      '',
      '',
      '',
      'USER',
      '',
      0,
      ''
    );
  }

  deleteUser(id: number): void {
    this.userServiceService.deteteUser(id).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le user a été supprimer avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.searchUsers();
  }

  deleteBook(id: string): void {
    this.bookServiceService.deteteBook(id).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Le livre a été supprimer avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Une erreur est survenue.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
    this.searchBooks();
  }


    logout() {
      this.authService.logout();  // Supprime le token
      this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
    }

    navigateToHome() {
      this.router.navigate(['/']);  // Redirige vers la page de home
    }

  navigateToProfil() {
    this.router.navigate(['/profil']);  // Redirige vers la page de profil

  }
}
