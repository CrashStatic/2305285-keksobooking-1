import { getRoomPlural } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const nameOfType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const createPopupFeatures = (features, parent) => {
  if (features && features.length > 0) {
    parent.textContent = '';
    features.forEach((feature) => {
      const popupFeaturesElement = document.createElement('li');
      popupFeaturesElement.classList.add('popup__feature');
      popupFeaturesElement.classList.add(`popup__feature--${feature}`);
      parent.append(popupFeaturesElement);
    });
  } else {
    parent.remove();
  }
};

const createPopupPhotos = (photos, parent) => {
  const firstPhotoElement = parent.querySelector('.popup__photo');
  if (photos && photos.length > 0) {
    photos.forEach((photo) => {
      const popupPhotosElement = firstPhotoElement.cloneNode(true);
      popupPhotosElement.src = photo;
      parent.appendChild(popupPhotosElement);
    });
    parent.removeChild(firstPhotoElement);
  } else {
    parent.remove();
  }
};

const fillElementAttribute = (element, attribute, value) => {
  if (value) {
    element[attribute] = value;
  } else {
    element.remove();
  }
};

const getPrice = (price) => price ? `${price} ₽/ночь` : null;

const getType = (type) => type ? nameOfType[type] : type;

const getCapacity = (rooms, guests) => rooms && guests ? `${rooms} ${getRoomPlural(rooms)} для ${guests} гостей` : null;

const getTime = (checkin, checkout) => checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : null;

const getCard = (ad) => {
  const advertisementElement = cardTemplate.cloneNode(true);

  fillElementAttribute(advertisementElement.querySelector('.popup__title'), 'textContent', ad.offer.title);
  fillElementAttribute(advertisementElement.querySelector('.popup__text--address'), 'textContent', ad.offer.address);
  fillElementAttribute(advertisementElement.querySelector('.popup__text--price'), 'textContent', getPrice(ad.offer.price));
  fillElementAttribute(advertisementElement.querySelector('.popup__type'), 'textContent', getType(ad.offer.type));
  fillElementAttribute(advertisementElement.querySelector('.popup__text--capacity'), 'textContent', getCapacity(ad.offer.rooms, ad.offer.guests));
  fillElementAttribute(advertisementElement.querySelector('.popup__text--time'), 'textContent', getTime(ad.offer.checkin, ad.offer.checkout));
  fillElementAttribute(advertisementElement.querySelector('.popup__description'), 'textContent', ad.offer.description);
  fillElementAttribute(advertisementElement.querySelector('.popup__avatar'), 'src', ad.author.avatar);

  createPopupFeatures(ad.offer.features, advertisementElement.querySelector('.popup__features'));
  createPopupPhotos(ad.offer.photos, advertisementElement.querySelector('.popup__photos'));

  return advertisementElement;
};

export { getCard };
