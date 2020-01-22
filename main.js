let city = $("#citySearch")

function renderBttn(){
  let cityDiv = $("<div class='name'>");
  let newCity = $("<button>");
  newCity.text(document.getElementById("citySearch").value);
  newCity.addClass("cityBttn");
  cityDiv.append(newCity); 
  $("#cityView").prepend(cityDiv); 
}

let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Seattle" + "407dcbd909ab3fe803d6bfc0fc8541ab"

$("#searchBttn").click(function(){
    renderBttn()
});
