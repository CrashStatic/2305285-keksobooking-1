const MAX_PRICE_PER_NIGHT = 100000;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const RoomsOption = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const MinPricePerNight = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const formElement = document.querySelector('.ad-form');
const titleFieldElement = formElement.querySelector('#title');
const priceFieldElement = formElement.querySelector('#price');
const roomNumberFieldElement = formElement.querySelector('#room_number');
const capacityFieldElement = formElement.querySelector('#capacity');
const typeFieldElement = formElement.querySelector('#type');
const timeInFieldElement = formElement.querySelector('#timein');
const timeOutFieldElement = formElement.querySelector('#timeout');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
});

const validateTitle = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const getTitleErrorMessage = () => `От ${TitleLength.MIN} до ${TitleLength.MAX} символов`;

pristine.addValidator(titleFieldElement,
  validateTitle,
  getTitleErrorMessage
);

const validatePrice = (value) => value >= MinPricePerNight[typeFieldElement.value] && value <= MAX_PRICE_PER_NIGHT;

const getPriceErrorMessage = (value) => {
  if (value >= MinPricePerNight[typeFieldElement.value]) {
    return `Максимальная цена ${MAX_PRICE_PER_NIGHT} руб.`;
  } else if (value <= MAX_PRICE_PER_NIGHT) {
    return `Минимальная цена ${MinPricePerNight[typeFieldElement.value]} руб.`;
  }
};

pristine.addValidator(priceFieldElement,
  validatePrice,
  getPriceErrorMessage
);

const setMinPrice = (evt) => (priceFieldElement.placeholder = MinPricePerNight[evt.target.value]);

typeFieldElement.addEventListener('change', setMinPrice);

const validateRoomNumber = () => RoomsOption[roomNumberFieldElement.value].includes(capacityFieldElement.value);

pristine.addValidator(roomNumberFieldElement,
  validateRoomNumber,
  'Значение не подходит для выбранного количества гостей'
);

pristine.addValidator(capacityFieldElement,
  validateRoomNumber,
  'Значение не подходит для выбранного количества комнат'
);

roomNumberFieldElement.addEventListener('change', () => {
  pristine.validate();
});

capacityFieldElement.addEventListener('change', () => {
  pristine.validate();
});

const setTimeOut = (evt) => (timeOutFieldElement.value = evt.target.value);

const setTimeIn = (evt) => (timeInFieldElement.value = evt.target.value);

timeInFieldElement.addEventListener('change', setTimeOut);

timeOutFieldElement.addEventListener('change', setTimeIn);

const validateForm = () => pristine.validate();

const resetPristine = () => pristine.reset();

// formElement.addEventListener('submit', (evt) => {
//   const isValid = pristine.validate();

//   if (!isValid) {
//     evt.preventDefault();
//   }
// });

export { priceFieldElement, validateForm, resetPristine, formElement };
