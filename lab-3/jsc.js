const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
}



const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);

function setQuery(a) {
  console.log(a);
  if (a.keyCode === 13) {
    console.log(searchBox.value);
    getWeatherInfo(searchBox.value);
  }
}

function updateTp(){}
function getWeatherInfo(cTn,updateTp ){}
function getWeatherInfo(cTn){
    const url = `${api.base}?q=${cTn}&units=metric&appid=${api.key}`
    let promise = fetch(url);
    console.log(promise);
    promise.then((response)=>{
        return response.json();
    }).then((weatherResponse)=>{
        console.log(weatherResponse);
        if(weatherResponse.cod === 200){
            console.log("Processed Further");
            displayResults(weatherResponse);
        }else{
            alert(weatherResponse.message);
        }
    }).catch((err)=>console.log("API Failed",err));

}

function displayResults(respJson) {
    console.log("Display to be updated");
    let city = document.querySelector('.city');
    city.innerText = `${respJson.name}, ${respJson.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.Now .temp');
    temp.innerHTML = `${Math.round(respJson.main.temp)}<span>°c</span>`;
  
    let weather1 = document.querySelector('.Now .weather');
    weather1.innerText = respJson.weather[0].main;
  
    let hilo = document.querySelector('.high-low');
    hilo.innerText = `${Math.round(respJson.main.temp_min)}°c / ${Math.round(respJson.main.temp_max)}°c`;
  }

  function dateBuilder(b) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[b.getDay()];
    let date = b.getDate();
    let month = months[b.getMonth()];
    let year = b.getFullYear();
    
  
    const DateFormat = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZoneName: "short",
    }
    return b.toLocaleDateString("en-US",DateFormat) 
  }
  
