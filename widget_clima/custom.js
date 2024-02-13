const result = document.querySelector(".result");
const name_country = "Colombia"; // País por defecto
const name_city = "Popayan"; // Ciudad por defecto

// Llama a la función callAPI automáticamente al cargar la página
callAPI(name_city, name_country); // Asegúrate de pasar los valores adecuados para la ciudad y el país

function callAPI(name_city, name_country) {
  const apiId = "efd1f3d529fb9d927599ac7a107030fa";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${name_city},${name_country}&appid=${apiId}`;

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod === "404") {
        showError("Ciudad no encontrada...");
      } else {
        clearHTML();
        showWeather(dataJSON);
      }
      //console.log(dataJSON);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showWeather(data) {
    const { name, main: { temp }, weather: [arr] } = data;
    const degrees = kelvinToCentigrade(temp);

    const content = document.createElement('div');
    content.classList.add('weather-info');
    content.style.display = 'flex'; // Añade estilo para flexbox

    const iconImg = document.createElement('img');
    iconImg.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;
    iconImg.alt = 'icon';

    const infoContainer = document.createElement('div');
    infoContainer.style.display = 'flex'; // Añade estilo para flexbox
    infoContainer.style.flexDirection = 'column'; // Añade estilo para columnas
    infoContainer.style.alignItems = 'flex-start'; // Alinea elementos al inicio

    const cityName = document.createElement('h1');
    cityName.textContent = name;

    const temperature = document.createElement('h2');
    temperature.textContent = `${degrees}°C`;

    infoContainer.appendChild(cityName);
    infoContainer.appendChild(temperature);

    content.appendChild(iconImg);
    content.appendChild(infoContainer);

    result.appendChild(content);
}


function showError(message) {
  //console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;

  result.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15);
}

function clearHTML() {
  result.innerHTML = "";
}
