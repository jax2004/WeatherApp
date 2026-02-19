const apiKey = "37ce9e480ebceb6fb8aefa3112266057";
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric`;
const weather_icon = document.querySelector(".weather-icon");
async function weatherCall(api) {
  try {
    const response = await fetch(api);
    if(!response.ok){
        throw new Error("Invalid City");
    }
    let res = await response.json();
    let temp = Math.round(res.main.temp);
    let wind = Math.round(res.wind.speed * 3.6);
    const city = document.querySelector(".city").value;
    const cityName = city.toLocaleUpperCase();
    document.querySelector(".temp").innerHTML = temp + "°c";
    document.querySelector(".humidityPercent").innerHTML =
      res.main.humidity + " %";
    document.querySelector(".windKmph").innerHTML = wind + " km/hr";
    document.querySelector(".cityText").innerHTML = cityName;

    let currentCondition = res.weather[0].main;
    switch (currentCondition) {
      case "Clouds":
        weather_icon.src = "images/clouds.png";
        break;
      case "Clear":
        weather_icon.src = "images/clear.png";
        break;
      case "Mist":
        weather_icon.src = "images/mist.png";
        break;
      case "Rain":
        weather_icon.src = "images/rain.png";
        break;
      case "Snow":
        weather_icon.src = "images/snow.png";
        break;
      default:
        weather_icon.src = "images/clear.png";
    }
  } catch (error) {
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidityPercent").innerHTML = "-- %";
    document.querySelector(".windKmph").innerHTML = "-- km/hr";
    document.querySelector(".cityText").innerHTML = error.message;
  }
}

document.querySelector(".search").addEventListener("click", () => {
  const city = document.querySelector(".city").value.trim();
  if (city === "") {
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidityPercent").innerHTML = "-- %";
    document.querySelector(".windKmph").innerHTML = "-- km/hr";
    document.querySelector(".cityText").innerHTML = "Enter city name!";
    return;
  }
  const api = apiUrl + `&q=${city}`;
  weatherCall(api);
});
