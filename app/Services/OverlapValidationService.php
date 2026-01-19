<?php

namespace App\Services;

use App\Repositories\Contracts\AssignmentRepositoryInterface;
use App\Repositories\Contracts\ShiftRepositoryInterface;
use Carbon\Carbon;

class OverlapValidationService
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

    public function checkOverlap($employeeId, $shiftId, $excludeAssignmentId = null)
    {
        $shift = $this->shiftRepository->find($shiftId);
        if (!$shift) {
            return ['hasOverlap' => false, 'message' => ''];
        }

        $assignments = $this->assignmentRepository->getByEmployeeAndDate($employeeId, $shift->date);
        
        if ($excludeAssignmentId) {
            $assignments = $assignments->where('id', '!=', $excludeAssignmentId);
        }

        $newStart = Carbon::parse($shift->start_time);
        $newEnd = Carbon::parse($shift->end_time);
        
        if ($newEnd->lt($newStart)) {
            $newEnd->addDay();
        }

        foreach ($assignments as $assignment) {
            $existingStart = Carbon::parse($assignment->shift->start_time);
            $existingEnd = Carbon::parse($assignment->shift->end_time);
            
            if ($existingEnd->lt($existingStart)) {
                $existingEnd->addDay();
            }

            if ($newStart->lt($existingEnd) && $newEnd->gt($existingStart)) {
                return [
                    'hasOverlap' => true,
                    'message' => "Shift overlaps with existing assignment: {$assignment->shift->title}"
                ];
            }
        }

        return ['hasOverlap' => false, 'message' => ''];
    }
}