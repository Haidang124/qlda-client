import API from '../../utils/api';

const URL_PREFIX = '/api/task';

export const taskService = {
    addTask,
    getTask,
    updateTask,
    deleteTask,
}

function addTask (data: any) {
    return API.post(`${URL_PREFIX}/addTask`, data);
}

function getTask (projectId: any) {
    return API.post(`${URL_PREFIX}/getTask`, projectId);
}
function updateTask (data: any) {
    return API.post(`${URL_PREFIX}/updateTask`, data);
}
function deleteTask (data: any) {
    return API.post(`${URL_PREFIX}/deleteTask`, data);
}