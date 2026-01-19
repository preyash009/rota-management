<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\DashboardController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('shifts', ShiftController::class);
    Route::apiResource('assignments', AssignmentController::class);
    
    Route::prefix('dashboard')->group(function () {
        Route::get('rota/week', [DashboardController::class, 'getRotaByWeek']);
        Route::get('rota/date', [DashboardController::class, 'getRotaByDate']);
        Route::get('employee-stats', [DashboardController::class, 'getEmployeeStats']);
        Route::get('shift-stats', [DashboardController::class, 'getShiftStats']);
    });
});