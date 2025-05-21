import { Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { InterviewManagementComponent } from './interview-management/interview-management.component';
import { DashComponent } from './dash/dash.component';

export const routes: Routes = [
  { path: '', component: DashComponent },
  { path: 'main-dashboard', component: MainDashboardComponent },
  { path: 'interview-management', component: InterviewManagementComponent }
];
