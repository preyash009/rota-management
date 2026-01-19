import api from './api';

export const employeeService = {
    fetchAll: (params = {}) => api.get('/employees', { params }),
    fetchById: (id) => api.get(`/employees/${id}`),
    create: (data) => api.post('/employees', data),
    update: (id, data) => api.put(`/employees/${id}`, data),
    remove: (id) => api.delete(`/employees/${id}`),
};