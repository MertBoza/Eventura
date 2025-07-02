import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../views/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    const isAuthenticated = this.authService.isAuthenticatedNow();

    if (!isAuthenticated || !user || user.roleId !== 3) {
      this.router.navigate(['/homepage']);
    }
  }
}
