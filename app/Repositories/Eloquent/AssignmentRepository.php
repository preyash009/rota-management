<?php

namespace App\Repositories\Eloquent;

use App\Models\Assignment;
use App\Repositories\Contracts\AssignmentRepositoryInterface;

class AssignmentRepository extends BaseRepository implements AssignmentRepositoryInterface
{
    public function __construct(Assignment $model)
    {
        parent::__construct($model);
    }

    public function getByEmployee($employeeId)
    {
        return $this->model->where('employee_id', $employeeId)->with('shift')->get();
    }

    public function getByShift($shiftId)
    {
        return $this->model->where('shift_id', $shiftId)->with('employee')->get();
    }

    public function getByEmployeeAndDate($employeeId, $date)
    {
        return $this->model->where('employee_id', $employeeId)
            ->whereHas('shift', function ($query) use ($date) {
                $query->where('date', $date);
            })
            ->with('shift')
            ->get();
    }
}