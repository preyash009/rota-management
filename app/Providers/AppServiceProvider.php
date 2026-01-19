<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Repository bindings
        $repositories = [
            \App\Repositories\Contracts\EmployeeRepositoryInterface::class => \App\Repositories\Eloquent\EmployeeRepository::class,
            \App\Repositories\Contracts\ShiftRepositoryInterface::class => \App\Repositories\Eloquent\ShiftRepository::class,
            \App\Repositories\Contracts\AssignmentRepositoryInterface::class => \App\Repositories\Eloquent\AssignmentRepository::class,
        ];
        
        foreach ($repositories as $interface => $implementation) {
            $this->app->bind($interface, $implementation);
        }
        
        // Service singletons
        $this->app->singleton(\App\Services\OverlapValidationService::class);
        $this->app->singleton(\App\Services\WeeklyHoursService::class);
        $this->app->singleton(\App\Services\EmployeeService::class);
        $this->app->singleton(\App\Services\ShiftService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
