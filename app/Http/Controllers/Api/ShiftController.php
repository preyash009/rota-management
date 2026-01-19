<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShiftRequest;
use App\Http\Requests\UpdateShiftRequest;
use App\Http\Resources\ShiftResource;
use App\Services\ShiftService;
use App\Repositories\Contracts\ShiftRepositoryInterface;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    protected $shiftService;
    protected $shiftRepository;

    public function __construct(ShiftService $shiftService, ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftService = $shiftService;
        $this->shiftRepository = $shiftRepository;
    }

    public function index(Request $request)
    {
        if ($request->has('date')) {
            $shifts = $this->shiftRepository->getShiftsByDate($request->date);
        } elseif ($request->has('start_date') && $request->has('end_date')) {
            $shifts = $this->shiftRepository->getShiftsByDateRange($request->start_date, $request->end_date);
        } else {
            $shifts = $this->shiftRepository->getAllOrdered();
        }
        
        return ShiftResource::collection($shifts);
    }

    public function store(StoreShiftRequest $request)
    {
        try {
            $shift = $this->shiftService->createShift($request->validated());
            return new ShiftResource($shift);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function show($id)
    {
        $shift = $this->shiftRepository->find($id);
        if (!$shift) {
            return response()->json(['message' => 'Shift not found'], 404);
        }
        return new ShiftResource($shift);
    }

    public function update(UpdateShiftRequest $request, $id)
    {
        try {
            $shift = $this->shiftService->updateShift($id, $request->validated());
            if (!$shift) {
                return response()->json(['message' => 'Shift not found'], 404);
            }
            return new ShiftResource($shift);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function destroy($id)
    {
        $result = $this->shiftRepository->delete($id);
        if (!$result) {
            return response()->json(['message' => 'Shift not found'], 404);
        }
        return response()->json(['message' => 'Shift deleted successfully']);
    }
}