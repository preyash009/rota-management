<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',
            'shift_id' => 'required|exists:shifts,id',
            'notes' => 'nullable|string'
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->employee_id) {
                $employee = \App\Models\Employee::find($this->employee_id);
                if ($employee && $employee->status !== 'Active') {
                    $validator->errors()->add('employee_id', 'Employee must be active');
                }
            }
        });
    }
}
