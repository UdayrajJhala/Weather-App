
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

        weatherContainer.style.display="flex";

        weatherContainer.innerHTML =`<img class="weather-img" src="assets/clear.png" alt="">
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
        console.error('There was a problem with the fetch operation:', error);
        weatherContainer.textContent = 'Error fetching weather data. Please try again later.';
    });
}
