import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '480px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '20px',
  timeout: 2000,
  fontSize: '24px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'from-top',
  fontAwesomeIconStyle: 'shadow',
  fontAwesomeIconSize: '34px',
});

const startBtn = document.querySelector('[data-start]');

startBtn.setAttribute('disabled', 'disabled');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  idInt: 0,
  onClose(selectedDates) {
    const initTimeStr = new Date(selectedDates[0]);
    let idInt = options.idInt;
    console.log(idInt);
    const initTime = initTimeStr.getTime();
    const timer = new ReverseTimer(initTime);
    startBtn.addEventListener('click', timer.onClickRunTimer.bind(timer));
    timer.checkInitTime();
  },
  onOpen({ idInt }) {
    // console.log('onOpen', this);
    console.log(options.idInt);
    if (options.idInt) clearInterval(options.idInt);
  },
};

class ReverseTimer {
  constructor(initTime) {
    this.initTime = initTime;
    this.startBtn = startBtn;
  }

  checkInitTime() {
    if (this.initTime - Date.now() <= 0) {
      return Notify.failure('Please choose a date in the future');
    }
    this.startBtn.removeAttribute('disabled');
  }

  setTimerValue(elem, elemName, namerOfChar = 2) {
    document.querySelector(`[data-${elemName}]`).textContent = this.pad(elem);
  }

  onClickRunTimer() {
    const endTimer = this.initTime;
    options.idInt = setInterval(() => {
      const presentTime = Date.now();
      const deltaTime = endTimer - presentTime;
      if (deltaTime < 0) {
        Notify.success('END OF TIME!!!');
        clearInterval(this.idInt);
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      this.setTimerValue(days, 'days');
      this.setTimerValue(hours, 'hours');
      this.setTimerValue(minutes, 'minutes');
      this.setTimerValue(seconds, 'seconds');
    }, 1000);

    this.startBtn.setAttribute('disabled', 'disabled');
  }

  pad(value) {
    const stringVal = String(value);
    if (stringVal.length <= 2) {
      return stringVal.padStart(2, '0');
    }
    return stringVal.padStart(stringVal.length, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}
const fp = flatpickr('#datetime-picker', options);
console.log(fp);
