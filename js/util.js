// Проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Проверка комнат на количество

const getRoomPlural = (number) => {
  if (number === 1) {
    return 'комната';
  } else if (number <= 4) {
    return 'комнаты';
  }
  return 'комнат';
};

//Добавляет состояние активности

const toggleElementState = (element, isActive) => {
  element.disabled = !isActive;
};

export { getRoomPlural, toggleElementState, isEscapeKey };
