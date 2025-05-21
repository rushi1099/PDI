export interface Interview {
  candidate: string;
  position: string;
  hrname: string;
  contact: string;
  email: string;
  date: string;
  status: 'Scheduled' | 'Pending' | 'Completed' | 'Selected' | 'Rejected';
} 