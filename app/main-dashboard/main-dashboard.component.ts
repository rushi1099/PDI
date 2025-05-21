import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { InterviewManagementComponent } from '../interview-management/interview-management.component';
import { UserManagementComponent } from '../features/users/user-management/user-management.component';
import { HrDetailsComponent } from '../../hr-details/hr-details.component';

interface User {
  name: string;
  email: string;
  signupDate: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, InterviewManagementComponent, UserManagementComponent, HrDetailsComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  userName: string = '';
  selectedMenu: string = 'users';
  recentUsers: User[] = [
    { name: 'John Doe', email: 'john@example.com', signupDate: '2024-03-20', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', signupDate: '2024-03-19', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@example.com', signupDate: '2024-03-18', status: 'Inactive' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', signupDate: '2024-03-17', status: 'Active' }
  ];
  upcomingInterviews = [
    { candidate: 'Alice Brown', position: 'Developer',hrname:'aAbc',contact:"9823828238",email:"abc.gmail.com", date: '2024-03-25', status: 'Scheduled' },
    { candidate: 'Bob Wilson', position: 'Designer',hrname:'aAbc',contact:"9823828238",email:"abc.gmail.com", date: '2024-03-26', status: 'Pending' }
  ];

  constructor(private router: Router) {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigate(['/']);
    } else {
      this.userName = storedUser;
    }
  }

  ngOnInit(): void {
    // Load users from localStorage if available
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.recentUsers = JSON.parse(storedUsers);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  getActiveUsersCount(): number {
    return this.recentUsers.filter(user => user.status === 'Active').length;
  }

  getNewUsersThisMonth(): number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return this.recentUsers.filter(user => {
      const signupDate = new Date(user.signupDate);
      return signupDate.getMonth() === currentMonth && 
             signupDate.getFullYear() === currentYear;
    }).length;
  }

  addNewUser() {
    // Implement add user functionality
    console.log('Add new user clicked');
  }

  editUser(user: User) {
    // Implement edit user functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    // Implement delete user functionality
    console.log('Delete user:', user);
  }
} 