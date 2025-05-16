import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService, User } from '../../views/services/auth.service'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = []
  selectedUser: User | null = null
  editMode = false
  loading = false
  error: string | null = null

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers() {
    this.loading = true
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data
        this.loading = false
      },
      error: (err) => {
        this.error = err.message
        this.loading = false
      },
    })
  }

  viewUser(user: User) {
    this.selectedUser = { ...user }
    this.editMode = false
  }

  editUser(user: User) {
    this.selectedUser = { ...user }
    this.editMode = true
  }

  saveUser() {
    if (!this.selectedUser) return
    this.authService.updateUser(this.selectedUser.id.toString(), this.selectedUser).subscribe({
      next: (updatedUser) => {
        this.fetchUsers()
        this.editMode = false
        this.selectedUser = null
      },
      error: (err) => {
        this.error = err.message
      },
    })
  }

  deleteUser(user: User) {
    if (!confirm(`Are you sure you want to delete ${user.email}?`)) return
    this.authService.deleteUser(user.id.toString()).subscribe({
      next: () => {
        this.fetchUsers()
      },
      error: (err) => {
        this.error = err.message
      },
    })
  }

  cancel() {
    this.selectedUser = null
    this.editMode = false
  }
}
