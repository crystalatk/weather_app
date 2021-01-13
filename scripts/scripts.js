'use strict'

function toggleModal() {
    const modalOverlay = document.querySelector("#overlay");
    modalOverlay.classList.toggle("front");
}

function clearInput() {
    const inputValues = document.querySelectorAll('input');
    inputValues.forEach (inputValue => {
        inputValue.value = "";
    })
}

function eventListener (button, selector) {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const zipCode = document.querySelector(selector);
        if (zipCode.value !== "") {
            getWeather(zipCode.value);
            getForecast(zipCode.value);
        }
        else {
            toggleModal();
            closeModal.addEventListener("click", toggleModal);
        }
        clearInput()
    });
}

const getWeatherSelector = '#zipCode';
const weatherButton = document.querySelector('#getWeatherButton');
eventListener(weatherButton, getWeatherSelector);

const getFooterSelector = '#zipCodeFooter';
const footerButton = document.querySelector('#getWeatherButtonFooter');
eventListener(footerButton, getFooterSelector);


function getWeather(zipCode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=e40dbbedb9e16e2dc4ee18aa1f6da998&units=imperial`;
    get(url).then(function (response) {
        const currTemp = Math.round(response.main.temp);
        const spanCurrentTemp = document.querySelector('#currentTemp');
        spanCurrentTemp.innerHTML = currTemp;
        const spanCurrentZipCode = document.querySelector('#currentZipCode');
        spanCurrentZipCode.innerHTML = zipCode;
        const feelsLike = Math.round(response.main.feels_like);
        const spanFeelsLike = document.querySelector('#feelsLike');
        spanFeelsLike.innerHTML = feelsLike;
        const weatherIcon = response.weather[0].icon;
        const weatherImage = document.querySelector('#weatherImage');
        weatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
        const weatherDescription = response.weather[0].description;
        const spanWeatherDescription = document.querySelector('#weatherDescription');
        spanWeatherDescription.innerHTML = weatherDescription
        const today = document.querySelector('#today');
        today.setAttribute('class', 'visible');
        const locationLabel = document.querySelector('#locationLabel');
        locationLabel.setAttribute('class', 'today');
        const footer = document.querySelector('#footer');
        footer.setAttribute('class', 'visible')
    })
    .catch(function (error) {
        console.log(error);
        toggleModal();
        const closeModal = document.querySelector('#closeModal');
        closeModal.addEventListener("click", toggleModal);
    });
}

function getForecast(zipCode) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=e40dbbedb9e16e2dc4ee18aa1f6da998&units=imperial`;
    get(url).then(function (response) {
        for (let i = 0; i < 5; i++) {
            const forecastTemp = Math.round(response.list[`${i}`].main.temp);
            const spanForecastDay = document.querySelector(`#day${i+1}`);
            spanForecastDay.innerHTML = forecastTemp
            const weatherIcon = response.list[`${i}`].weather[0].icon;
            const weatherImage = document.querySelector(`#forecastWeatherImage${i+1}`);
            weatherImage.setAttribute('src', `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
            const forecast = document.querySelector('#forecast');
            forecast.setAttribute('class', 'visible')
        }
    })
}

// function getTemp(K) {
//     const currentTemp = Math.round((K-273.15)*9/5+32);
//     return currentTemp
// }