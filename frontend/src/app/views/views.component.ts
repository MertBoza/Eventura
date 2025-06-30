import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RoleService, Role } from './services/role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-views',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './views.component.html',
  styleUrl: './views.component.scss'
})
export class ViewsComponent implements OnInit {
  private authService = inject(AuthService);
  private roleService = inject(RoleService);

  private roles = signal<Role[]>([]);
  private isAdminUser = signal(false);

  constructor() {
    effect(() => {
      const user = this.authService.getCurrentUser();
      const roles = this.roles();

      console.log('User from AuthService:', user);
      console.log('Roles from RoleService:', roles);

      if (user && roles.length > 0) {
        const adminRole = roles.find(role => role.name.toLowerCase() === 'admin');
        const isAdmin = !!(adminRole && user.roleId === adminRole.id);
        console.log('Is Admin User:', isAdmin);
        this.isAdminUser.set(isAdmin);
      } else {
        this.isAdminUser.set(false);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
        this.roles.set([]);
      }
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticatedNow();
  }

  get isAdmin(): boolean {
    return this.isAdminUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
