let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentDateTime = new Date()
// const todayDate = Date(Date.now());
console.log(month[currentDateTime.getMonth()]);
const today = currentDateTime

let searchHistory = JSON.parse(localStorage.getItem('cities'))


function emptyAll() {
  $("#cityDate").empty()
  $('#icon1').empty()
  $("#temp").empty()
  $("#hum").empty()
  $("#speed").empty()
  $('#uv').empty()
  $('#bug0').removeAttr('src')
  $('#bug1').removeAttr('src')
  $('#bug2').removeAttr('src')
  $('#bug3').removeAttr('src')
  $('#bug4').removeAttr('src')
  $('#date0').empty()    
  $('#date1').empty()
  $('#date2').empty()
  $('#date3').empty()
  $('#date4').empty()
  $('#Temp0').empty()
  $('#Temp1').empty()
  $('#Temp2').empty()
  $('#Temp3').empty()
  $('#Temp4').empty()
  $('#hum0').empty()  
  $('#hum1').empty()  
  $('#hum2').empty()
  $('#hum3').empty()
  $('#hum4').empty()
}
if(searchHistory.length === null || searchHistory.length === 0){
  for(i=0; i<searchHistory.length;i++){
    renderBttn(searchHistory[i])
  }
}

function renderBttn(searchEl) {
  
  let cityDiv = $("<div class='name'>");
  
  let newCity = $("<button>");
  
  newCity.text(searchEl)
  newCity.addClass("cityBttn");
  cityDiv.append(newCity);
  $("#cityView").prepend(cityDiv);
};

function getWeather(searchEl) {
  emptyAll()
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + searchEl + '&APPID=407dcbd909ab3fe803d6bfc0fc8541ab',
    method: 'get'
  })
    .then(function (response1) {
      console.log(response1)
      let tempF1 = (response1.main.temp - 273.15) * 1.80 + 32;
      const icon = response1.weather[0].icon
      const icon1 = $('<img>')
      icon1.attr({
        'src': "http://openweathermap.org/img/w/" + icon + ".png",
        'alt': response1.weather[0].description
      })
      $("#cityDate").append(month[currentDateTime.getMonth()] + '/' + currentDateTime.getDate() + '/' + currentDateTime.getFullYear());
      $('#icon1').append(icon1)
      $("#temp").append(Math.floor(tempF1))
      $("#hum").append(response1.main.humidity)
      $("#speed").append(response1.wind.speed)

      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchEl + "&units=imperial&APPID=407dcbd909ab3fe803d6bfc0fc8541ab",
        method: 'get'
      })
        .then(function (response) {
          console.log(response)

          function uvIndex(response) {
            let uvLat = (response.city.coord.lat)
            let uvLon = (response.city.coord.lon)
            $.ajax({
              url: "http://api.openweathermap.org/data/2.5/uvi?appid=407dcbd909ab3fe803d6bfc0fc8541ab&lat=" + uvLat + "&lon=" + uvLon,
              method: 'get'
            })
              .then(function (response2) {
                console.log(response2)
                $('#uv').append(response2.value)
              })
          }
          uvIndex(response)

          for (let i = 0; i < response.list.length; i += 8) {
            let newDate1 = new Date(response.list[i].dt_txt)
            let newDay1 = month[newDate1.getMonth()] + '/' + newDate1.getDate() + '/' + newDate1.getFullYear();
            let icon = response.list[i].weather[0].icon
            $('#bug'+i/8).attr({'src': "http://openweathermap.org/img/w/" + icon + ".png"})
            $('#date'+i/8).append(newDay1)
            $('#Temp'+i/8).append(response.list[i].main.temp)
            $('#hum'+i/8).append(response.list[i].main.humidity)


          }

        });
    });
}

$('#cityView').on('click', '.cityBttn', function() {
  let searchEl = $(this).text()
  console.log(searchEl)
  getWeather(searchEl)
})


$("#searchBttn").click(function () {

  let searchEl = document.getElementById("citySearch").value;

  let cities = ['Seattle', 'Las vegas', 'New York', 'Milwaukee'];
  localStorage.setItem('cities', JSON.stringify(cities))
  cities.push(searchEl)
  renderBttn(searchEl)
  getWeather(searchEl)
  console.log(searchHistory)
  localStorage.setItem('cities', JSON.stringify(cities))
});









// number below is the dt from api response
// new Date(1579737600).getDate() 