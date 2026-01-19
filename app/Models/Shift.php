<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Shift extends Model
{
    protected $fillable = [
        'title',
        'date',
        'start_time',
        'end_time',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i'
    ];

    public function getDurationAttribute()
    {
        $start = Carbon::parse($this->start_time);
        $end = Carbon::parse($this->end_time);
        
        if ($end->lt($start)) {
            $end->addDay();
        }
        
        return $start->diffInHours($end, true);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
