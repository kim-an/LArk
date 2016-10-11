var myLocation;
var map;
var socket = io();

// TODO DISTRACT USER WHILE MAP IS LOADING AND CENTERING
// navigator.geolocation.watchPosition(function(obj){
//   myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
//   initMap(myLocation);
// });

navigator.geolocation.watchPosition(function(obj){
  myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
  console.log(myLocation);
  if (map){
    map.panTo(myLocation);
  } else {
    console.log('map doesnt exist yet');
  }
});

$('#plus').on('click', function(){
  $('.submit-data').toggleClass('hidden');
});


function render(tips) {
  tips.forEach(function(tip) {
    var content = 'Add Content';
    var infoWindow = new google.maps.InfoWindow({
      content: content
    });
    var latLng = {lat: tip.coordinates.lat, lng: tip.coordinates.lng};
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  })
}

function initMap() {
  // styled map
   var styledMapType = new google.maps.StyledMapType(
     [
         {
             "featureType": "all",
             "stylers": [
                 {
                     "saturation": 0
                 },
                 {
                     "hue": "#e7ecf0"
                 }
             ]
         },
         {
             "featureType": "road",
             "stylers": [
                 {
                     "saturation": -70
                 }
             ]
         },
         {
             "featureType": "transit",
             "stylers": [
                 {
                     "visibility": "off"
                 }
             ]
         },
         {
             "featureType": "poi",
             "stylers": [
                 {
                     "visibility": "off"
                 }
             ]
         },
         {
             "featureType": "water",
             "stylers": [
                 {
                     "visibility": "simplified"
                 },
                 {
                     "saturation": -60
                 }
             ]
         }
     ],
     {name: 'Styled Map'});

  // TODO: need to dynamically change myLocation using location services
  var startLocation = {lat: 34.030935, lng: -118.266637};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: startLocation
  });

  // associating the styled map w/existing map
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // loop throug db and mark each place
  socket.emit('getTips');
  socket.on('renderMarkers', render);
  // click at a spot on the map and grab the coordinates, send it to router
  map.addListener('click', function(evt){
    $.post('/', {lat: evt.latLng.lat(), lng: evt.latLng.lng()}, function(tip){
      var form = $('#google-maps-form').html();
      var infoWindow = new google.maps.InfoWindow({
        content: form
      });
      var marker = new google.maps.Marker({
        position: tip.coordinates,
        map: map
      });
      infoWindow.open(map, marker);
      socket.emit('getTips');
      socket.on('renderMarkers', render);
    });
  });

  // Geocoder
  var geocoder = new google.maps.Geocoder();
  // Click event to go to address
  document.getElementById('getAddress').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    // use results[0].geometry.location.lat(), results[0].geometry.location.lng() to get lat/long
    console.log(results[0].geometry.location.lat());
    console.log(results[0].geometry.location.lng());
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$("[data-toggle=popover]").popover({
    html: true,
  content: function() {
          return $('#popover-content').html();
        }
});
