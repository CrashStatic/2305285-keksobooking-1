import { toggleElementState } from './util.js';
import { formElement, validateForm, resetPristine } from './validate.js';
import { openSuccessMessage } from './messages.js';

const interactiveFormElements = formElement.querySelectorAll('.ad-form__element');

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
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://28.javascript.htmlacademy.pro/keksobooking',
        {
          method: 'POST',
          body: formData,
        },
      ).then(() => {
        clearForm();
        openSuccessMessage();
      });
    }
  });
};

setUserFormSubmit();

export { setFormActive };
