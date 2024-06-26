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
  const checkedFeaturesElements = featuresFilterElement.querySelectorAll('input[name="features"]:checked');
  const checkedFeatures = Array.from(checkedFeaturesElements).map((element) => element.value);

  const filterFeaturesValue = ad.offer.features;
  Array(filterFeaturesValue).every((features) => {
    features = checkedFeatures;
    if (filterFeaturesValue) {
      return filterFeaturesValue.includes(features);
    }
  }
  );
};

// const checkedFeaturesElements = featuresFilterElement.querySelectorAll('input[name="features"]:checked');
// const checkedFeatures = Array.from(checkedFeaturesElements);

// const filterByFeatures = (ad) => checkedFeatures.every((feature) => {
//   const filterFeaturesValue = ad.offer.features;
//   if (filterFeaturesValue) {
//     return filterFeaturesValue.includes(feature);
//   }
// });

const initFilters = (adds) => {
  setFilterActive();
  currentAdds = adds;
  filterFormElement.addEventListener('change', () => {
    clearMap();
    const filteredAds = [...currentAdds].filter((ad) => filterByType(ad) && filterByPrice(ad) && filterByRooms(ad) && filterByGuests(ad) && filterByFeatures(ad)).slice(0, ADDS_SIZE);
    renderSimilarAdMarker(filterByFeatures(filteredAds));
  });
};

setFilterInactive();

export { setFilterActive, setFilterInactive, initFilters};
