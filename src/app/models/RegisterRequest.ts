export class RegisterRequest {
  id: number;           // unique identifier for each user
  prenom: string;       // user's first name
  nom: string;          // user's last name
  gmail: string;        // user's email
  password: string;     // user's password
  role: string;         // user's role (could be an enum if you want to restrict roles)
  location: string;     // user's location
  age: number;          // user's age
  tel: string;          // user's telephone number

  constructor(
    id: number,
    prenom: string,
    nom: string,
    gmail: string,
    password: string,
    role: string,
    location: string,
    age: number,
    tel: string
  ) {
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.gmail = gmail;
    this.password = password;
    this.role = role;
    this.location = location;
    this.age = age;
    this.tel = tel;
  }
}
