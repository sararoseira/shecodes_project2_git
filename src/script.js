"use strict";

let date = document.querySelector(".text h2");

let baseDate = new Date();
let realWeekDay = baseDate.getDay();
let realTimeH = baseDate.getHours();
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

let form = document.querySelector(".input-group");

const submitFunc = function (event) {
  event.preventDefault();
  let search = document.querySelector(".form-control");
  date.innerHTML = `${search.value}`;
};

form.addEventListener("submit", submitFunc);
