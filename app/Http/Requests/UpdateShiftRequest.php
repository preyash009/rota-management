<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShiftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => [
                'required',
                'date_format:H:i',
                function ($attribute, $value, $fail) {
                    $startTime = $this->input('start_time');
                    if ($startTime && $value !== '00:00' && $value <= $startTime) {
                        $fail('The end time must be after the start time or 00:00 for overnight shifts.');
                    }
                }
            ],
            'status' => 'required|in:Scheduled,Completed,Cancelled'
        ];
    }
}
