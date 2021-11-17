import API from '../../utils/api';
import { Priority, Status } from '../../views/project/task/InterfaceTask';
const URL_PREFIX = '/api/task';

export const taskService = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  analysis,
  getTaskUser,
  getAllTaskUser,
  changeSection,
};

function addTask(data: any) {
  return API.post(`${URL_PREFIX}/addTask`, data);
}
function getTasks(projectId: string) {
  return API.get(`${URL_PREFIX}/getTasks?projectId=${projectId}`);
}
function updateTask(data: {
  taskId: string;
  projectId: string;
  dependencies?: string;
  assignment?: Array<string>;
  name?: string;
  file?: Array<string>;
  dueDate?: {
    from: Date;
    to: Date;
  };
  isDone?: boolean;
  status?: Status;
  priority?: Priority;
}) {
  return API.post(`${URL_PREFIX}/updateTask`, data);
}
function deleteTask(data: { projectId: string; taskId: string }) {
  return API.post(`${URL_PREFIX}/deleteTask`, data);
}
function analysis(projectId: any) {
  return API.post(`${URL_PREFIX}/analysis`, projectId);
}
function getTaskUser({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/getTaskUser`, { projectId, memberId });
}
function getAllTaskUser() {
  return API.post(`${URL_PREFIX}/getAllTaskUser`);
}
function changeSection(data: {
  projectId: string;
  taskId: string;
  sectionId1: string; //old
  sectionId2: string; //new
  index?: number;
}) {
  return API.post(`${URL_PREFIX}/changeSection`, data);
}
