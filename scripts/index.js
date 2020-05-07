const API_KEY = `DEMO_KEY`;
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

const previousWeatherToggle = document.querySelector('.show-previous-weather');
const previousWeather = document.querySelector('.previous-weather');
const currentSolElement = document.querySelector('[data-current-sol]');
const currentDateElement = document.querySelector('[data-current-date]');
const currentTempHighElement = document.querySelector('[data-current-temp-high]');
const currentTempLowElement = document.querySelector('[data-current-temp-low]');
const windSpeedElement = document.querySelector('[data-wind-speed]');
const windDirectionText = document.querySelector('[data-wind-direction-text]');
const windDirectionArrow = document.querySelector('[data-wind-direction-arrow]');
 
previousWeatherToggle.addEventListener('click', () => {
    previousWeather.classList.toggle('show-weather');
} )

let selectedSolIndex;

getWeather().then(sols => {
    selectedSolIndex = sols.length - 1;
    displaySelectedSol(sols);
});

function displaySelectedSol(sols) {
    const selectedSol = sols[selectedSolIndex];
    currentSolElement.innerText = selectedSol.sol;
    currentDateElement.innerText = selectedSol.date;
    currentTempHighElement.innerText = selectedSol.maxTemp;
    currentTempLowElement.innerText = selectedSol.minTemp;
    windSpeedElement.innerText = selectedSol.windSpeed;
    windDirectionArrow.getElementsByClassName.setProperty('--direction', `${selectedSol.windDirectionDegrees}deg`);
    windDirectionText = selectedSol.windDirectionCardinal;
}

function getWeather() {
    return fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...solData
            } = data
            return Object.entries(solData).map(([sol, data]) => {
                return {
                    sol: sol,
                    maxTemp: data.AT.mx,
                    minTemp: data.AT.mn,
                    windSpeed: data.HWS.av,
                    windDirectionDegrees: data.WD.most_common.compass_degrees,
                    windDirectionCardinal: data.WD.most_common.compass_point,
                    date: new Date(data.First_UTC)
                }
            })
        })
}