let city =  document.getElementById("citySearch").value


function renderBttn(){
  let cityDiv = $("<div class='name'>");
  let newCity = $("<button>");
  newCity.text(document.getElementById("citySearch").value);
  newCity.addClass("cityBttn");
  cityDiv.append(newCity); 
  $("#cityView").prepend(cityDiv); 
}
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=
let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=407dcbd909ab3fe803d6bfc0fc8541ab"

$("#searchBttn").click(function(){
  $.ajax({
    url: queryUrl,
    method: 'get' 
  })
    .then(function(response){
      console.log(response)
    });
renderBttn()
  });
      
  

let cities = ['Seattle', 'Las vegas'];
localStorage.setItem('cities', JSON.stringify(cities))
let searchHistory = JSON.parse(localStorage.getItem('cities'))
console.log(searchHistory)
// number below is the dt from api response
// new Date(1579737600).getDate() 