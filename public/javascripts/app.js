$(document).ready(function(){
  $('#plus').on('click', function(){
    $('.submit-data').removeClass('hidden');
  });
});

// fake db
var places = [
  {
    "latitude": 35,
    "longitude": -119
  },
  {
    "latitude": 34.030935,
    "longitude": -118.26663732
  }
];


function initMap() {
  var myLocation = {lat: 34.030935, lng: -118.266637};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLocation
  });
  var marker = new google.maps.Marker({
    position: myLocation,
    map: map
  });
  // loop through fake db and mark each place
  places.forEach(function(place){
    console.log(place);
    var latLng = new google.maps.LatLng(places.latitude, places.longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    console.log(marker);
  });
}

