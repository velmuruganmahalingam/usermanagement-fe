import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  filtersForm: FormGroup;
  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.filtersForm = this.fb.group({
      search: [''],
      role: ['']
    });
  }

  ngOnInit() {
    this.fetchUsers();

    this.filtersForm.valueChanges.subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    const filters = this.filtersForm.value;
    this.userService.getUsers(filters).subscribe((users: any[]) => {
      this.users = users;
      this.applyFilters(); 
    });
  }

  applyFilters(): void {
    const { search, role } = this.filtersForm.value;

    // Filter users based on search and role
    this.filteredUsers = this.users.filter(user => {
      const searchTerm = search.toLowerCase();
      const matchesSearch = user.firstName.toLowerCase().includes(searchTerm) ||
                            user.lastName.toLowerCase().includes(searchTerm) ||
                            user.email.toLowerCase().includes(searchTerm) ||
                            user.mobile.includes(searchTerm);
                            const matchesRole = role ? user.role === role : true;

      return matchesSearch && matchesRole;
    });
    console.log('Filtered Users:', this.filteredUsers);
  }

  logout(): void {
    // Clear user authentication details, if any
    this.userService.logout().subscribe(() => {
      // Redirect to login page or home page
      this.router.navigate(['/login']);
    });
  }
}
