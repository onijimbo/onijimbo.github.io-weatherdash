

function renderBttn(searchEl){
  let cityDiv = $("<div class='name'>");
  let newCity = $("<button>");
  // newCity.text(document.getElementById("citySearch").value);
  newCity.text(searchEl)
  newCity.addClass("cityBttn");
  cityDiv.append(newCity); 
  $("#cityView").prepend(cityDiv); 
};

function getWeather(searchEl) {
  $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q="+ searchEl +"&APPID=407dcbd909ab3fe803d6bfc0fc8541ab",
      method: 'get' 
    })
      .then(function(response){
        console.log(response)
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
       
        
          renderBttn(searchEl)
        // $("#cityDate").append(response.list[0].dt_txt)
      // $("#temp").append(Math.floor(tempF))
      // $("#hum").append(response.list[0].main.humidity)
      // $("#speed").append(response.list[0].wind.speed) 
      
      }); 
}

function uvIndex(response){
        let uvLat = (response.city.coord.lat)
        let uvLon = (response.city.coord.lon)
        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=407dcbd909ab3fe803d6bfc0fc8541ab&lat="+ uvLat +"&lon="+ uvLon +"&cnt={cnt}",
          method: 'get'
        })
        .then(function(response2){
          console.log(response2)
          }) 
          
      }


$("#searchBttn").click(function(){
  let searchEl = document.getElementById("citySearch").value;
  getWeather(searchEl)  
  uvIndex()  

  });

  
      
  

let cities = ['Seattle', 'Las vegas'];
localStorage.setItem('cities', JSON.stringify(cities))
let searchHistory = JSON.parse(localStorage.getItem('cities'))
console.log(searchHistory)
// number below is the dt from api response
// new Date(1579737600).getDate() 