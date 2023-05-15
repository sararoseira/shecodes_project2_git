"use strict";

// changing the date

let date = document.querySelector(".text h2");

let baseDate = new Date();
let realWeekDay = baseDate.getDay();
let realTimeH = baseDate.getHours();
if (realTimeH < 10) {
  realTimeH = `0${realTimeH}`;
}
let realTimeM = baseDate.getMinutes();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

realWeekDay = weekDays[baseDate.getDay()];
date.innerHTML = `${realWeekDay}, ${realTimeH}:${realTimeM}`;

// displaying the city input

let form = document.querySelector(".input-group");

const submitFunc = function (event) {
  event.preventDefault();
  let search = document.querySelector(".form-control");
  date.innerHTML = `${search.value}`;
};

form.addEventListener("submit", submitFunc);

// adding a celsius/fahrenheit option

let temperature = document.querySelector("#temp");
let celciusTemp = document.querySelector("#celsius");
let fahrTemp = document.querySelector("#fahrenheit");

const changingTemp = function () {
  temperature.innerHTML = "61";
};

fahrTemp.addEventListener("click", changingTemp);

const changingTemp2 = function () {
  temperature.innerHTML = "19";
};

celciusTemp.addEventListener("click", changingTemp2);
