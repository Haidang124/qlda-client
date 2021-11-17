import API from '../../utils/api';

const URL_PREFIX = '/api/project';

export const projectService = {
  addProject,
  deleteProject,
  getProject,
  getProjectById,
  getProjectJoined,
  getUserJoin,
  setAdmin,
  dropAdmin,
  deleteMember,
};

function addProject(project: any) {
  return API.post(`${URL_PREFIX}/addProject`, project);
}
function deleteProject(project: any) {
  return API.post(`${URL_PREFIX}/deleteProject`, project);
}
function getProject() {
  return API.get(`${URL_PREFIX}/getProject`);
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
function setAdmin({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/setAdmin`, { projectId, memberId });
}
function dropAdmin({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/dropAdmin`, { projectId, memberId });
}
function deleteMember({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/deleteMember`, { projectId, memberId });
}
