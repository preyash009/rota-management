<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\EmployeeController;
use App\Http\Controllers\Web\ShiftController;
use App\Http\Controllers\Web\AssignmentController;
use App\Http\Controllers\Web\DashboardController;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('shifts', [ShiftController::class, 'index'])->name('shifts.index');
    Route::get('assignments', [AssignmentController::class, 'index'])->name('assignments.index');
});

require __DIR__.'/settings.php';
