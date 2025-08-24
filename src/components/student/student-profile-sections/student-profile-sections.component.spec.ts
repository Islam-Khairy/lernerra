import { ComponentFixture, TestBed } from '@angular/Core/testing';

import { StudentProfileSectionsComponent } from './student-profile-sections.component';

describe('StudentProfileSectionsComponent', () => {
  let component: StudentProfileSectionsComponent;
  let fixture: ComponentFixture<StudentProfileSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileSectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfileSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
