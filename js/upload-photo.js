const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const houseFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const housePreviewBoxElement = document.querySelector('.ad-form__photo');
const housePreviewContainerElement = document.querySelector('.ad-form__photo-container');
const housePreviewTemplate = document.querySelector('#ad-form__loading').content.querySelector('.ad-form__photo');

avatarFileChooserElement.addEventListener('change', () => {
  const file = avatarFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

houseFileChooserElement.addEventListener('change', () => {
  const file = houseFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    housePreviewBoxElement.remove();
    const housePreviewElement = housePreviewTemplate.cloneNode(true);
    const housePreviewImgElement = housePreviewElement.querySelector('.ad-form__img');
    housePreviewImgElement.src = URL.createObjectURL(file);
    housePreviewImgElement.style.objectFit = 'contain';
    housePreviewContainerElement.append(housePreviewElement);
  }
});
