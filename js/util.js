const RERENDER_DELAY = 500;

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

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {

  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export { getRoomPlural, toggleElementState, isEscapeKey, debounce };
