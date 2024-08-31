const key = "a178b5735252dcb5bf2b3c92f88b826d";

async function searchCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        inputData(data);
    } catch (error) {
        displayError(`Erro ao buscar dados da cidade: ${error.message}`);
    }
}

async function searchCityByCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        inputData(data);
    } catch (error) {
        displayError(`Erro ao buscar dados com coordenadas: ${error.message}`);
    }
}

function inputData(data) {
    document.querySelector('.city').innerHTML = ' Tempo em ' + data.name;
    document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°C';
    document.querySelector('.climate').innerHTML = data.weather[0].description.toUpperCase();
    document.querySelector('.humidity').innerHTML = 'Umidade: ' + data.main.humidity + '%.';
    document.querySelector('.skye').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        displayError("Geolocalização não é suportada pelo seu navegador.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    alert("Localização obtida com sucesso! Latitude: " + latitude + ", Longitude: " + longitude);
    searchCityByCoordinates(latitude, longitude);
}


function showError(error) {
    let message = "Erro ao obter localização:";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message += " Usuário negou a solicitação de Geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            message += " As informações de localização não estão disponíveis.";
            break;
        case error.TIMEOUT:
            message += " A solicitação para obter a localização do usuário expirou.";
            break;
        case error.UNKNOWN_ERROR:
            message += " Ocorreu um erro desconhecido.";
            break;
    }
    alert(message);
}


function displayMessage(message) {
    const messageElement = document.querySelector('.error-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = 'green'; // Exemplo para mensagens de sucesso
    }
}

function displayError(error) {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = error;
        errorElement.style.color = 'red'; // Mensagens de erro
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const locateButton = document.querySelector('.locate');
    if (locateButton) {
        locateButton.addEventListener('click', getLocation);
    }
});
