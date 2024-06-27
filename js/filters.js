import { toggleElementState } from './util.js';
import { renderSimilarAdMarker, clearMap } from './map.js';

const ADDS_SIZE = 10;

const PricesRange = {
  low: {
    MIN: 0,
    MAX: 10000,
  },
  middle: {
    MIN: 10000,
    MAX: 50000,
  },
  high: {
    MIN: 50000,
    MAX: 100000,
  },
};

const filterFormElement = document.querySelector('.map__filters');
const interactiveFilterElements = filterFormElement.querySelectorAll('.map__filter');
const mapCheckboxElements = filterFormElement.querySelectorAll('.map__checkbox');
const typeFilterElement = document.querySelector('#housing-type');
const priceFilterElement = document.querySelector('#housing-price');
const roomsFilterElement = document.querySelector('#housing-rooms');
const guestsFilterElement = document.querySelector('#housing-guests');
const featuresFilterElement = document.querySelector('#housing-features');
const featuresElements = featuresFilterElement.querySelectorAll('[name="features"]');

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
      return ad.offer.price > PricesRange.low.MIN && ad.offer.price < PricesRange.low.MAX;
    case 'middle':
      return ad.offer.price > PricesRange.middle.MIN && ad.offer.price < PricesRange.middle.MAX;
    case 'high':
      return ad.offer.price > PricesRange.high.MIN && ad.offer.price < PricesRange.high.MAX;
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
  const checkedFeatures = Array.from(featuresElements).filter((feature) => feature.checked).map((element) => element.value);
  return checkedFeatures.every((checkedFeature) => ad.offer.features && ad.offer.features.includes(checkedFeature));
};

const initFilters = (adds) => {
  setFilterActive();
  currentAdds = adds;
  filterFormElement.addEventListener('change', () => {
    clearMap();
    const filteredAds = [...currentAdds].filter((ad) =>
      filterByType(ad) &&
      filterByPrice(ad) &&
      filterByRooms(ad) &&
      filterByGuests(ad) &&
      filterByFeatures(ad)
    ).slice(0, ADDS_SIZE);
    renderSimilarAdMarker(filteredAds);
  });
};

setFilterInactive();

export { setFilterActive, setFilterInactive, initFilters};
