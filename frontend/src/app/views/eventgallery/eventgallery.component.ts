import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../services/events.service';
import { CategoryService, Category } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // For ngModel

@Component({
  selector: 'app-eventgallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './eventgallery.component.html',
  styleUrls: ['./eventgallery.component.scss'],
})
export class EventGalleryComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: Category[] = [];
  selectedCategoryId: string = '';
  isLoading = true;
  error: string | null = null;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    // Load categories
    this.categoryService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });

    // Load events
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  onCategoryChange(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.selectedCategoryId) {
      this.filteredEvents = this.events;
    } else {
      const id = Number(this.selectedCategoryId);
      this.filteredEvents = this.events.filter(event => event.categoryId === id);
    }
  }
}
