<?php

namespace App\Services;

use App\Repositories\Contracts\AssignmentRepositoryInterface;
use App\Repositories\Contracts\ShiftRepositoryInterface;
use Carbon\Carbon;

class WeeklyHoursService
{
    protected $assignmentRepository;
    protected $shiftRepository;

    public function __construct(
        AssignmentRepositoryInterface $assignmentRepository,
        ShiftRepositoryInterface $shiftRepository
    ) {
        $this->assignmentRepository = $assignmentRepository;
        $this->shiftRepository = $shiftRepository;
    }

    public function calculateWeeklyHours($employeeId, $date)
    {
        $date = Carbon::parse($date);
        $weekStart = $date->startOfWeek(Carbon::MONDAY);
        $weekEnd = $date->copy()->endOfWeek(Carbon::SUNDAY);

        $assignments = $this->assignmentRepository->getByEmployee($employeeId);
        $totalHours = 0;

        foreach ($assignments as $assignment) {
            $shiftDate = Carbon::parse($assignment->shift->date);
            if ($shiftDate->between($weekStart, $weekEnd)) {
                $totalHours += $assignment->shift->duration;
            }
        }

        return $totalHours;
    }

    public function canAssignShift($employeeId, $shiftId)
    {
        $shift = $this->shiftRepository->find($shiftId);
        if (!$shift) {
            return [
                'canAssign' => false,
                'currentHours' => 0,
                'shiftHours' => 0,
                'totalHours' => 0,
                'message' => 'Shift not found'
            ];
        }

        $currentHours = $this->calculateWeeklyHours($employeeId, $shift->date);
        $shiftHours = $shift->duration;
        $totalHours = $currentHours + $shiftHours;

        $canAssign = $totalHours <= 40;

        return [
            'canAssign' => $canAssign,
            'currentHours' => $currentHours,
            'shiftHours' => $shiftHours,
            'totalHours' => $totalHours,
            'message' => $canAssign ? '' : 'Assignment would exceed 40-hour weekly limit'
        ];
    }
}