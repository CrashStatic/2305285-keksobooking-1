const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const houseFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const housePreviewBoxElement = document.querySelector('.ad-form__photo');

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
    const housePreviewElement = document.createElement('img');
    housePreviewElement.style.width = '70px';
    housePreviewElement.style.height = '70px';
    housePreviewElement.src = URL.createObjectURL(file);
    housePreviewBoxElement.append(housePreviewElement);
  }
});
