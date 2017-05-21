// define globals
$(document).ready(function() {
  var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  var $info = $('#info');
  // var $map = $('#map');
  var cords = []
  initMap();
  getData();

  // TODO: Move GetData to outside of document.ready. Feel free to move the above var declarations into your getData function.
  function getData(){
    $.ajax({
      method: "GET",
      url: weekly_quakes_endpoint,
      dataType:'json',
      // TODO: move this function definition to the bottom of the document, call it instead
      success: function grabGeoData(json){
        console.log(json);
        json.features.forEach(function(element){
          var cords = element.geometry.coordinates;
          var lat = cords[1];
          var lng = cords[0];
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: "Maps"
          // json.features.forEach(function(element) {
          //   var cords = element.geometry.coordinates;
            });
          var place = element.properties.place;
          var mag = element.properties.mag;
          var magWrite;
          if(mag > 4.5){
            magWrite ='red';
          } else if(mag <= 4.6 && mag > 4.3){
            magWrite = 'purple';
          } else {
            magWrite = 'blue';
          }
          var date = new Date(element.properties.time*1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          $info.append('<li class = "' + magWrite + '" > </li>' + mag + "--" + place + " at: " + formattedTime + "<br>");
          console.log(cords + mag + place + formattedTime);

          var popupContent = ("Mag: " + mag + "--" + place + " at: " + formattedTime + "<br>");
          var infoWindow = new google.maps.InfoWindow({
            content : popupContent
          })
          marker.addListener('click', function popup(){
            infoWindow.open(map,marker);
          })
        })
      }

      // TODO: make an error handlers
    })
  };


  // CODE IN HERE!

});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.7749,
      lng: -122.4194
    },
    zoom: 8
  });
}
