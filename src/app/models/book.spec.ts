import { Book } from './book';

describe('Book', () => {
    it('should create an instance', () => {
    const newBook = new Book(
        '1234567890',  // ISBN
        'Sample Title',  // Title
        'Author Name',   // Author
        2010,
        'Publisher Name',  // Publisher
        'imageURLS',   // Genre
        "imageURLM",       // Price
        "imageURLL"          // Rating
    );
    expect(newBook).toBeTruthy();
  });
});
