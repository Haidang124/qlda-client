import API from '../../utils/api';

const URL_PREFIX = '/api/momo';

export const momoService = {
  payment,
  checkPayment,
};

function payment(amount) {
  return API.get(`${URL_PREFIX}/payment?amount=${amount}`);
}
function checkPayment(data: any) {
  return API.post(`${URL_PREFIX}/checkPayment`, data);
}
