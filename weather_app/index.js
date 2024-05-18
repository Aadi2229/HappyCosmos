const API_KEY="47bcc6be2c9ccd9b00d7e0bcee4138cf";
// const weatherDisplay=document.querySelector('.tempshow');
// const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
const user_weath=document.querySelector('#userweather');
const search_weath=document.querySelector('#searchweather');
const weath_container=document.querySelector('.weather-cont');
const grant=document.querySelector('.grant');
const search=document.querySelector('.form-container');
const load=document.querySelector('.load-cont');
const user=document.querySelector('.user-info');
let currentTab=user_weath;
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab)
{
    if(clickedTab!=currentTab)
    {
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!search.classList.contains("active"))
        {
            user.classList.remove("active");
            grant.classList.remove("active");
            search.classList.add("active");
        }
        else{
            user.classList.remove("active");
            grant.classList.remove("active");
            search.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

user_weath.addEventListener('click',function(){
    //pass clicked tab as input
    switchTab(user_weath);
});

search_weath.addEventListener('click',function(){
    //pass clicked tab as input
    switchTab(search_weath);
});


function getfromSessionStorage()
{
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates)
    {
        grant.classList.add("active");
    }
    else
    {
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat,lon}=coordinates;
    //make grant container invisible
    grant.classList.remove("active");
    //make loader visible
    load.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const data=await response.json();
        load.classList.remove("active");
        user.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        load.classList.remove("active");
        
        //HW
    }
}

function renderWeatherInfo(weatherInfo)
{
    //fetch the element
    const cityName=document.querySelector('#data-city');
    const countryIcon=document.querySelector('#data-country');
    const desc=document.querySelector('.discrip');
    const weatherIcon=document.querySelector('.weather-icon');
    const temp=document.querySelector('.tempshow');
    const windspeed=document.querySelector('#windspeed');
    const humidity=document.querySelector('#humidity');
    const cloud=document.querySelector('#cloud');

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloud.innerText = `${weatherInfo?.clouds?.all}%`;

}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        //hw
      }
}
function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grantBtn=document.querySelector('#grantt');
grantBtn.addEventListener('click',getLocation);

let searchInput=document.querySelector('#data_search');
search.addEventListener("submit",(e)=>
{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName==="")return;
    else fetchSearchWeatherInfo(cityName);
})
async function fetchSearchWeatherInfo(city){
    load.classList.add("active");
    user.classList.remove("active");
    grant.classList.remove("active");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data=await response.json();
        load.classList.remove("active");
        user.classList.add("active");
        renderWeatherInfo(data);
    } 
    catch (error) {
        //hw
    }
}