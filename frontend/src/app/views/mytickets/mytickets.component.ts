import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../services/tickets.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.scss']
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.error = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    this.ticketService.getTickets(user.id).subscribe({
      next: (data) => {
        this.tickets = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load tickets';
        this.isLoading = false;
      }
    });
  }
}
