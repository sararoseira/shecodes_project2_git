"use strict";
// Global variables

let form = document.querySelector(".input-group");
let inputCity = document.querySelector("#city");
let lyrics = document.querySelector(".lyrics");
let backgroundImg = document.querySelector(".main-weather");
let temperature = document.querySelector("#temp");
let weatherDescript;
let date;

// getting the weekdays from the data

const getWeekDays = function (response) {
  let timeStamp = response.data.dt * 1000;
  let data = new Date(timeStamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfWeek = days[data.getDay()];
  console.log(dayOfWeek);
};

// changing the image and "lyrics" according to the weather description (api data)

const weatherImg = function (response) {
  weatherDescript = response.data.weather[0].description;
  console.log(response.data.dt * 1000);
  console.log(response);
  date = new Date(response.data.dt * 1000);
  console.log(date);
  let hours = date.getHours();
  console.log(hours);

  if (weatherDescript.includes("cloud")) {
    lyrics.innerHTML = "I look at clouds from both sides now";
    backgroundImg.style.backgroundImage = "url(../images/cloudy.jpg)";
    backgroundImg.style.backgroundBlendMode = "multiply";
  } else if (
    weatherDescript.includes("sun") ||
    (weatherDescript.includes("clear") && 7 < hours < 20)
  ) {
    lyrics.innerHTML = "Here comes the sun (doo doo doo)";
    backgroundImg.style.backgroundImage = "url(../images/sunny.png)";
    backgroundImg.style.backgroundBlendMode = "multiply";
  } else if (weatherDescript.includes("rain")) {
    lyrics.innerHTML = "I'm only happy when it rains";
    backgroundImg.style.backgroundImage = "url(../images/rainy.png)";
    backgroundImg.style.backgroundBlendMode = "color-burn";
  } else if (weatherDescript.includes("clear") && hours > 20) {
    lyrics.innerHTML = "Look at the skies, they have stars in their eyes";
    backgroundImg.style.backgroundImage = "url(../images/clear_night.png)";
  } else {
    backgroundImg.style.backgroundImage = "url(../images/rainy.png)";
    backgroundImg.style.backgroundBlendMode = "color-burn";
  }
};

// displaying the city input and the temperature based on that city (data from api)

const displayTemp = function (response) {
  const currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = currentTemperature;
  console.log(temperature);
  weatherDescript = response.data.weather[0].description;
  console.log(weatherDescript);
};

const submitFunc = function (event) {
  event.preventDefault();
  let search = document.querySelector(".form-control");
  inputCity.innerHTML = search.value.toLowerCase();
  let city = search.value;
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayTemp);
  axios.get(apiURL).then(weatherImg);
  axios.get(apiURL).then(getWeekDays);
};
form.addEventListener("submit", submitFunc);

// current temperature button (geolocation data)

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

// converting temp into fahrenheit
let tempC = document.querySelector("#celsius");
let tempF = document.querySelector("#fahrenheit");

const convertF = function () {
  if (temperature.classList.contains("celsius")) {
    const currentTemp = Number(temperature.innerHTML);
    temperature.innerHTML = Math.round(currentTemp * 1.8 + 32);
    temperature.classList.add("fahrenheit");
    temperature.classList.remove("celsius");
  }
};

tempF.addEventListener("click", convertF);

const convertC = function () {
  if (temperature.classList.contains("fahrenheit")) {
    const currentTemp = Number(temperature.innerHTML);
    temperature.innerHTML = Math.round((currentTemp - 32) * 0.5556);
    temperature.classList.add("celsius");
    temperature.classList.remove("fahrenheit");
  }
};

tempC.addEventListener("click", convertC);
