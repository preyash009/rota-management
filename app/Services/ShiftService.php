<?php

namespace App\Services;

use App\Repositories\Contracts\ShiftRepositoryInterface;
use Carbon\Carbon;

class ShiftService
{
    protected $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
    }

    public function validateShiftTimes($startTime, $endTime)
    {
        $start = Carbon::parse($startTime);
        $end = Carbon::parse($endTime);
        
        if ($end->format('H:i') === '00:00' && $start->format('H:i') !== '00:00') {
            return true;
        }
        
        return $end->gt($start);
    }

    public function createShift(array $data)
    {
        if (!$this->validateShiftTimes($data['start_time'], $data['end_time'])) {
            throw new \InvalidArgumentException('End time must be after start time');
        }
        
        return $this->shiftRepository->create($data);
    }

    public function updateShift($id, array $data)
    {
        if (isset($data['start_time']) && isset($data['end_time'])) {
            if (!$this->validateShiftTimes($data['start_time'], $data['end_time'])) {
                throw new \InvalidArgumentException('End time must be after start time');
            }
        }
        
        return $this->shiftRepository->update($id, $data);
    }
}