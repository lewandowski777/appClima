window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let localTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    //request da localização do usuário
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>    {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //configuração da api com uso do proxy pq buga só com a url da api (idk yet)
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    const{temperature, summary} = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    localTimeZone.textContent = data.timezone;
                    // Muda fire pra celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    temperatureSection.addEventListener('click', () =>{
                        if (temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    })

                })
        });


    }
});