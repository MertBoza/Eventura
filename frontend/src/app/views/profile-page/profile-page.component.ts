// ✅ edit-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../views/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-page.component.html'
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  updatedEmail = '';
  updatedFirstName = '';
  updatedLastName = '';
  updatedPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.updatedEmail = this.user.email;
      // Këto mund të vijnë nga backend nëse API i mbështet ato
      // this.updatedFirstName = this.user.firstName;
      // this.updatedLastName = this.user.lastName;
    }
  }

  saveChanges() {
    if (!this.user) return;

    const updatedData: any = {
      email: this.updatedEmail,
      firstName: this.updatedFirstName,
      lastName: this.updatedLastName
    };

    if (this.updatedPassword.trim() !== '') {
      updatedData.password = this.updatedPassword;
    }

    this.authService.updateUser(String(this.user.id), updatedData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong while updating profile');
      }
    });
  }
}
