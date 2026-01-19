import api from './api';

export const dashboardService = {
    getWeeklyRota: (startDate) => api.get('/dashboard/rota/week', { params: { start_date: startDate } }),
    getRotaByDate: (date) => api.get('/dashboard/rota/date', { params: { date } }),
    getEmployeeStats: () => api.get('/dashboard/employee-stats'),
    getShiftStats: () => api.get('/dashboard/shift-stats'),
};