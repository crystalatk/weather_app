'use strict'

const getWeatherButton = document.querySelector('#getWeatherButton');
getWeatherButton.addEventListener('click', function (event) {
    event.preventDefault();
    const zipCode = document.querySelector('#zipCode');
    if (zipCode.value !== "") {
        getWeather(zipCode.value);
    }
    const today = document.querySelector('#today');
    today.setAttribute('class', 'visible');
    const locationLabel = document.querySelector('#locationLabel');
    locationLabel.setAttribute('class', 'today');
    const footer = document.querySelector('#footer');
    footer.setAttribute('class', 'visible')
    // getWeatherButton.removeAttribute('id');
    
    // footerButton.setAttribute('id', 'getWeatherButton');
});

const footerButton = document.querySelector('#getWeatherButtonFooter');
footerButton.addEventListener('click', function (event) {
    event.preventDefault();
    const zipCode = document.querySelector('#zipCodeFooter');
    if (zipCode.value !== "") {
        getWeather(zipCode.value);
    }
})

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
    });
}

// function getTemp(K) {
//     const currentTemp = Math.round((K-273.15)*9/5+32);
//     return currentTemp
// }