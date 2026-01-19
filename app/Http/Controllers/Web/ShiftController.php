<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ShiftController extends Controller
{
    public function index()
    {
        return Inertia::render('Shifts/Index');
    }
}