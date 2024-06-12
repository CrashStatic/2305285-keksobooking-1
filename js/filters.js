import { toggleElementState } from './util.js';
import { renderSimilarAdMarker, clearMap } from './map.js';

const ADDS_SIZE = 10;
const ANY_VALUE = 'any';

const filterFormElement = document.querySelector('.map__filters');
const interactiveFilterElements = filterFormElement.querySelectorAll('.map__filter');
const mapCheckboxElements = filterFormElement.querySelectorAll('.map__checkbox');
const typeFilterElement = document.querySelector('#housing-type');

let currentAdds = [];

const toggleFilterState = (isActive) => {
  filterFormElement.classList.toggle('map__filters--disabled', !isActive);
  interactiveFilterElements.forEach((element) => toggleElementState(element, isActive));
  mapCheckboxElements.forEach((element) => toggleElementState(element, isActive));
};

const setFilterInactive = () => {
  toggleFilterState(false);
};

const setFilterActive = () => {
  toggleFilterState(true);
};

const sortAddsByType = (adds, type) => {
  if (type === ANY_VALUE) {
    return adds;
  }
  return adds.filter((item) => item.offer.type === type).slice(0, ADDS_SIZE);
};

const initFilters = (adds) => {
  setFilterActive();
  currentAdds = adds;
  typeFilterElement.addEventListener('change', (evt) => {
    const currentType = evt.target.value;
    clearMap();
    renderSimilarAdMarker(sortAddsByType(currentAdds, currentType));
  });
};

setFilterInactive();

export { setFilterActive, setFilterInactive, initFilters };
