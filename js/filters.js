import { toggleElementState } from './util.js';
import { renderSimilarAdMarker, clearMap } from './map.js';

const ADDS_SIZE = 10;

const filterFormElement = document.querySelector('.map__filters');
const interactiveFilterElements = filterFormElement.querySelectorAll('.map__filter');
const mapCheckboxElements = filterFormElement.querySelectorAll('.map__checkbox');
const typeFilterElement = document.querySelector('#housing-type');
const priceFilterElement = document.querySelector('#housing-price');
const roomsFilterElement = document.querySelector('#housing-rooms');
const guestsFilterElement = document.querySelector('#housing-guests');
const featuresFilterElement = document.querySelector('#housing-features');

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

// const sortAddsByType = (adds, type) => {
//   if (type === ANY_VALUE) {
//     return adds;
//   }
//   return adds.filter((item) => item.offer.type === type).slice(0, ADDS_SIZE);
// };

// const initFilters = (adds) => {
//   setFilterActive();
//   currentAdds = adds;
//   typeFilterElement.addEventListener('change', (evt) => {
//     const currentType = evt.target.value;
//     clearMap();
//     renderSimilarAdMarker(sortAddsByType(currentAdds, currentType));
//   });
// };

const filterByType = (ad) => {
  const filterTypeValue = typeFilterElement.value;
  if (filterTypeValue === 'any') {
    return true;
  }
  return filterTypeValue === ad.offer.type;
};

const filterByPrice = (ad) => {
  const filterPriceValue = priceFilterElement.value;

  switch (filterPriceValue) {
    case 'low':
      return ad.offer.price < 10000;
    case 'middle':
      return ad.offer.price > 10000 && ad.offer.price < 50000;
    case 'high':
      return ad.offer.price > 50000;
    default:
      return true;
  }
};

const filterByRooms = (ad) => {
  const filterRoomsValue = roomsFilterElement.value;
  if (filterRoomsValue === 'any') {
    return true;
  }
  return Number(filterRoomsValue) === ad.offer.rooms;
};

const filterByGuests = (ad) => {
  const filterGuestsValue = guestsFilterElement.value;
  if (filterGuestsValue === 'any') {
    return true;
  }
  return Number(filterGuestsValue) === ad.offer.guests;
};

const filterByFeatures = (ad) => {
  const filterFeaturesValue = featuresFilterElement.value;
  return filterFeaturesValue === ad.offer.features;
};

const initFilters = (adds) => {
  setFilterActive();
  currentAdds = adds;
  filterFormElement.addEventListener('change', () => {
    clearMap();
    const filteredAbs = [...currentAdds].filter((ad) => filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad)).slice(0, ADDS_SIZE);
    renderSimilarAdMarker(filteredAbs);
  });
};

setFilterInactive();

export { setFilterActive, setFilterInactive, initFilters};

// const filterByType = (ad) => {
//   const filterTypeValue = typeFilterElement.value;
//   if (filterTypeValue === 'any') {
//     return true;
//   }
//   return filterTypeValue === ad.offer.type;
// };

// filterFormElement.addEventListener('change', () => {
//   clearMap();
//   const filteredAbs = [...currentAdds].filter((ad) => filterByType(ad)).slice(0, ADDS_SIZE);
//   renderSimilarAdMarker(filteredAbs);
// });
