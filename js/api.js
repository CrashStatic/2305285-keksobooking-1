import { openErrorMessage, openErrorServerMessage } from './messages.js';

const BASE_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(openErrorServerMessage());
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  },
).then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
})
  .catch(() => {
    throw new Error(openErrorMessage());
  });

export { getData, sendData };
