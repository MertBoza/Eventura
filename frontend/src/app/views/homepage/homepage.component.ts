import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../services/events.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  events: Event[] = [];
  randomEvent: Event | null = null;

  services = [
    { icon: 'bi bi-music-note-beamed', title: 'Live Music', description: 'Live bands and solo performers.' },
    { icon: 'bi bi-lightbulb', title: 'Lighting Design', description: 'Professional lighting setups for ambiance.' },
    { icon: 'bi bi-camera-reels', title: 'Photography', description: 'Capture your special moments.' }
  ];

  gallery: { src: string, alt: string }[] = [];
  testimonials = [
    { name: 'John Doe', role: 'Client', text: 'Absolutely loved the service and execution!' },
    { name: 'Jane Smith', role: 'Bride', text: 'They made my wedding truly magical.' }
  ];

  contactNumber: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadRandomEvents();
  }

  loadRandomEvents(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      const shuffled = data.sort(() => 0.5 - Math.random());
      this.events = shuffled.slice(0, 6);
      this.gallery = shuffled.slice(0, 6).map((event) => ({
        src: 'http://localhost:3000/' + event.imagePath,
        alt: event.name
      }));

      
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        this.randomEvent = data[randomIndex];
      }
    });
  }


}