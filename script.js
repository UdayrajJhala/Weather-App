
function showWeather() {
    const cityName = document.querySelector(".city-input").value;
    const weatherContainer = document.querySelector(".weather-container");
    const apikey="7be4451c37b65c1b39616f9670e443dd";
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;

    fetch(apiurl)
    .then(response => {
        if (!response.ok) {
            console.log('response error');;
        }
        return response.json();
    })
    .then(data => {
        const temp = data.main.temp;
        const name = data.name;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed;
        let desc='';
        const description = data.weather[0].description;
        const feelslike = data.main.feels_like;
        const min = data.main.temp_min;
        const max = data.main.temp_max;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        function convertUnixToIST(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
            return date.toLocaleString('en-IN', options);
        }

        const sunriseIST = convertUnixToIST(sunrise);
        const sunsetIST = convertUnixToIST(sunset);


        weatherContainer.style.display="flex";

        if(data.weather[0].id >=200 && data.weather[0].id<300)
            {
                desc='thunderstorm';
            }
        else if(data.weather[0].id >=300 && data.weather[0].id<400)
            {
                desc='drizzle';
            }
        else if(data.weather[0].id >=500 && data.weather[0].id<600)
            {
                desc='rain';
            }
        else if(data.weather[0].id >=600 && data.weather[0].id<700)
            {
                desc='snow';
            }
        else if(data.weather[0].id >=700 && data.weather[0].id<800)
            {
                desc='mist';
            }
        else if(data.weather[0].id === 800)
            {
                desc='clear';
            }
        else if(data.weather[0].id >800 && data.weather[0].id<900)
            {   desc='clouds';

            }

        console.log(desc);

    
        weatherContainer.innerHTML =`<img class="weather-img" src="assets/${desc}.png" alt="">
        <span class="temp">${temp}&deg;c</span>
        <span style="font-size: 20px;" class="feels-like">Feels Like ${feelslike}&deg;c</span>
        <span class="city-name">${name}</span>
        <span style="font-size: 20px;" class="description">${description}</span>
        <div class="min-max">
            <span style="padding-right: 20px;">Min: ${min}&deg;c</span>
            <span>Max: ${max}&deg;c</span>
        </div>
    
        <div class="info">
            <img class="humidity-img" src="assets/humidity.gif" alt="">
            <div>
                <p style="font-size: 20px;">${humidity}%</p>
                <p style="font-size: 14px;">Humidity</p>
            </div>
            <img class="wind-img" src="assets/wind.gif" alt="">
            <div>
                <p style="font-size: 20px;">${windspeed} km/h</p>
                <p style="font-size: 14px;">Wind Speed</p>
            </div>
        </div>
        <div class="sunrise-sunset">
            <span style="padding-right: 20px;">Sunrise: <span style="font-weight: normal;">${sunriseIST}</span></span>
            <span>Sunset: <span style="font-weight: normal;">${sunsetIST}</span></span>
        </div>`
        
    })
    .catch(error => {
        console.error(error);
        alert("Invalid City Name");
    });
}
