//variables for API endpoint, url for displaying an icon and API key obtained after registering to the OpenWeatherMap service

const url="https://api.openweathermap.org/data/2.5/weather?"
const icon_url="http://openweathermap.org/img/wn/"
const api_key = "f8e868d0d9c897e4c7b0aea5040c4aa6"

//variables for UI elements thatt needs to be manipulated through JavaScript

const temp_span = document.querySelector('#temp')
const speed_span = document.querySelector('#speed')
const direction_span = document.querySelector('#direction')
const description_span = document.querySelector('#description')
const icon_img = document.querySelector('img')

//function that retvieves user's position; browser will ask for permission to use location
// HOX! EN SAANUT TOIMIMAAN OHJEEN ESIMERKILLÄ ? 
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude.toFixed(3);
            const lng = position.coords.longitude.toFixed(3);
            document.querySelector('#lat').innerHTML = lat + ', ';
            document.querySelector('#lng').innerHTML = lng;
            getWeather(lat, lng);
        }), (error => {
            alert(error);
        });
    } else {
        alert("Selaimesi ei tue geolocationia!");
    }
}


//function that retvieves weather information based on position (coordinates). Since url address is a bit more complex containing HTTP GET parameters, an address variable is declared to hold all require information. After that Axios library is used to make the call and display data or possible error

const getWeather = (lat,lng) => {
    const address = url +
    'lat=' + lat +
    '&lon=' + lng +
    '&units=metric' +
    '&appid=' + api_key
    axios.get(address)
        .then(response => {
            const json = response.data
            temp_span.innerHTML = json.main.temp + '&#8451;'
            speed_span.innerHTML = json.wind.speed + ' m/s'
            direction_span.innerHTML = json.wind.deg + '&#176;'
            description_span.innerHTML = json.weather[0].description
            const image = icon_url + json.weather[0].icon + '@2x.png'
            icon_img.src = image
        }).catch(error => {
            alert(error)
        })
}


getLocation()


        