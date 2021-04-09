import API from '../../utils/api';

const URL_PREFIX = '/api/project';

export const projectService = {
  addProject,
  deleteProject,
  getPosts,
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
