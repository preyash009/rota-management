<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;
use App\Models\Employee;
use App\Models\Shift;
use App\Services\OverlapValidationService;
use App\Services\WeeklyHoursService;
use Faker\Factory as Faker;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $activeEmployees = Employee::where('status', 'Active')->get();
        $shifts = Shift::all();
        
        $overlapService = app(OverlapValidationService::class);
        $hoursService = app(WeeklyHoursService::class);
        
        $targetAssignments = (int) ($shifts->count() * 0.65); // 65% of shifts
        $assignmentsCreated = 0;
        $maxAttempts = $shifts->count() * 2;
        $attempts = 0;
        
        while ($assignmentsCreated < $targetAssignments && $attempts < $maxAttempts) {
            $shift = $shifts->random();
            $employee = $activeEmployees->random();
            
            // Check if assignment already exists
            if (Assignment::where('employee_id', $employee->id)
                         ->where('shift_id', $shift->id)
                         ->exists()) {
                $attempts++;
                continue;
            }
            
            // Check for overlaps
            $overlapCheck = $overlapService->checkOverlap($employee->id, $shift->id);
            if ($overlapCheck['hasOverlap']) {
                $attempts++;
                continue;
            }
            
            // Check weekly hours limit
            $hoursCheck = $hoursService->canAssignShift($employee->id, $shift->id);
            if (!$hoursCheck['canAssign']) {
                $attempts++;
                continue;
            }
            
            // Create assignment
            $notes = $faker->boolean(30) ? $faker->sentence() : null; // 30% chance of notes
            
            Assignment::create([
                'employee_id' => $employee->id,
                'shift_id' => $shift->id,
                'notes' => $notes
            ]);
            
            $assignmentsCreated++;
            $attempts++;
        }
    }
}
