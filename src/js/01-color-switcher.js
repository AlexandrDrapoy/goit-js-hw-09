function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.setAttribute('disabled', 'disabled');
let timerId = 0;

const changeBgColor = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', 'disabled');
};

const stopChangeBgColor = () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
};

startBtn.addEventListener('click', changeBgColor);
stopBtn.addEventListener('click', stopChangeBgColor);
