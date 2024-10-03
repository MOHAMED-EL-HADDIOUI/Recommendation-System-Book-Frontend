export class Book {
  // Unique identifier for each book
  public isbn: string;

  // Title of the book
  public bookTitle: string;

  // Author of the book
  public bookAuthor: string;

  // Publication year
  public yearOfPublication: number;

  // Publisher of the book
  public publisher: string;

  // Small image URL
  public imageURLS: string;

  // Medium image URL
  public imageURLM: string;

  // Large image URL
  public imageURLL: string;

  constructor(
    ISBN: string,
    bookTitle: string,
    bookAuthor: string,
    yearOfPublication: number,
    publisher: string,
    imageURLS: string,
    imageURLM: string,
    imageURLL: string
  ) {
    this.isbn = ISBN;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.yearOfPublication = yearOfPublication;
    this.publisher = publisher;
    this.imageURLS = imageURLS;
    this.imageURLM = imageURLM;
    this.imageURLL = imageURLL;
  }
}
export interface BooksDTOS {
  bookDTOList: Book[];
  totalpage: number;
}
