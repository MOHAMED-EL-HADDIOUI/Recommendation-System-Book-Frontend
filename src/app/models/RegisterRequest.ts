export class RegisterRequest {
  id: number;
  prenom: string;
  nom: string;
  gmail: string;
  password: string;
  role: string;
  location: string;
  age: number;
  tel: string;

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
