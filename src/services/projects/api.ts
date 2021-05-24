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
  getChat,
  addChat,
  setAdmin,
  dropAdmin,
  deleteMember,
};

function addProject(project: any) {
  return API.post(`${URL_PREFIX}/addProject`, project);
}
function getChat(project: any) {
  return API.post(`${URL_PREFIX}/getChat`, project);
}
function addChat(project: any) {
  return API.post(`${URL_PREFIX}/addChat`, project);
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
function setAdmin({projectId, memberId}) {
  return API.post(`${URL_PREFIX}/setAdmin`, {projectId, memberId});
}
function dropAdmin({projectId, memberId}) {
  return API.post(`${URL_PREFIX}/dropAdmin`, {projectId, memberId});
}
function deleteMember({projectId, memberId}) {
  return API.post(`${URL_PREFIX}/deleteMember`, {projectId, memberId});
}
