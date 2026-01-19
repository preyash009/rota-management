<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shift;
use Carbon\Carbon;
use Faker\Factory as Faker;

class ShiftSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $shiftTypes = [
            ['title' => 'Morning Shift', 'start' => '08:00', 'end' => '16:00'],
            ['title' => 'Evening Shift', 'start' => '16:00', 'end' => '23:59'],
            ['title' => 'Night Shift', 'start' => '00:00', 'end' => '08:00']
        ];
        
        $statuses = ['Scheduled', 'Completed', 'Cancelled'];
        $statusWeights = [70, 20, 10]; // 70% Scheduled, 20% Completed, 10% Cancelled
        
        $startDate = Carbon::now()->startOfWeek();
        $endDate = Carbon::now()->addWeeks(2)->endOfWeek();
        
        $createdShifts = [];
        
        for ($i = 0; $i < 40; $i++) {
            do {
                $shiftType = $faker->randomElement($shiftTypes);
                $date = $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d');
                $key = $date . '_' . $shiftType['start'] . '_' . $shiftType['end'];
            } while (in_array($key, $createdShifts));
            
            $createdShifts[] = $key;
            
            // Weighted random status selection
            $rand = $faker->numberBetween(1, 100);
            if ($rand <= 70) {
                $status = 'Scheduled';
            } elseif ($rand <= 90) {
                $status = 'Completed';
            } else {
                $status = 'Cancelled';
            }
            
            Shift::create([
                'title' => $shiftType['title'],
                'date' => $date,
                'start_time' => $shiftType['start'],
                'end_time' => $shiftType['end'],
                'status' => $status
            ]);
        }
    }
}
