import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactUsService, ContactMessage } from '../services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
  contact: ContactMessage = { name: '', email: '', subject: '', message: '' };
  success = false;
  error = false;

  constructor(private contactUsService: ContactUsService) {}

  onSubmit() {
    this.success = false;
    this.error = false;

    this.contactUsService.sendMessage(this.contact).subscribe({
      next: () => {
        this.success = true;
        this.contact = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.error = true;
      }
    });
  }
}
