import API from '../../utils/api';

const URL_PREFIX = '/api/chat';

export const chatService = {
  getChat,
  addChat,
};

function getChat(project: any) {
  return API.post(`${URL_PREFIX}/getChat`, project);
}
function addChat(project: any) {
  return API.post(`${URL_PREFIX}/addChat`, project);
}
