<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Resources\AssignmentResource;
use App\Repositories\Contracts\AssignmentRepositoryInterface;
use App\Services\OverlapValidationService;
use App\Services\WeeklyHoursService;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    protected $assignmentRepository;
    protected $overlapValidationService;
    protected $weeklyHoursService;

    public function __construct(
        AssignmentRepositoryInterface $assignmentRepository,
        OverlapValidationService $overlapValidationService,
        WeeklyHoursService $weeklyHoursService
    ) {
        $this->assignmentRepository = $assignmentRepository;
        $this->overlapValidationService = $overlapValidationService;
        $this->weeklyHoursService = $weeklyHoursService;
    }

    public function index(Request $request)
    {
        if ($request->has('employee_id')) {
            $assignments = $this->assignmentRepository->getByEmployee($request->employee_id);
        } elseif ($request->has('shift_id')) {
            $assignments = $this->assignmentRepository->getByShift($request->shift_id);
        } else {
            $assignments = $this->assignmentRepository->all();
        }
        
        $assignments->load(['employee', 'shift']);
        return AssignmentResource::collection($assignments);
    }

    public function store(StoreAssignmentRequest $request)
    {
        $data = $request->validated();
        
        // Check for overlaps
        $overlapCheck = $this->overlapValidationService->checkOverlap($data['employee_id'], $data['shift_id']);
        if ($overlapCheck['hasOverlap']) {
            return response()->json(['message' => $overlapCheck['message']], 422);
        }
        
        // Check weekly hours limit
        $hoursCheck = $this->weeklyHoursService->canAssignShift($data['employee_id'], $data['shift_id']);
        if (!$hoursCheck['canAssign']) {
            return response()->json(['message' => $hoursCheck['message']], 422);
        }
        
        $assignment = $this->assignmentRepository->create($data);
        $assignment->load(['employee', 'shift']);
        
        return new AssignmentResource($assignment);
    }

    public function show($id)
    {
        $assignment = $this->assignmentRepository->find($id);
        if (!$assignment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        
        $assignment->load(['employee', 'shift']);
        return new AssignmentResource($assignment);
    }

    public function update(UpdateAssignmentRequest $request, $id)
    {
        $data = $request->validated();
        
        // Check for overlaps (excluding current assignment)
        $overlapCheck = $this->overlapValidationService->checkOverlap($data['employee_id'], $data['shift_id'], $id);
        if ($overlapCheck['hasOverlap']) {
            return response()->json(['message' => $overlapCheck['message']], 422);
        }
        
        $assignment = $this->assignmentRepository->update($id, $data);
        if (!$assignment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        
        $assignment->load(['employee', 'shift']);
        return new AssignmentResource($assignment);
    }

    public function destroy($id)
    {
        $result = $this->assignmentRepository->delete($id);
        if (!$result) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }
        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}