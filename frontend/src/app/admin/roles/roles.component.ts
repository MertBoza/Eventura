import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService, Role, Privilege } from '../../views/services/role.service';
import { AuthService } from '../../views/services/auth.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];

  formRole: Role = {
    id: 0,
    name: '',
    description: '',
    privileges: [],
  };

  constructor(private roleService: RoleService, private authService: AuthService) {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.loadRoles();
      } else {
        this.roles = [];
      }
    });
  }

  ngOnInit(): void {
    this.resetForm();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => (this.roles = roles),
      error: (err) => console.error('Error fetching roles', err),
    });
  }

  saveRole() {
   
    const payload = {
      ...this.formRole,
      privileges: this.formRole.privileges.map(({ id,  ...flags }) => ({
        select: flags.select ?? false,
        insert: flags.insert ?? false,
        update: flags.update ?? false,
        delete: flags.delete ?? false,
      })),
    };

    if (this.formRole.id === 0) {
      this.roleService.createRole(payload).subscribe({
        next: (role) => {
          this.roles.push(role);
          this.resetForm();
        },
        error: (err) => console.error('Error creating role', err),
      });
    } else {
      this.roleService.updateRole(this.formRole.id, payload).subscribe({
        next: (role) => {
          const idx = this.roles.findIndex((r) => r.id === role.id);
          if (idx !== -1) this.roles[idx] = role;
          this.resetForm();
        },
        error: (err) => console.error('Error updating role', err),
      });
    }
  }

  editRole(role: Role) {
    this.formRole = JSON.parse(JSON.stringify(role));
  }

  resetForm() {
    this.formRole = {
      id: 0,
      name: '',
      description: '',
      privileges: [],
    };
  }

  addPrivilege() {
    this.formRole.privileges.push({
      select: false,
      insert: false,
      update: false,
      delete: false,
    });
  }

  removePrivilege(index: number) {
    this.formRole.privileges.splice(index, 1);
  }

  deleteRole(roleId: number) {
    this.roleService.deleteRole(roleId).subscribe({
      next: () => {
        this.roles = this.roles.filter((r) => r.id !== roleId);
      },
      error: (err) => console.error('Error deleting role', err),
    });
  }
}
