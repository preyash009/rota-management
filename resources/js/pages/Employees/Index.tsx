import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { employeeService } from '@/services/employeeService';
import { Employee } from '@/types/common';
import { useToast } from '@/components/Toast';

interface EmployeeFormData {
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
}

interface FormErrors {
    [key: string]: string[];
}

export default function Index() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        email: '',
        role: 'Staff',
        status: 'Active'
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeeService.fetchAll();
            
            // Handle different response structures
            let employeeData = response.data?.data || [];
            
            setEmployees(Array.isArray(employeeData) ? employeeData : []);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        
        try {
            if (selectedEmployee) {
                await employeeService.update(selectedEmployee.id, formData);
                showToast('Employee updated successfully');
            } else {
                await employeeService.create(formData);
                showToast('Employee created successfully');
            }
            
            setShowModal(false);
            resetForm();
            fetchEmployees();
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                showToast('An error occurred', 'danger');
            }
        }
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setFormData({
            name: employee.name,
            email: employee.email,
            role: employee.role,
            status: employee.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to deactivate this employee?')) {
            try {
                await employeeService.remove(id);
                showToast('Employee deactivated successfully');
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
                showToast('Failed to deactivate employee', 'danger');
            }
        }
    };

    const resetForm = () => {
        setSelectedEmployee(null);
        setFormData({
            name: '',
            email: '',
            role: 'Staff',
            status: 'Active'
        });
        setErrors({});
    };

    const filteredEmployees = Array.isArray(employees) ? employees.filter(employee =>
        employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <AppLayout>
            <Head title="Employees" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Employees</h1>
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>Add Employee</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Staff">Staff</SelectItem>
                                            <SelectItem value="Supervisor">Supervisor</SelectItem>
                                            <SelectItem value="Manager">Manager</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive') => setFormData({...formData, status: value})}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {selectedEmployee ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="mb-4">
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {filteredEmployees.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEmployees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {employee.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {employee.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {employee.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={employee.status === 'Active' ? 'success' : 'danger'}>
                                                    {employee.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(employee)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(employee.id)}
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
                                {searchTerm ? 'No employees found matching your search' : 'No employees found'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}