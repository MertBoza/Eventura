import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGalleryComponent } from './eventgallery.component';

describe('EventgalleryComponent', () => {
  let component: EventGalleryComponent;
  let fixture: ComponentFixture<EventGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
