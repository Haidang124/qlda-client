import API from '../../utils/api';

const URL_PREFIX = '/api/task';

export const taskService = {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    analysis,
    getTaskUser,
    getAllTaskUser,
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
function analysis (projectId: any) {
    return API.post(`${URL_PREFIX}/analysis`, projectId);
}
function getTaskUser ({projectId, memberId}) {
    return API.post(`${URL_PREFIX}/getTaskUser`, {projectId, memberId});
}
function getAllTaskUser () {
    return API.post(`${URL_PREFIX}/getAllTaskUser`);
}