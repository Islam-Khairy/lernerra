import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeachersSectionComponent } from './student-teachers-section.component';

describe('StudentTeachersSectionComponent', () => {
  let component: StudentTeachersSectionComponent;
  let fixture: ComponentFixture<StudentTeachersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTeachersSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTeachersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
