import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSectionHeaderComponent } from './student-section-header.component';

describe('StudentSectionHeaderComponent', () => {
  let component: StudentSectionHeaderComponent;
  let fixture: ComponentFixture<StudentSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSectionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
