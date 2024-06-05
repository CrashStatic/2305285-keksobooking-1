import { toggleElementState } from './util.js';
import { formElement, validateForm, resetPristine } from './validate.js';
import { openSuccessMessage } from './messages.js';
import { resetSlider } from './slider.js';
// import { resetMap } from './map.js';
import { sendData } from './api.js';

const interactiveFormElements = formElement.querySelectorAll('.ad-form__element');
const resetFormButtonElement = formElement.querySelector('.ad-form__reset');

const toggleFormState = (isActive) => {
  formElement.classList.toggle('ad-form--disabled', !isActive);
  interactiveFormElements.forEach((element) => toggleElementState(element, isActive));
};

const setFormInactive = () => {
  toggleFormState(false);
};

const setFormActive = () => {
  toggleFormState(true);
};

setFormInactive();

const clearForm = () => {
  formElement.reset();
  resetPristine();
  resetSlider();
  // resetMap();
};

resetFormButtonElement.addEventListener('click', () => {
  clearForm();
});

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      sendData(new FormData(evt.target))
        .then(() => {
          clearForm();
          openSuccessMessage();
        })
        .catch((err) => err);
    }
  });
};

setUserFormSubmit();

export { setFormActive };
