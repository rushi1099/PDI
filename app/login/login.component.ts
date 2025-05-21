import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Value: string = 'Login';
  loginForm: FormGroup;
  CreateForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
    this.CreateForm = this.fb.group({
      username: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  show(value: string) {
    this.Value = value;
  }

  login() {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;

    if (username === 'Admin' && password === 'Admin') {
      localStorage.setItem('user', username);
      this.router.navigate(['/main-dashboard']);
    } else {
      console.log('Login failed');
      this.loginForm.reset();
    }
  }

  signup() {
    const username = this.CreateForm.get('username')!.value;
    const password = this.CreateForm.get('password')!.value;
    const confirmPassword = this.CreateForm.get('confirmPassword')!.value;

    if (password === confirmPassword) {
      // Here you would typically make an API call to create the account
      console.log('Account created for:', username);
      this.show('Login'); // Switch back to login view
      this.CreateForm.reset();
    } else {
      console.log('Passwords do not match');
      this.CreateForm.reset();
    }
  }

  toggleView() {
    this.Value = this.Value === 'Login' ? 'Signup' : 'Login';
  }
}
