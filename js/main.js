import './form.js';
import './filters.js';
import './slider.js';
import './validate.js';
import { generateAdvertisement } from './data.js';
import { setFilterActive } from './filters.js';
import { renderSimilarAdMarker } from './map.js';

const adds = generateAdvertisement();

renderSimilarAdMarker(adds);

setFilterActive();
