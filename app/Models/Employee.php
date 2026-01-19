<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'email',
        'role',
        'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
