import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { shiftService } from '@/services/shiftService';
import { Shift } from '@/types/common';
import { formatDate, formatTime } from '@/config/dateConfig';
import { useToast } from '@/components/Toast';

interface ShiftFormData {
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

interface FormErrors {
    [key: string]: string[];
}

export default function Index() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
    const [formData, setFormData] = useState<ShiftFormData>({
        title: '',
        date: '',
        start_time: '',
        end_time: '',
        status: 'Scheduled'
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [dateFilter, setDateFilter] = useState<string>('');
    const { showToast } = useToast();

    useEffect(() => {
        fetchShifts();
    }, [dateFilter]);

    useEffect(() => {
        if (selectedShift) {
            setFormData({
                title: selectedShift.title || '',
                date: selectedShift.date || '',
                start_time: selectedShift.start_time || '',
                end_time: selectedShift.end_time || '',
                status: selectedShift.status || 'Scheduled'
            });
        }
    }, [selectedShift]);

    const fetchShifts = async () => {
        try {
            setLoading(true);
            const params = dateFilter ? { date: dateFilter } : {};
            const response = await shiftService.fetchAll(params);
            
            // Handle different response structures
            let shiftData = response.data?.data || [];
            
            setShifts(Array.isArray(shiftData) ? shiftData : []);
        } catch (error) {
            console.error('Error fetching shifts:', error);
            setShifts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        
        // Client-side validation
        if (formData.end_time !== '00:00' && formData.end_time <= formData.start_time) {
            setErrors({ end_time: ['End time must be after start time'] });
            return;
        }
        
        try {
            if (selectedShift) {
                await shiftService.update(selectedShift.id, formData);
                showToast('Shift updated successfully');
            } else {
                await shiftService.create(formData);
                showToast('Shift created successfully');
            }
            
            setShowModal(false);
            resetForm();
            fetchShifts();
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

    const handleEdit = (shift: Shift) => {
        setSelectedShift(shift);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this shift?')) {
            try {
                await shiftService.remove(id);
                showToast('Shift deleted successfully');
                fetchShifts();
            } catch (error) {
                console.error('Error deleting shift:', error);
                showToast('Failed to delete shift', 'danger');
            }
        }
    };

    const resetForm = () => {
        setSelectedShift(null);
        setFormData({
            title: '',
            date: '',
            start_time: '',
            end_time: '',
            status: 'Scheduled'
        });
        setErrors({});
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Scheduled': return 'warning';
            case 'Completed': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'default';
        }
    };

    return (
        <AppLayout>
            <Head title="Shifts" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Shifts</h1>
                    <Dialog open={showModal} onOpenChange={setShowModal}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>Add Shift</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedShift ? 'Edit Shift' : 'Add Shift'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errors.general && (
                                    <div className="text-red-500 text-sm">{errors.general[0]}</div>
                                )}
                                
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
                                </div>
                                
                                <div>
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                        className={errors.date ? 'border-red-500' : ''}
                                    />
                                    {errors.date && <p className="text-red-500 text-sm">{errors.date[0]}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="start_time">Start Time</Label>
                                        <Input
                                            id="start_time"
                                            type="time"
                                            value={formData.start_time}
                                            onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                                            className={errors.start_time ? 'border-red-500' : ''}
                                        />
                                        {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time[0]}</p>}
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="end_time">End Time</Label>
                                        <Input
                                            id="end_time"
                                            type="time"
                                            value={formData.end_time}
                                            onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                                            className={errors.end_time ? 'border-red-500' : ''}
                                        />
                                        {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time[0]}</p>}
                                    </div>
                                </div>
                                
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={formData.status} onValueChange={(value: 'Scheduled' | 'Completed' | 'Cancelled') => setFormData({...formData, status: value})}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        {selectedShift ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="mb-4">
                    <Input
                        type="date"
                        placeholder="Filter by date..."
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {Array.isArray(shifts) && shifts.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Array.isArray(shifts) ? shifts.map((shift) => (
                                        <tr key={shift.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {shift.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(shift.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {shift.duration || 0}h
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={getStatusBadgeVariant(shift.status)}>
                                                    {shift.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {shift.assignments_count || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(shift)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(shift.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                {dateFilter ? 'No shifts found for the selected date' : 'No shifts found'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}