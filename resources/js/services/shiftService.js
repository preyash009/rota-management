import api from './api';

export const shiftService = {
    fetchAll: (params = {}) => api.get('/shifts', { params }),
    fetchByDate: (date) => api.get('/shifts', { params: { date } }),
    create: (data) => api.post('/shifts', data),
    update: (id, data) => api.put(`/shifts/${id}`, data),
    remove: (id) => api.delete(`/shifts/${id}`),
};