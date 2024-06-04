import './form.js';
import './filters.js';
import './slider.js';
import './validate.js';
import './api.js';
import './messages.js';
// import { generateAdvertisement } from './data.js';
import { setFilterActive } from './filters.js';
import { renderSimilarAdMarker } from './map.js';

const SIMILAR_AD_COUNT = 10;

fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
  .then((response) => response.json())
  .then((adds) => {
    renderSimilarAdMarker(adds.slice(0, SIMILAR_AD_COUNT));
  });

// const adds = generateAdvertisement();

// renderSimilarAdMarker(adds);
setFilterActive();
