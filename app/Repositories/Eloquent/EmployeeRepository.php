<?php

namespace App\Repositories\Eloquent;

use App\Models\Employee;
use App\Repositories\Contracts\EmployeeRepositoryInterface;

class EmployeeRepository extends BaseRepository implements EmployeeRepositoryInterface
{
    public function __construct(Employee $model)
    {
        parent::__construct($model);
    }

    public function getActiveEmployees()
    {
        return $this->model->active()->orderBy('name')->get();
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }
}