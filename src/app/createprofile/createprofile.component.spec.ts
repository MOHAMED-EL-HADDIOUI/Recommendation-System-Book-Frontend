import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprofileComponent } from './createprofile.component';

describe('CreateprofileComponent', () => {
  let component: CreateprofileComponent;
  let fixture: ComponentFixture<CreateprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
