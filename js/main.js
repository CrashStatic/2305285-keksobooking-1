import { setFilterActive } from './filters.js';
import { renderSimilarAdMarker } from './map.js';
import { getData } from './api.js';

const SIMILAR_AD_COUNT = 10;

getData()
  .then((adds) => {
    renderSimilarAdMarker(adds.slice(0, SIMILAR_AD_COUNT));
    setFilterActive();
  });
