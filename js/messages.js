import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
// const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let messageElement;

const closeMessage = () => {
  messageElement.remove();
  messageElement = null;
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const openSuccessMessage = () => {
  messageElement = successTemplate.cloneNode(true);
  document.body.appendChild(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

// const openErrorMessage = () => {
//   messageElement = errorTemplate.cloneNode(true);
//   document.body.appendChild(messageElement);
//   const errorButton = messageElement.querySelector('.error__button');
//   errorButton.addEventListener('click', () => {
//     closeMessage();
//   });
// };

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentClick (evt) {
  if (messageElement === evt.target) {
    closeMessage();
  }
}

export { openSuccessMessage };
