let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentDateTime = new Date()
// const todayDate = Date(Date.now());
console.log(month[currentDateTime.getMonth()]);
const today = currentDateTime

let searchHistory = JSON.parse(localStorage.getItem('cities'))


function emptyAll(){
$("#cityDate").empty()
$('#icon1').empty()
$("#temp").empty()
$("#hum").empty()
$("#speed").empty()
}

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
  emptyAll() 
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q='+ searchEl +'&APPID=407dcbd909ab3fe803d6bfc0fc8541ab',
    method: 'get'
  })
    .then(function(response1){
      console.log(response1) 
      let tempF1 = (response1.main.temp - 273.15) * 1.80 + 32;
      const icon = response1.weather[0].icon
      const icon1 = $('<img>')
      icon1.attr({'src': "http://openweathermap.org/img/w/"+ icon +".png", 
                  'alt': response1.weather[0].description
      })
      $("#cityDate").append(month[currentDateTime.getMonth()]+'/'+currentDateTime.getDate()+'/'+currentDateTime.getFullYear());
      $('#icon1').append(icon1)
      $("#temp").append(Math.floor(tempF1))
      $("#hum").append(response1.main.humidity)
      $("#speed").append(response1.wind.speed)
      
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
              $('#uv').append(response2.value)
            }) 
          }    
              uvIndex(response)
              
              for (let i = 0;i < response.list.length; i+= 8){
              let newDate1 = new Date(response.list[i].dt_txt)
              let newDay1 = month[newDate1.getMonth()]+'/'+newDate1.getDate()+'/'+newDate1.getFullYear();
              $('#date1').append(newDay1)
              
              
              
              
              
               
              }
              
          }); 
  });  
}




$("#searchBttn").click(function(){
  
  let searchEl = document.getElementById("citySearch").value;
  renderBttn(searchEl)
  let cities = ['Seattle', 'Las vegas', 'New York', 'Milwaukee'];
  localStorage.setItem('cities', JSON.stringify(cities))
  cities.push(searchEl)
  getWeather(searchEl)  
  console.log(searchHistory)
  localStorage.setItem('cities', JSON.stringify(cities))
 }); 


  
      
  




// number below is the dt from api response
// new Date(1579737600).getDate() 