function clearFix() {
  document.getElementById("display-info").classList.add("visually-hidden");
  document.getElementById("error-div").innerHTML = "";
}
function setValue(name, value) {
  document.getElementById(name).innerText = value;
}

clearFix();
document.getElementById("weather-btn").addEventListener("click", () => {
  const location = document.getElementById("temp-location").value;
  if (location.length > 0) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=fdc06706706b4b36beca915ba48b696a`
    )
      .then((res) => res.json())
      .then((data) => displayInfo(data))
      .catch((err) => displayError(err));
  }
});

function weatherTime(time) {
  let unix_timestamp = time;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  return (formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2));
}

function changeVideo(condition) {
  console.log(condition);
  const mist = "50d";
  if (condition.includes("n")) {
    document.getElementById("video").setAttribute("src", "../videos/night.mp4");
  } else if (
    condition.includes("02d") ||
    condition.includes("03d") ||
    condition.includes("04d")
  ) {
    document.getElementById("video").setAttribute("src", "../videos/cloud.mp4");
  } else if (
    condition.includes("09d") ||
    condition.includes("10d") ||
    condition.includes("11d")
  ) {
    document.getElementById("video").setAttribute("src", "../videos/rain.mp4");
  } else if (condition.includes("13d")) {
    document.getElementById("video").setAttribute("src", "../videos/snow.mp4");
  } else if (condition.includes("1d")) {
    document.getElementById("video").setAttribute("src", "../videos/sun.mp4");
  } else if (condition.includes("50d")) {
    document.getElementById("video").setAttribute("src", "../videos/mist.mp4");
  } else {
    document.getElementById("video").setAttribute("src", "../videos/main.mp4");
  }
}

function displayError(err) {
  clearFix();
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = `<p class="fs-3 text-white bg-warning border text-center rounded p-2"> Please input Correct Location</p>`;
  document.getElementById("error-div").appendChild(errorDiv);
  document.getElementById("temp-location").value = "";
}

function displayInfo(data) {
  clearFix();
  document.getElementById("display-info").classList.remove("visually-hidden");
  setValue("temp-main", data.main.temp);
  setValue("temp-feel", data.main.feels_like);
  setValue("temp-max", data.main.temp_max);
  setValue("temp-min", data.main.temp_min);
  setValue("temp-name", data.name);
  setValue("sun-rise", weatherTime(data.sys.sunrise));
  setValue("sun-set", weatherTime(data.sys.sunset));
  document.getElementById(
    "temp-icon"
  ).src = `../icons/${data.weather[0].icon}.png`;

  changeVideo(data.weather[0].icon);
  document.getElementById("temp-location").value = "";
}
