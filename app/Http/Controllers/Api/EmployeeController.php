<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(Request $request)
    {
        $query = $this->employeeService->getAllEmployees();
        
        if ($request->has('status')) {
            $query = $query->where('status', $request->status);
        }
        
        return EmployeeResource::collection($query->latest()->get());
    }

    public function store(StoreEmployeeRequest $request)
    {
        $employee = $this->employeeService->createEmployee($request->validated());
        return new EmployeeResource($employee);
    }

    public function show($id)
    {
        $employee = $this->employeeService->getAllEmployees()->find($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        return new EmployeeResource($employee);
    }

    public function update(UpdateEmployeeRequest $request, $id)
    {
        $employee = $this->employeeService->updateEmployee($id, $request->validated());
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        return new EmployeeResource($employee);
    }

    public function destroy($id)
    {
        $employee = $this->employeeService->deleteEmployee($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        return response()->json(['message' => 'Employee deactivated successfully']);
    }
}