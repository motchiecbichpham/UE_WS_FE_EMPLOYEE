import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailPageComponent } from './application-detail-page.component';

describe('ApplicationDetailPageComponent', () => {
  let component: ApplicationDetailPageComponent;
  let fixture: ComponentFixture<ApplicationDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
