import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event } from '../../services/events.service';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  isLoading = true;
  error: string | null = null;

  ticketSuccess = false;
  ticketError = false;
  ticketPurchased = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }

  buyTicket(): void {
    if (!this.event) return;

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.ticketError = true;
      return;
    }

    const ticket = {
      eventId: this.event.id!,
      userId: user.id,
      price: 10,
    };

    this.ticketService.createTicket(ticket).subscribe({
      next: () => {
        this.ticketSuccess = true;
        this.ticketError = false;
        this.ticketPurchased = true;
      },
      error: () => {
        this.ticketError = true;
        this.ticketSuccess = false;
      }
    });
  }
}
