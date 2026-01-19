<?php

namespace App\Repositories\Contracts;

interface ShiftRepositoryInterface extends BaseRepositoryInterface
{
    public function getShiftsByDate($date);
    public function getShiftsByDateRange($startDate, $endDate);
    public function getAllOrdered();
}