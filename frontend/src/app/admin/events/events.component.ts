import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event as AppEvent, EventService } from '../../views/services/events.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  events = signal<AppEvent[]>([]);
  error = signal<string | null>(null);

  formEvent = signal<Partial<AppEvent>>({
    name: '',
    description: '',
    date: '',
    location: '',
    categoryId: 0,
    organizerId: 0,
  });

  editingId: number | null = null;
  selectedImageFile: File | null = null;

  constructor(private eventService: EventService) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (events) => this.events.set(events),
      error: (err) => this.error.set(err.message || 'Failed to load events'),
    });
  }

  onFileSelected(event: Event) {
    // Cast the native event target properly:
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    } else {
      this.selectedImageFile = null;
    }
  }

  saveEvent() {
    this.error.set(null);

    if (this.editingId) {
      this.eventService
        .updateEvent(
          this.editingId,
          this.formEvent(),
          this.selectedImageFile ?? undefined
        )
        .subscribe({
          next: () => {
            this.loadEvents();
            this.cancelEdit();
          },
          error: (err) => this.error.set(err.message || 'Update failed'),
        });
    } else {
      this.eventService
        .createEvent(this.formEvent() as AppEvent, this.selectedImageFile ?? undefined)
        .subscribe({
          next: () => {
            this.loadEvents();
            this.cancelEdit();
          },
          error: (err) => this.error.set(err.message || 'Creation failed'),
        });
    }
  }

  editEvent(event: AppEvent) {
    this.editingId = event.id ?? null;
    this.formEvent.set({
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      categoryId: event.categoryId,
      organizerId: event.organizerId,
    });
    this.selectedImageFile = null;
  }

  cancelEdit() {
    this.editingId = null;
    this.formEvent.set({
      name: '',
      description: '',
      date: '',
      location: '',
      categoryId: 0,
      organizerId: 0,
    });
    this.selectedImageFile = null;
  }

  deleteEvent(id?: number) {
    if (!id) return;

    this.eventService.deleteEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: (err) => this.error.set(err.message || 'Delete failed'),
    });
  }
}
