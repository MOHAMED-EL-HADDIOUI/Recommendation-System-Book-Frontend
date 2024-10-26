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
  public avgRating :number;
  public ratingCount :number;

  constructor(
    ISBN: string,
    bookTitle: string,
    bookAuthor: string,
    yearOfPublication: number,
    publisher: string,
    imageURLS: string,
    imageURLM: string,
    imageURLL: string,
    avgRating: number,
    ratingCount :number
  ) {
    this.isbn = ISBN;
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.yearOfPublication = yearOfPublication;
    this.publisher = publisher;
    this.imageURLS = imageURLS;
    this.imageURLM = imageURLM;
    this.imageURLL = imageURLL;
    this.ratingCount = ratingCount;
    this.avgRating = avgRating;
  }
}
export interface BooksDTOS {
  bookDTOList: Book[];
  totalpage: number;
}
