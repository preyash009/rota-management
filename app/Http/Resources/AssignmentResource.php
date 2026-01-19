<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'shift_id' => $this->shift_id,
            'notes' => $this->notes,
            'employee' => new EmployeeResource($this->whenLoaded('employee')),
            'shift' => new ShiftResource($this->whenLoaded('shift')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
