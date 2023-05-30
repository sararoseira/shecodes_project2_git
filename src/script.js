"use strict";

// displaying the current date

// let date = document.querySelector(".text h2");

// let baseDate = new Date();
// let realWeekDay = baseDate.getDay();
// let realTimeH = baseDate.getHours();
// if (realTimeH < 10) {
//   realTimeH = `0${realTimeH}`;
// }
// let realTimeM = baseDate.getMinutes();
// let weekDays = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// realWeekDay = weekDays[baseDate.getDay()];
// date.innerHTML = `${realWeekDay}, ${realTimeH}:${realTimeM}`;

// adding a celsius/fahrenheit option NEEDS UPDATE!!!!

// let temperature = document.querySelector("#temp");
// let celciusTemp = document.querySelector("#celsius");
// let fahrTemp = document.querySelector("#fahrenheit");

// const changingTemp = function () {
//   temperature.innerHTML = "61";
// };

// fahrTemp.addEventListener("click", changingTemp);

// const changingTemp2 = function () {
//   displayTEMP();
// };

// celciusTemp.addEventListener("click", changingTemp2);

// displaying the city input and the temperature based on that city (data from api)

let form = document.querySelector(".input-group");
let inputCity = document.querySelector("#city");

const submitFunc = function (event) {
  event.preventDefault();
  let search = document.querySelector(".form-control");
  inputCity.innerHTML = search.value.toLowerCase();
  let city = search.value;
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemp);
};
form.addEventListener("submit", submitFunc);

const displayTemp = function (response) {
  let temperature = document.querySelector("#temp");
  const currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = currentTemperature;
  console.log(temperature);
};

// current temperature button

let currentBtn = document.querySelector("#current");

const displayCityGeo = function (response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name.replace(" Municipality", "");
};

currentBtn.addEventListener("click", function () {
  const showPosition = function (position) {
    let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    let apiReverseGeo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(apiUrlGeo).then(displayCityGeo);
    axios.get(apiUrlGeo).then(displayTemp);
  };

  navigator.geolocation.getCurrentPosition(showPosition);
});
