const key = "a178b5735252dcb5bf2b3c92f88b826d";

async function searchCity(city) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`)
            .then(result => result.json());
        inputData(data);
    } catch (error) {
        console.error("Erro ao buscar dados da cidade:", error);
    }
}

async function searchCityByCoordinates(latitude, longitude) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`)
            .then(result => result.json());
        inputData(data);
    } catch (error) {
        console.error("Erro ao buscar dados com coordenadas:", error);
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
        console.log("Geolocalização não é suportada pelo seu navegador.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + " Longitude: " + longitude);
    searchCityByCoordinates(latitude, longitude);
}

function showError(error) {
    console.log("Erro ao obter localização:", error.message);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("Usuário negou a solicitação de Geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("As informações de localização não estão disponíveis.");
            break;
        case error.TIMEOUT:
            console.log("A solicitação para obter a localização do usuário expirou.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Ocorreu um erro desconhecido.");
            break;
    }
}

// Adicionando o event listener após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    const locateButton = document.querySelector('.locate');
    if (locateButton) {
        locateButton.addEventListener('click', getLocation);
    } else {
        console.error("Botão '.locate' não encontrado.");
    }
});
