<?php

namespace App\Repositories\Eloquent;

use App\Models\Shift;
use App\Repositories\Contracts\ShiftRepositoryInterface;

class ShiftRepository extends BaseRepository implements ShiftRepositoryInterface
{
    public function __construct(Shift $model)
    {
        parent::__construct($model);
    }

    public function getShiftsByDate($date)
    {
        return $this->model->where('date', $date)->orderBy('start_time')->get();
    }

    public function getShiftsByDateRange($startDate, $endDate)
    {
        return $this->model->whereBetween('date', [$startDate, $endDate])->orderBy('date')->orderBy('start_time')->get();
    }

    public function getAllOrdered()
    {
        return $this->model->orderBy('date')->orderBy('start_time')->get();
    }
}