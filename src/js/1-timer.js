import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let intervalId = null;
let userSelectedDate = null;
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');
const input = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
buttonStart.disabled = true;
buttonStart.addEventListener('click', handlerClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate <= Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFF',
        backgroundColor: '#FF6347',
        animateInside: false,
        close: false,
        closeOnClick: true,
        position: 'topRight',
        icon: 'fa-regular fa-circle-xmark',
        iconColor: '#735e5e83',
      });
      buttonStart.disabled = true;
      return;
    }
    buttonStart.disabled = false;
  },
};

flatpickr(input, options);

function convertMs(ms) {
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

function handlerClick() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    const rest = userSelectedDate - Date.now();

    if (rest <= 0) {
      clearInterval(intervalId);
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      input.disabled = false;
      intervalId = null;

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(rest);
    daysElem.textContent = addLeadingZero(days);
    hoursElem.textContent = addLeadingZero(hours);
    minutesElem.textContent = addLeadingZero(minutes);
    secondsElem.textContent = addLeadingZero(seconds);
  }, 1000);
  input.disabled = true;
  buttonStart.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
