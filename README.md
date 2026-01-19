# Rota (Shift) Management System

A complete shift management system built with Laravel 12, React 19, Inertia.js, and Tailwind CSS following the repository pattern.

## Features

- **Employee Management**: Create, update, and manage employee records with roles and status
- **Shift Management**: Schedule shifts with time validation and status tracking
- **Assignment Management**: Assign employees to shifts with overlap and weekly hours validation
- **Dashboard**: Weekly rota view, employee statistics, and shift analytics
- **Business Rules**: 40-hour weekly limit, overlap prevention, active employee requirements
- **Repository Pattern**: Clean architecture with separation of concerns
- **API-First**: RESTful API with form request validation and resource transformations

## Tech Stack

- **Backend**: Laravel 12, PHP 8.4
- **Frontend**: React 19, TypeScript, Inertia.js
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MySQL/SQLite
- **Authentication**: Laravel Fortify (session-based)
- **API**: RESTful with CSRF protection

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate --seed
   ```

6. **Build frontend assets**
   ```bash
   npm run dev
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

## Authentication

The system uses session-based authentication with CSRF protection. All API endpoints require authentication and include CSRF token validation for POST/PUT/DELETE requests.

## API Endpoints

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/{id}` - Get employee details
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Deactivate employee

**Request/Response Example:**
```json
// POST /api/employees
{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Staff",
    "status": "Active"
}

// Response
{
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "Staff",
        "status": "Active",
        "created_at": "2024-01-19T10:00:00.000000Z",
        "updated_at": "2024-01-19T10:00:00.000000Z"
    }
}
```

**Validation Rules:**
- `name`: required, string, max:255
- `email`: required, email, unique:employees
- `role`: required, string
- `status`: required, in:Active,Inactive

### Shifts
- `GET /api/shifts` - List shifts (with optional date filters)
- `POST /api/shifts` - Create new shift
- `GET /api/shifts/{id}` - Get shift details
- `PUT /api/shifts/{id}` - Update shift
- `DELETE /api/shifts/{id}` - Delete shift

**Request/Response Example:**
```json
// POST /api/shifts
{
    "title": "Morning Shift",
    "date": "2024-01-20",
    "start_time": "08:00",
    "end_time": "16:00",
    "status": "Scheduled"
}

// Response
{
    "data": {
        "id": 1,
        "title": "Morning Shift",
        "date": "2024-01-20",
        "start_time": "08:00",
        "end_time": "16:00",
        "status": "Scheduled",
        "duration": 8,
        "assignments_count": 0
    }
}
```

**Validation Rules:**
- `title`: required, string
- `date`: required, date, after_or_equal:today (for creation)
- `start_time`: required, date_format:H:i
- `end_time`: required, date_format:H:i, after:start_time
- `status`: required, in:Scheduled,Completed,Cancelled

### Assignments
- `GET /api/assignments` - List assignments (with optional filters)
- `POST /api/assignments` - Create new assignment
- `GET /api/assignments/{id}` - Get assignment details
- `PUT /api/assignments/{id}` - Update assignment
- `DELETE /api/assignments/{id}` - Delete assignment

**Request/Response Example:**
```json
// POST /api/assignments
{
    "employee_id": 1,
    "shift_id": 1,
    "notes": "Training required"
}

// Response
{
    "data": {
        "id": 1,
        "employee_id": 1,
        "shift_id": 1,
        "notes": "Training required",
        "employee": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "Staff",
            "status": "Active"
        },
        "shift": {
            "id": 1,
            "title": "Morning Shift",
            "date": "2024-01-20",
            "start_time": "08:00",
            "end_time": "16:00",
            "status": "Scheduled",
            "duration": 8
        }
    }
}
```

**Validation Rules:**
- `employee_id`: required, exists:employees,id (must be active)
- `shift_id`: required, exists:shifts,id
- `notes`: nullable, string

### Dashboard
- `GET /api/dashboard/rota/week?start_date=2024-01-15` - Get weekly rota
- `GET /api/dashboard/rota/date?date=2024-01-20` - Get rota for specific date
- `GET /api/dashboard/employee-stats` - Get employee statistics
- `GET /api/dashboard/shift-stats` - Get shift statistics

## Business Rules

### Overlap Prevention
- Employees cannot be assigned to overlapping shifts on the same date
- System checks time ranges including midnight shifts (e.g., 22:00-06:00)
- Validation occurs on assignment creation and updates

### Weekly Hours Limit
- Employees cannot exceed 40 hours per week (Monday-Sunday)
- System calculates current weekly hours before allowing new assignments
- Includes all assigned shifts regardless of status

### Active Employee Requirement
- Only active employees can be assigned to shifts
- Deactivated employees retain their existing assignments but cannot receive new ones

### Time Validation
- Shift end time must be after start time
- Special handling for midnight shifts (end_time = 00:00 is allowed)
- Client-side and server-side validation

## Inertia Page Routes

- `/dashboard` - Dashboard with weekly rota and statistics
- `/employees` - Employee management interface
- `/shifts` - Shift management interface
- `/assignments` - Assignment management interface

All routes require authentication (`auth` middleware).

## CSRF Protection

All POST, PUT, and DELETE requests require CSRF token validation. The frontend automatically includes CSRF tokens in API requests via the `X-CSRF-TOKEN` header.

## Architecture

### Repository Pattern
- **Contracts**: Interfaces defining repository methods
- **Eloquent**: Concrete implementations using Eloquent ORM
- **Services**: Business logic layer with validation and processing
- **Controllers**: HTTP request handling and response formatting

### File Structure
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/           # API controllers
│   │   └── Web/           # Inertia page controllers
│   ├── Requests/          # Form request validation
│   └── Resources/         # API response transformations
├── Models/                # Eloquent models
├── Repositories/
│   ├── Contracts/         # Repository interfaces
│   └── Eloquent/          # Repository implementations
└── Services/              # Business logic services

resources/js/
├── components/            # Reusable React components
├── layouts/               # Page layouts
├── pages/                 # Inertia page components
└── services/              # API service layer
```

## Development

### Running Tests
```bash
php artisan test
```

### Code Style
```bash
./vendor/bin/pint
```

### Frontend Development
```bash
npm run dev    # Development with hot reload
npm run build  # Production build
```

## Troubleshooting

### Common Issues

1. **CSRF Token Mismatch**
   - Ensure the CSRF meta tag is present in the HTML head
   - Check that axios is configured to send the CSRF token

2. **Database Connection**
   - Verify database credentials in `.env`
   - Ensure database exists and is accessible

3. **Permission Errors**
   - Check storage and bootstrap/cache directory permissions
   - Run `php artisan storage:link` if needed

4. **Asset Compilation**
   - Clear cache: `php artisan cache:clear`
   - Rebuild assets: `npm run build`


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).