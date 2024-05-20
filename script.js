
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
                <span class="city-name">${name}</span>
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
                </div>`
        
    })
    .catch(error => {
        console.error(error);
        alert("Invalid City Name");
    });
}
