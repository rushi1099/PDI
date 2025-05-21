import { AvatarModule } from 'primeng/avatar';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenuItem } from 'primeng/api/menuitem';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [SharedModule, CommonModule, AvatarModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.isLoggedIn = true;
      this.userName = storedUser;
    }
  }

  items: MenuItem[] | undefined;
  showSignup: boolean = false;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      },
    ]
  }

  toggleSignup() {
    this.showSignup = !this.showSignup;
  }

  Login() {
    console.log("login succesfulll")
    this.router.navigate(['login']);
  }

  login() {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    if (username === 'Admin' && password === 'Admin') {
      this.isLoggedIn = true;
      this.userName = username;
      localStorage.setItem('user', username);
    } else {
      console.log('Login failed');
      this.loginForm.reset();
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    localStorage.removeItem('user');
    this.loginForm.reset();
  }
}

