import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatTheySayCarousalComponent } from './what-they-say-carousal.component';

describe('WhatTheySayCarousalComponent', () => {
  let component: WhatTheySayCarousalComponent;
  let fixture: ComponentFixture<WhatTheySayCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatTheySayCarousalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatTheySayCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
