import { setFormActive } from './form.js';
import { getCard } from './card.js';

const LATITUDE = 35.67078;

const LONGITUDE = 139.75899;

const addressFieldElement = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
    addressFieldElement.placeholder = `${LATITUDE}, ${LONGITUDE}`;
  })
  .setView({
    lat: LATITUDE,
    lng: LONGITUDE,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LATITUDE,
    lng: LONGITUDE,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressFieldElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const similarMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (similarAd) => {
  const { lat, lng } = similarAd.location;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: similarMarkerIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getCard(similarAd));
};

const resetMap = () => {
  mainMarker.setLatLng([LATITUDE, LONGITUDE]);
  map.closePopup();
  map.setView({
    lat: LATITUDE,
    lng: LONGITUDE,
  }, 10);
  addressFieldElement.placeholder = `${LATITUDE}, ${LONGITUDE}`;
};

const renderSimilarAdMarker = (ads) => ads.forEach((similarAd) => createMarker(similarAd));

export { renderSimilarAdMarker, resetMap };
