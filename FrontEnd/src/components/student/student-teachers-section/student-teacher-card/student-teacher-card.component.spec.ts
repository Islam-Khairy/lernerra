import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherCardComponent } from './student-teacher-card.component';

describe('StudentTeacherCardComponent', () => {
  let component: StudentTeacherCardComponent;
  let fixture: ComponentFixture<StudentTeacherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTeacherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentTeacherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
