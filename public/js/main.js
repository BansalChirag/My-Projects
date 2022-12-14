const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const date = new Date();
document.getElementById('day').innerText = weekday[date.getDay()-1];

document.getElementById('today_date').innerText = months[date.getMonth()] + " " + date.getDate() 



const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        datahide.classList.add("data_hide");
        city_name.innerText = `Plz write the name before search`;
    }else{
        try{
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=d22d9ef48f211a730a38ff5bff768d6f`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter a valid city name.`;
            // console.log('please add the proper city name');
        }
              
    }
}

submitBtn.addEventListener('click', getInfo);