import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Interview {
  candidate: string;
  position: string;
  hrname: string;
  contact: string;
  email: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-interview-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css']
})
export class InterviewFormComponent implements OnInit {
  interview: Interview = {
    candidate: '',
    position: '',
    hrname: '',
    contact: '',
    email: '',
    date: '',
    status: 'Scheduled'
  };
  isEditMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const interviewData = localStorage.getItem('selectedInterview');
    if (interviewData) {
      this.interview = JSON.parse(interviewData);
      this.isEditMode = true;
    }
  }

  saveInterview() {
    const interviews = JSON.parse(localStorage.getItem('interviews') || '[]');
    if (this.isEditMode) {
      const index = interviews.findIndex((i: Interview) => i.candidate === this.interview.candidate);
      if (index !== -1) {
        interviews[index] = this.interview;
      }
    } else {
      interviews.push(this.interview);
    }
    localStorage.setItem('interviews', JSON.stringify(interviews));
    localStorage.removeItem('selectedInterview');
    this.router.navigate(['/main-dashboard'], { queryParams: { menu: 'interviews' } });
  }

  cancel() {
    localStorage.removeItem('selectedInterview');
    this.router.navigate(['/main-dashboard'], { queryParams: { menu: 'interviews' } });
  }
} 