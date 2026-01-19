<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\ShiftRepositoryInterface;
use App\Repositories\Contracts\AssignmentRepositoryInterface;
use App\Repositories\Contracts\EmployeeRepositoryInterface;
use App\Services\WeeklyHoursService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    protected $shiftRepository;
    protected $assignmentRepository;
    protected $employeeRepository;
    protected $weeklyHoursService;

    public function __construct(
        ShiftRepositoryInterface $shiftRepository,
        AssignmentRepositoryInterface $assignmentRepository,
        EmployeeRepositoryInterface $employeeRepository,
        WeeklyHoursService $weeklyHoursService
    ) {
        $this->shiftRepository = $shiftRepository;
        $this->assignmentRepository = $assignmentRepository;
        $this->employeeRepository = $employeeRepository;
        $this->weeklyHoursService = $weeklyHoursService;
    }

    public function getRotaByWeek(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfWeek(Carbon::MONDAY));
        $endDate = Carbon::parse($startDate)->endOfWeek(Carbon::SUNDAY);
        
        $shifts = $this->shiftRepository->getShiftsByDateRange($startDate, $endDate);
        $shifts->load(['assignments.employee']);
        
        return response()->json([
            'data' => $shifts->groupBy(function($shift) {
                return Carbon::parse($shift->date)->format('Y-m-d');
            })
        ]);
    }

    public function getRotaByDate(Request $request)
    {
        $date = $request->input('date', Carbon::now()->toDateString());
        $shifts = $this->shiftRepository->getShiftsByDate($date);
        $shifts->load(['assignments.employee']);
        
        return response()->json([
            'data' => $shifts
        ]);
    }

    public function getEmployeeStats()
    {
        $employees = $this->employeeRepository->getActiveEmployees();
        $stats = [];
        
        foreach ($employees as $employee) {
            $assignments = $this->assignmentRepository->getByEmployee($employee->id);
            $weeklyHours = $this->weeklyHoursService->calculateWeeklyHours($employee->id, Carbon::now());
            
            $stats[] = [
                'id' => $employee->id,
                'name' => $employee->name,
                'email' => $employee->email,
                'role' => $employee->role,
                'status' => $employee->status,
                'total_shifts_assigned' => $assignments->count(),
                'total_hours_this_week' => $weeklyHours
            ];
        }
        
        return response()->json([
            'data' => $stats
        ]);
    }

    public function getShiftStats()
    {
        $shifts = $this->shiftRepository->all();
        
        return response()->json([
            'data' => [
                'total' => $shifts->count(),
                'scheduled' => $shifts->where('status', 'Scheduled')->count(),
                'completed' => $shifts->where('status', 'Completed')->count(),
                'cancelled' => $shifts->where('status', 'Cancelled')->count()
            ]
        ]);
    }
}