import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboardService } from '@/services/dashboardService';
import { DashboardStats, WeeklyRota } from '@/types/common';
import { formatWeekRange, formatWeekday, formatTime } from '@/config/dateConfig';

export default function Index() {
    const [stats, setStats] = useState<DashboardStats>({
        employees: [],
        shifts: { total: 0, scheduled: 0, completed: 0, cancelled: 0 }
    });
    const [weeklyRota, setWeeklyRota] = useState<WeeklyRota>({});
    const [currentWeekStart, setCurrentWeekStart] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const today = new Date();
        const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const weekStart = monday.toISOString().split('T')[0];
        setCurrentWeekStart(weekStart);
        
        fetchInitialData();
        fetchWeeklyRota(weekStart);
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [employeeStatsRes, shiftStatsRes] = await Promise.all([
                dashboardService.getEmployeeStats(),
                dashboardService.getShiftStats()
            ]);
            
            // Handle different response structures
            let employeeData = employeeStatsRes.data;
            if (employeeData && employeeData.data) {
                employeeData = employeeData.data;
            }
            
            let shiftData = shiftStatsRes.data;
            if (shiftData && shiftData.data) {
                shiftData = shiftData.data;
            }
            
            setStats({
                employees: Array.isArray(employeeData) ? employeeData : [],
                shifts: shiftData || { total: 0, scheduled: 0, completed: 0, cancelled: 0 }
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setStats({
                employees: [],
                shifts: { total: 0, scheduled: 0, completed: 0, cancelled: 0 }
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchWeeklyRota = async (weekStart: string) => {
        try {
            const rotaRes = await dashboardService.getWeeklyRota(weekStart);
            
            // Handle different response structures
            let rotaData = rotaRes.data?.data || {};
            
            setWeeklyRota(rotaData || {});
        } catch (error) {
            console.error('Error fetching weekly rota:', error);
            setWeeklyRota({});
        }
    };

    const navigateWeek = (direction: number) => {
        const currentDate = new Date(currentWeekStart);
        const newDate = new Date(currentDate.setDate(currentDate.getDate() + (direction * 7)));
        const newWeekStart = newDate.toISOString().split('T')[0];
        setCurrentWeekStart(newWeekStart);
        fetchWeeklyRota(newWeekStart);
    };

    const getWeekDates = () => {
        const dates = [];
        const start = new Date(currentWeekStart);
        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    };

    const getWeekRange = () => {
        return formatWeekRange(currentWeekStart);
    };

    if (loading) {
        return (
            <AppLayout>
                <Head title="Dashboard" />
                <div className="p-6">Loading...</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.employees?.length || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.shifts?.total || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled Shifts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.shifts?.scheduled || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed Shifts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.shifts?.completed || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Rota */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Weekly Rota</CardTitle>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">{getWeekRange()}</span>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => navigateWeek(-1)}>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => navigateWeek(1)}>
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {getWeekDates().map((date) => {
                                const shifts = weeklyRota[date] || [];
                                return (
                                    <div key={date} className="border rounded-lg p-3">
                                        <h4 className="font-medium text-sm mb-2">{formatWeekday(date)}</h4>
                                        <div className="space-y-2">
                                            {shifts.length > 0 ? (
                                                shifts.map((shift) => (
                                                    <div key={shift.id} className="bg-gray-50 rounded p-2 text-xs">
                                                        <div className="font-medium">{shift.title}</div>
                                                        <div className="text-gray-600">
                                                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                                                        </div>
                                                        <div className="mt-1">
                                                            <Badge variant={
                                                                shift.status === 'Scheduled' ? 'warning' : 
                                                                shift.status === 'Completed' ? 'success' : 
                                                                shift.status === 'Cancelled' ? 'danger' : 'default'
                                                            } className="text-xs">
                                                                {shift.status}
                                                            </Badge>
                                                        </div>
                                                        {shift.assignments && shift.assignments.length > 0 && (
                                                            <div className="mt-1 text-gray-600">
                                                                {shift.assignments.map(assignment => assignment.employee.name).join(', ')}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-gray-400 text-xs">N/A</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Employee Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.employees && stats.employees.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Shifts</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stats.employees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.total_shifts_assigned || 0}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.total_hours_this_week || 0}h</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">No employee data available</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}