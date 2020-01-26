

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
        
       function uvIndex(response){
        let uvLat = (response.city.coord.lat)
        let uvLon = (response.city.coord.lon)
        $.ajax({
          url: "http://api.openweathermap.org/data/2.5/uvi?appid=407dcbd909ab3fe803d6bfc0fc8541ab&lat="+ uvLat +"&lon="+ uvLon,
          method: 'get'
        })
        .then(function(response2){
          console.log(response2)
          }) 
      }    
          let newDate = new Date(response.list[0].main.dt_txt)
          let newDay = newDate.getDate();
          let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
          uvIndex(response)
          renderBttn(searchEl)
      $("#cityDate").append(newDay);
      $("#temp").append(Math.floor(tempF))
      // $("#hum").append(response.list[0].main.humidity)
      // $("#speed").append(response.list[0].wind.speed) 
      
      }); 
}




$("#searchBttn").click(function(){
  let searchEl = document.getElementById("citySearch").value;
  getWeather(searchEl)  
    

  });

  
      
  

let cities = ['Seattle', 'Las vegas'];
localStorage.setItem('cities', JSON.stringify(cities))
let searchHistory = JSON.parse(localStorage.getItem('cities'))
console.log(searchHistory)
// number below is the dt from api response
// new Date(1579737600).getDate() 