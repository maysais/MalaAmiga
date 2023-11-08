let city = document.getElementById('place');
const searchButton = document.querySelector('.button-search');
const options = {method: 'GET', headers: {accept: 'application/json'}};
const forecastParentElement = document.querySelector('.wrapper_forecast');
const cityName = document.getElementById('city');

searchButton.disabled = true;

city.addEventListener('input', ()=> {
    if(this.value !== null && this.value !== ''){
        searchButton.disabled = false;
    } else{
        searchButton.disabled = true;
    }
})

searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    let citySearched = city.value; 
      
    getWeatherForecast(citySearched) 
    
    city.value = ''
})


async function getWeatherForecast(city){
    try{
        let res = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${city}&timesteps=daily&apikey=2LAvGaU93QgdwzEQEAHY3JlgTmtOjW3O`, options);

        if(!res.ok){
            throw Error(`Requerimento falhou com o status ${res.status}`);
        }

        var dataForecast = await res.json();
        let arrayDaily = dataForecast.timelines.daily;
        let location = dataForecast.location.name;
        
        showForecast(arrayDaily);
        showLocation(location);

    }  catch(erro) {
        console.log(erro);
        displayErro();
    } 
    
}

function showForecast(array){
    forecastParentElement.innerHTML = '';

    array.forEach(date => {        
        console.log(date.values)
        forecastParentElement.innerHTML +=
        `<div class="results">
            <div class="results_container">
                <h3 class="results_title">${formatDate(date.time)}</h3>                
                <span class="material-symbols-outlined results_weather-icon">${displayWeatherIcon(date.values.weatherCodeMax)}</span>
            </div>                
            <div class="results_container">
                <h3 class="results_title">Previsão de chuva</h3>                    
                <p class="result">
                    <span class="material-symbols-outlined results_rain-icon">${displayRainAccumulationIcon(date.values.rainAccumulationAvg)}</span>
                    ${date.values.precipitationProbabilityAvg}<i>%</i>
                </p>                
            </div>
            <div class="results_container">
                <h3 class="results_title">Humidade</h3>                    
                <p class="result">
                    <span class="material-symbols-outlined">humidity_percentage</span>
                    ${date.values.humidityAvg}<i>%</i>
                </p>
            </div>
            <div class="results_container">
                <h3 class="results_title">Temperatura</h3>
                <p class="result">
                    <span class="material-symbols-outlined">arrow_upward</span>
                    ${Math.floor(date.values.temperatureMax)}<i>°C</i>
                </p>
                <p class="result">
                    <span class="material-symbols-outlined">arrow_downward</span>
                    ${Math.floor(date.values.temperatureMin)}<i>°C</i>
                </p>
            </div>
        </div>`
    })
}


function formatDate(date){
    let dateObject = new Date(date);

    let day = dateObject.getUTCDate();
    let month = dateObject.getUTCMonth() + 1;    
    let weekDay = dateObject.getDay();

    const week = {
        0: 'Dom',
        1: 'Seg',
        2: 'Ter',
        3: 'Qua',
        4: 'Qui',
        5: 'Sex',
        6: 'Sáb' 
    }

    let FormattedDate = day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + ' - ' + week[weekDay];

    return FormattedDate;
}

function showLocation(location){
    cityName.innerHTML = '';

    let city = location.toString().match(/[^,]+/);    
    let country = location.toString().match(/[^,\s]+(?=\s*$)/);;

    cityName.innerHTML += city + ', ' + country;
    
}

function displayWeatherIcon(weatherCode){

    if(weatherCode == 1000){
        return 'sunny';
    } 
    else if(weatherCode >= 1100 && weatherCode < 1200){
        return 'partly_cloudy_day';
    }
    else if(weatherCode == 1001){
        return 'cloud';
    }
    else if(weatherCode >= 2000 && weatherCode < 2110){
        return 'foggy';
    }
    else if(weatherCode >= 4000 && weatherCode < 4216){
        return 'rainy';
    } 
    else if(weatherCode >= 5000 && weatherCode < 5121){
        return 'cloudy_snowing';
    }
    else if(weatherCode >= 8000 && weatherCode < 8004){
        return 'thunderstorm';        
    }
    else if(weatherCode >= 5108 && weatherCode < 7120){
        return 'weather_mix';
    }
}

function displayRainAccumulationIcon(vol){
    if(vol < 2.5){
        return 'humidity_low';
    } 
    else if(vol >= 10){
        return 'humidity_high';
    }else{
        return 'humidity_mid';
    }
    
}

function displayErro(){
    forecastParentElement.innerHTML = ''

    forecastParentElement.innerHTML +=
    `<div class="erro_not-found">
        <img src="Imagens/404.png" alt="Ilustração de um policial e faixas de segurança dizendo 404 página não encontrada" class="erro_img">
        <div>
            <p class="erro_title">Desculpe, ocorreu um erro</p>
            <p class="erro_text">A página que você está tentando acessar não pôde ser encontrada ou não está disponível no momento. Tente novamente.</p>
        </div>                    
    </div>`
}
