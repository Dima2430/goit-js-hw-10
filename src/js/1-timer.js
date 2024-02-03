import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';





const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const input = document.querySelector('input');
const day = document.querySelector('.value[data-days]');
const hour = document.querySelector('.value[data-hours]');
const minute = document.querySelector('.value[data-minutes]');
const second = document.querySelector('.value[data-seconds]');

let selectedDate;
let currentDate = Date.now();
let difference;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0];
      if (currentDate > selectedDate) {
   iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
      });
    } else {
      startButton.disabled = false;
     
}
  },
}
flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {

if (selectedDate > Date.now() ) {
   
    startButton.disabled = true;
    input.disabled = true;
    difference = selectedDate - Date.now();
    addTime(convertMs(difference));
    intervalId = setInterval(() => {
         difference -= 1000;
    addTime(convertMs(difference));
    stopTimer(difference);
    },1000)
} else {
   startButton.disabled = true;
    input.disabled = true;
    iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#B51B1B',
        position: 'topRight',
      });
}
})


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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function addTime({ days, hours, minutes, seconds }) {
     day.textContent = `${addLeadingZero(days)}`;
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
}

function stopTimer(difference) {
  if (difference <= 1000) {
    clearInterval(intervalId);
  }
}

