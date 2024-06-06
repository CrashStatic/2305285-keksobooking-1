import { openErrorMessage, openErrorServerMessage } from './messages.js';

const BASE_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, showMessage, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(showMessage());
    });

const getData = () => load(Route.GET_DATA, openErrorServerMessage);

const sendData = (body) => load(Route.SEND_DATA, openErrorMessage, Method.POST, body);

export { getData, sendData };
