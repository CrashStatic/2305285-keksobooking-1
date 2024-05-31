import { priceFieldElement, typeFieldElement } from './validate.js';

const PRICES = [
  {
    name: 'bungalow',
    min: 0,
  },
  {
    name: 'flat',
    min: 1000,
  },
  {
    name: 'hotel',
    min: 3000,
  },
  {
    name: 'house',
    min: 5000,
  },
  {
    name: 'palace',
    min: 10000,
  },
];

const DEFAULT_PRICES = PRICES[1];
let chosenPrice = DEFAULT_PRICES;

const sliderElement = document.querySelector('.ad-form__slider');

const updateOptionsSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000,
    },
    start: chosenPrice.min,
    step: 100,
  });
};

const onPricesChange = (evt) => {
  chosenPrice = PRICES.find((price) => price.name === evt.target.value);
  updateOptionsSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: DEFAULT_PRICES.min,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

typeFieldElement.addEventListener('change', onPricesChange);

sliderElement.noUiSlider.on('update', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
});
