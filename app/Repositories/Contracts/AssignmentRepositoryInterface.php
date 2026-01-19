<?php

namespace App\Repositories\Contracts;

interface AssignmentRepositoryInterface extends BaseRepositoryInterface
{
    public function getByEmployee($employeeId);
    public function getByShift($shiftId);
    public function getByEmployeeAndDate($employeeId, $date);
}