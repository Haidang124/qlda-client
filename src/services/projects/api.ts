import API from '../../utils/api';

const URL_PREFIX = '/api/project';

export const projectService = {
  addProject,
  deleteProject,
  getPosts,
  getProject,
  getProjectById,
  getProjectJoined,
  getUserJoin,
};

function addProject(project: any) {
  return API.post(`${URL_PREFIX}/addProject`, project);
}
function deleteProject(project: any) {
  return API.post(`${URL_PREFIX}/deleteProject`, project);
}
function getPosts(project) {
  return API.post(`${URL_PREFIX}/getPosts`, project);
}
function getProject() {
  return API.post(`${URL_PREFIX}/getProject`);
}
function getProjectById(projectId: any) {
  return API.post(`${URL_PREFIX}/getProjectById`, projectId);
}
function getProjectJoined() {
  return API.post(`${URL_PREFIX}/getProjectJoined`);
}
function getUserJoin(projectId) {
  return API.post(`${URL_PREFIX}/getUserJoin`, projectId);
}