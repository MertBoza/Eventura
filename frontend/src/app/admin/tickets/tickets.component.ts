import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../../views/services/tickets.service';
import { AuthService, User } from '../../views/services/auth.service';
import { EventService, Event } from '../../views/services/events.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets = signal<Ticket[]>([]);
  editingTicket = signal<Ticket | null>(null);
  formTicket: Partial<Ticket> = {};
  errorMessage = '';

  users = signal<User[]>([]);
  events = signal<Event[]>([]);

  constructor(
    private ticketService: TicketService,
    private AuthService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadTickets();
    this.loadUsers();
    this.loadEvents();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets.set(data),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  loadUsers() {
    this.AuthService.getUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  editTicket(ticket: Ticket) {
    this.editingTicket.set(ticket);
    this.formTicket = { ...ticket };
    this.errorMessage = '';
  }

  saveTicket() {
    if (this.editingTicket()) {
      this.ticketService
        .updateTicket(this.editingTicket()!.id!, this.formTicket)
        .subscribe({
          next: () => {
            this.loadTickets();
            this.resetForm();
          },
          error: (err) => (this.errorMessage = err.message),
        });
    } else {
      this.ticketService.createTicket(this.formTicket as Ticket).subscribe({
        next: () => {
          this.loadTickets();
          this.resetForm();
        },
        error: (err) => (this.errorMessage = err.message),
      });
    }
  }

  deleteTicket(id: number) {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    this.ticketService.deleteTicket(id).subscribe({
      next: () => this.loadTickets(),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  resetForm() {
    this.editingTicket.set(null);
    this.formTicket = {};
    this.errorMessage = '';
  }
}
