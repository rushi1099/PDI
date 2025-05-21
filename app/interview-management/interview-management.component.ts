import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Interview {
  candidate: string;
  position: string;
  hrname: string;
  contact: string;
  email: string;
  date: string;
  status: 'Scheduled' | 'Pending' | 'Completed' | 'Selected' | 'Rejected';
}

@Component({
  selector: 'app-interview-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-management.component.html',
  styleUrls: ['./interview-management.component.css']
})
export class InterviewManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // State management
  upcomingInterviews: Interview[] = [];
  showAddForm = false;
  showEditForm = false;
  editingInterview: Interview | null = null;
  
  // Form data
  readonly newInterview: Interview = {
    candidate: '',
    position: '',
    hrname: '',
    contact: '',
    email: '',
    date: '',
    status: 'Scheduled'
  };

  // Status options
  readonly statusOptions: Interview['status'][] = [
    'Scheduled',
    'Pending',
    'Completed',
    'Selected',
    'Rejected'
  ];

  ngOnInit(): void {
    this.loadInterviews();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data loading
  private loadInterviews(): void {
    try {
      const storedData = localStorage.getItem('interviews');
      this.upcomingInterviews = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error loading interviews:', error);
      this.upcomingInterviews = [];
    }
  }

  // Statistics
  getScheduledCount(): number {
    return this.upcomingInterviews.filter(i => i.status === 'Scheduled').length;
  }

  getSelectedCount(): number {
    return this.upcomingInterviews.filter(i => i.status === 'Selected').length;
  }

  getRejectedCount(): number {
    return this.upcomingInterviews.filter(i => i.status === 'Rejected').length;
  }

  getPendingCount(): number {
    return this.upcomingInterviews.filter(i => i.status === 'Pending').length;
  }

  // Form handling
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.showEditForm = false;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    Object.assign(this.newInterview, {
      candidate: '',
      position: '',
      hrname: '',
      contact: '',
      email: '',
      date: '',
      status: 'Scheduled'
    });
  }

  // CRUD operations
  addInterview(): void {
    if (this.validateInterview(this.newInterview)) {
      try {
        const interviews = [...this.upcomingInterviews, { ...this.newInterview }];
        localStorage.setItem('interviews', JSON.stringify(interviews));
        this.loadInterviews();
        this.toggleAddForm();
      } catch (error) {
        console.error('Error adding interview:', error);
      }
    }
  }

  editInterview(interview: Interview): void {
    this.editingInterview = { ...interview };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updateInterview(): void {
    if (this.editingInterview && this.validateInterview(this.editingInterview)) {
      try {
        const interviews = this.upcomingInterviews.map(interview => 
          interview.candidate === this.editingInterview?.candidate 
            ? { ...this.editingInterview }
            : interview
        );
        localStorage.setItem('interviews', JSON.stringify(interviews));
        this.loadInterviews();
        this.cancelEdit();
      } catch (error) {
        console.error('Error updating interview:', error);
      }
    }
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.editingInterview = null;
  }

  // Validation
  private validateInterview(interview: Interview): boolean {
    return !!(
      interview.candidate &&
      interview.position &&
      interview.hrname &&
      interview.contact &&
      interview.email &&
      interview.date &&
      interview.status
    );
  }
} 