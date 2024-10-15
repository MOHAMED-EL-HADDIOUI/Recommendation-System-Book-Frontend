import { TestBed } from '@angular/core/testing';

import { BookratingService } from './bookrating.service';

describe('BookratingService', () => {
  let service: BookratingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookratingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
