import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromisesSectionComponent } from './promises-section.component';

describe('PromisesSectionComponent', () => {
  let component: PromisesSectionComponent;
  let fixture: ComponentFixture<PromisesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromisesSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromisesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
