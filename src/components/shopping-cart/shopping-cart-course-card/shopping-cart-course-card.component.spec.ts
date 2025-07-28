import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartCourseCardComponent } from './shopping-cart-course-card.component';

describe('ShoppingCartCourseCardComponent', () => {
  let component: ShoppingCartCourseCardComponent;
  let fixture: ComponentFixture<ShoppingCartCourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartCourseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
