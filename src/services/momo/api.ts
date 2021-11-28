import API from '../../utils/api';

const URL_PREFIX = '/api/momo';

export const momoService = {
  payment,
};

function payment(amount) {
  return API.get(`${URL_PREFIX}/payment?amount=${amount}`);
}
