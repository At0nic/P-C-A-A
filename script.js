document.getElementById('searchBtn').addEventListener('click', async function() {
    const cities = document.getElementById('cities').value.split(',');
    const apiKey = 'd6e666af4bfb1174ac8fe345d907120b';
    const weatherResults = document.getElementById('weatherResults');

    weatherResults.innerHTML = '';

    for (const city of cities) {
        const trimmedCity = city.trim();
        if (!trimmedCity) continue;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Město "${trimmedCity}" nebylo nalezeno.`);
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            displayError(trimmedCity, error.message);
        }
    }
});

function displayWeather(data) {
    const weatherResults = document.getElementById('weatherResults');
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Teplota: ${data.main.temp} °C</p>
        <p>Popis: ${data.weather[0].description}</p>
        <p>Vlhkost: ${data.main.humidity} %</p>
        <p>Rychlost větru: ${data.wind.speed} m/s</p>
    `;
    weatherResults.appendChild(resultDiv);
}

function displayError(city, message) {
    const weatherResults = document.getElementById('weatherResults');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('result');
    errorDiv.innerHTML = `<h2>${city}</h2><p>${message}</p>`;
    errorDiv.style.color = 'red';
    weatherResults.appendChild(errorDiv);
}
