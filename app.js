(function() {
  const tempText = document.getElementById("tempText");
  const feelText = document.getElementById("feelText");
  const pressure = document.getElementById("pressure");
  const humidity = document.getElementById("humidity");
  const uvIndex = document.getElementById("uvIndex");
  const visibility = document.getElementById("visibility");
  const clouds = document.getElementById("clouds");
  const windIcon = document.getElementById("windIcon");
  const windSpeed = document.getElementById("windSpeed");
  const windAngle = document.getElementById("windAngle");
  const windDirection = document.getElementById("windDirection");
  const weatherIcon = document.getElementById("weatherIcon");

  document.addEventListener("DOMContentLoaded", fetchAndWrite);
  document.getElementById("dropdown").addEventListener("change", fetchAndWrite);

  function fetchApiData() {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${dropdown.value}?apikey=LYqmDfLCYlqWK2s9W1FZF4H4VIJYiG8P&details=true`;
    return (
      fetch(url)
        .then(response => {
          return response.json();
        })
        // .then(data => {

        // })
        .catch(function() {
          alert("You have an error!!!");
        })
    );
  }

  function fetchAndWrite() {
    fetchApiData().then(data => {
      tempText.innerHTML = `Temperature: ${data[0].Temperature.Metric.Value}&#8451;`;
      feelText.innerHTML = `How it feels: ${data[0].RealFeelTemperature.Metric.Value}&#8451;`;
      pressure.innerHTML = `Pressure: ${data[0].Pressure.Metric.Value}mb`;
      humidity.innerHTML = `Humidity: ${data[0].RelativeHumidity}%`;
      uvIndex.innerHTML = `UV index: ${data[0].UVIndex} - ${data[0].UVIndexText}`;
      clouds.innerHTML = `Cloud Ceiling: ${data[0].Ceiling.Metric.Value}m`;
      visibility.innerHTML = `Visibility: ${data[0].Visibility.Metric.Value}km`;
      windSpeed.innerHTML = `Wind Speed: ${data[0].Wind.Speed.Metric.Value}km/h`;
      windDirection.innerHTML = `Wind Direction: ${data[0].Wind.Direction.English}`;
      windIcon.style.transform = `rotate(${data[0].Wind.Direction.Degrees+180}deg)`;

      const icon = data[0].WeatherIcon;
      switch (icon) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 33:
        case 34:
          weatherIcon.src = "img/001-sunny.png";
          break;
        case 6:
        case 7:
        case 8:
        case 11:
        case 35:
        case 36:
        case 37:
        case 38:
          weatherIcon.src = "img/002-cloudy.png";
          break;

        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 39:
        case 40:
          weatherIcon.src = "img/003-rain.png";
          break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
          weatherIcon.src = "img/008-snow.png";
          break;
        case 38:
          weatherIcon.src = "img/007-thunder.png";
          break;

        case 41:
        case 42:
          weatherIcon.src = "img/006-storm.png";

        case 24:
        case 25:
        case 26:
          weatherIcon.src = "img/049-cold.png";
      }
    });
  }
})();