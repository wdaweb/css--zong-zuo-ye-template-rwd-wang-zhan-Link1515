const days = document.querySelector('.eventCountDown_days');
const hours = document.querySelector('.eventCountDown_hours');
const min = document.querySelector('.eventCountDown_min');
const sec = document.querySelector('.eventCountDown_sec');

const targetDate = new Date('2030-04-20T08:30:00').getTime();
let currentDate = Date.now();
let timeRest = targetDate - currentDate > 0 ? targetDate - currentDate : 0;

setInterval(() => {
  currentDate = Date.now();
  timeRest = targetDate - currentDate > 0 ? targetDate - currentDate : 0;

  days.innerText = Math.floor(timeRest / 1000 / 60 / 60 / 24);
  hours.innerText = Math.floor(timeRest / 1000 / 60 / 60) % 24;
  min.innerText = Math.floor(timeRest / 1000 / 60) % 60;
  sec.innerText = Math.floor(timeRest / 1000) % 60;
}, 1000);
