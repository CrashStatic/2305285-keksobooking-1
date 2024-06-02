import './form.js';
import './filters.js';
import './validate.js';
import './slider.js';
import { generateAdvertisement } from './data.js';
import { setFilterActive } from './filters.js';
import { renderSimilarAdMarker } from './map.js';

const adds = generateAdvertisement();

renderSimilarAdMarker(adds);

setFilterActive();
