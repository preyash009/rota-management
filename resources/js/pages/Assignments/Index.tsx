import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { assignmentService } from '@/services/assignmentService';
import { employeeService } from '@/services/employeeService';
import { shiftService } from '@/services/shiftService';
import { Assignment, Employee, Shift } from '@/types/common';
import { formatDate, formatTime } from '@/config/dateConfig';
import { useToast } from '@/components/Toast';


interface AssignmentFormData {
    employee_id: string;
    shift_id: string;
    notes: string;
}

interface FormErrors {
    [key: string]: string[];
}

export default function Index() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [formData, setFormData] = useState<AssignmentFormData>({
        employee_id: '',
        shift_id: '',
        notes: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [employeeSearch, setEmployeeSearch] = useState<string>('');
    


    const { showToast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [assignmentsRes, employeesRes, shiftsRes] = await Promise.all([
                assignmentService.fetchAll(),
                employeeService.fetchAll({ status: 'Active' }),
                shiftService.fetchAll({ status: 'Scheduled' })
            ]);
            
            setAssignments(assignmentsRes.data?.data || []);
            setEmployees(employeesRes.data?.data || []);
            setShifts(shiftsRes.data?.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAssignments([]);
            setEmployees([]);
            setShifts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        
        try {
            if (selectedAssignment) {
                await assignmentService.update(selectedAssignment.id, formData);
                showToast('Assignment updated successfully', 'success');
            } else {
                await assignmentService.create(formData);
                showToast('Assignment created successfully', 'success');
            }
            
            setShowModal(false);
            resetForm();
            fetchData();
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors({ general: [error.response.data.message] });
            } else {
                showToast('An error occurred', 'danger');
            }
        }
    };

    const handleEdit = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setFormData({
            employee_id: assignment.employee_id.toString(),
            shift_id: assignment.shift_id.toString(),
            notes: assignment.notes || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            try {
                await assignmentService.remove(id);
                showToast('Assignment deleted successfully', 'success');
                fetchData();
            } catch (error) {
                console.error('Error deleting assignment:', error);
                showToast('Failed to delete assignment', 'danger');
            }
        }
    };

    const resetForm = () => {
        setSelectedAssignment(null);
        setFormData({
            employee_id: '',
            shift_id: '',
            notes: ''
        });
        setErrors({});
        setEmployeeSearch('');
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name?.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        employee.role?.toLowerCase().includes(employeeSearch.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Assignments" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Assignments</h1>
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>Add Assignment</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedAssignment ? 'Edit Assignment' : 'Add Assignment'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                        {errors.general[0]}
                                    </div>
                                )}
                                
                                <div>
                                    <Label htmlFor="employee_id">Employee</Label>
                                    <Select 
                                        value={formData.employee_id} 
                                        onValueChange={(value) => setFormData({...formData, employee_id: value})}
                                    >
                                        <SelectTrigger className={errors.employee_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select employee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="p-2">
                                                <Input
                                                    placeholder="Search employees..."
                                                    value={employeeSearch}
                                                    onChange={(e) => setEmployeeSearch(e.target.value)}
                                                    className="mb-2"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                                            return;
                                                        }
                                                        e.stopPropagation();
                                                    }}
                                                    onPaste={(e) => e.stopPropagation()}
                                                    onCopy={(e) => e.stopPropagation()}
                                                    onCut={(e) => e.stopPropagation()}
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus={false}
                                                />
                                            </div>
                                            {filteredEmployees.length > 0 ? (
                                                filteredEmployees.map((employee) => (
                                                    <SelectItem key={employee.id} value={employee.id.toString()}>
                                                        {employee.name} ({employee.role})
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="no-employees" disabled>
                                                    {employeeSearch ? 'No employees found' : 'No active employees available'}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id[0]}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="shift_id">Shift</Label>
                                    <Select 
                                        value={formData.shift_id} 
                                        onValueChange={(value) => setFormData({...formData, shift_id: value})}
                                    >
                                        <SelectTrigger className={errors.shift_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select shift" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {shifts.length > 0 ? (
                                                shifts.map((shift) => (
                                                    <SelectItem key={shift.id} value={shift.id.toString()}>
                                                        {shift.title} - {formatDate(shift.date)} ({formatTime(shift.start_time)}-{formatTime(shift.end_time)})
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="no-shifts" disabled>No scheduled shifts available</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.shift_id && <p className="text-red-500 text-sm">{errors.shift_id[0]}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                        placeholder="Optional notes..."
                                        rows={3}
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {selectedAssignment ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {Array.isArray(assignments) && assignments.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {assignments.map((assignment) => (
                                        <tr key={assignment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {assignment.employee?.name || 'Unknown Employee'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {assignment.employee?.role || 'Unknown Role'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {assignment.shift?.title || 'Unknown Shift'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {assignment.shift?.date ? formatDate(assignment.shift.date) : 'Unknown Date'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {assignment.shift?.start_time ? formatTime(assignment.shift.start_time) : '00:00'} - {assignment.shift?.end_time ? formatTime(assignment.shift.end_time) : '00:00'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {assignment.notes || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(assignment)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(assignment.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No assignments found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}