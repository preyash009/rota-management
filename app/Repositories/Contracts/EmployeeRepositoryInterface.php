<?php

namespace App\Repositories\Contracts;

interface EmployeeRepositoryInterface extends BaseRepositoryInterface
{
    public function getActiveEmployees();
    public function findByEmail($email);
}