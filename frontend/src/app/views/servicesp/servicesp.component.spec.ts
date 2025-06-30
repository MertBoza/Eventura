import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicespComponent } from './servicesp.component';

describe('ServicespComponent', () => {
  let component: ServicespComponent;
  let fixture: ComponentFixture<ServicespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicespComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
