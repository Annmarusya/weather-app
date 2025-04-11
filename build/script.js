
      const apiKey = "248133ec738ecabc0363ee6af57fdf26";
      const weatherApi =
        "https://api.openweathermap.org/data/2.5/weather?units=metric";
      const geoApi = "https://api.openweathermap.org/geo/1.0/direct?limit=5&q=";

      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {
        try {
          const geoRes = await fetch(`${geoApi}${city}&appid=${apiKey}`);
          const geoData = await geoRes.json();

          if (geoData.length === 0) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
          }

          const { lat, lon, name } = geoData[0];

          const weatherRes = await fetch(
            `${weatherApi}&lat=${lat}&lon=${lon}&appid=${apiKey}`
          );
          const data = await weatherRes.json();

          document.querySelector("#city").innerHTML = name;
          document.querySelector("#temp").innerHTML =
            Math.round(data.main.temp) + "°C";
          document.querySelector("#humidity").innerHTML =
            data.main.humidity + "%";
          document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";

          const weather = data.weather[0].main.toLowerCase();
          weatherIcon.src = `img/${weather}.png`;

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        } catch (err) {
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });
      searchBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
        checkWeather(searchBox.value);
        }
      });



      var options = {
    types: ['(cities)']

}

var input = document.getElementById("name");
var autocomplete = new google.maps.places.Autocomplete(input, options);

autocomplete.addListener("place_changed", function () {
  checkWeather(searchBox.value);
});