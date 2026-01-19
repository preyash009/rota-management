<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Employees/Index');
    }
}