<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use Faker\Factory as Faker;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $roles = ['Staff', 'Supervisor', 'Manager'];
        $statuses = ['Active', 'Inactive'];
        
        // Create 20 Active employees
        for ($i = 0; $i < 20; $i++) {
            Employee::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'role' => $faker->randomElement(['Staff', 'Staff', 'Staff', 'Supervisor', 'Manager']),
                'status' => 'Active'
            ]);
        }
        
        // Create 5 Inactive employees
        for ($i = 0; $i < 5; $i++) {
            Employee::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'role' => $faker->randomElement($roles),
                'status' => 'Inactive'
            ]);
        }
    }
}
