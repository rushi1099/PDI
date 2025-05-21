import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HRDetail {
  companyName: string;
  hrName: string;
  position: string;
  contact: string;
  email: string;
}

@Component({
  selector: 'app-hr-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-details.component.html',
  styleUrl: './hr-details.component.css'
})
export class HrDetailsComponent implements OnInit {
  hrDetails: HRDetail[] = [];

  ngOnInit() {
    // Load HR details from localStorage if available
    const storedHR = localStorage.getItem('hrDetails');
    if (storedHR) {
      this.hrDetails = JSON.parse(storedHR);
    }
  }

  
}
