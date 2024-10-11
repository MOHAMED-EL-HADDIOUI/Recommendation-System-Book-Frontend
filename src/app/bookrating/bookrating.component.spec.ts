import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookratingComponent } from './bookrating.component';

describe('BookratingComponent', () => {
  let component: BookratingComponent;
  let fixture: ComponentFixture<BookratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookratingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
