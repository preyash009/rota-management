export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  total_shifts_assigned?: number;
  total_hours_this_week?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Shift {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  duration?: number;
  assignments_count?: number;
  assignments?: Assignment[];
  created_at?: string;
  updated_at?: string;
}

export interface Assignment {
  id: number;
  employee_id: number;
  shift_id: number;
  notes?: string;
  employee: Employee;
  shift: Shift;
  created_at?: string;
  updated_at?: string;
}

export interface ShiftStats {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export interface DashboardStats {
  employees: Employee[];
  shifts: ShiftStats;
}

export interface WeeklyRota {
  [date: string]: Shift[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}