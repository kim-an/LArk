var myLocation;
var map;
var socket = io();
// toggle add tip button
var addTipToggle = false;

var $addTip = $('#add-tip');
var $plus = $('#plus');

var arrTips = [];

//TODO have option to clear this
navigator.geolocation.watchPosition(function(obj){
  myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
  console.log(myLocation);
  if (map){
    map.panTo(myLocation);
  } else {
    console.log('map doesnt exist yet');
  }
});

function render(tips) {
  tips.forEach(function(tip) {
    var content = $('#tip-info').html();
    var template = Handlebars.compile(content);
    var html = template(tip);
    console.log(tip.validHours.length);
    Handlebars.registerHelper('each', function(tip, options){
      var ret = "";

      for (var i = 0, j = tip.validHours.length; i < j; i++){
        ret = ret + options.fn(tip.validHours[i]);
      }
      return ret;
    });
    var infoWindow = new google.maps.InfoWindow({
      content: html
    });
    var latLng = {lat: tip.coordinates.lat, lng: tip.coordinates.lng};
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  });
}

function initMap() {
  // styled map
  var styledMapType = new google.maps.StyledMapType([
    {
      "featureType": "all",
      "stylers": [
        {"saturation": 0},
        {"hue": "#e7ecf0"}
      ]
    },
    {
      "featureType": "road",
      "stylers": [{"saturation": -70}]
    },
    {
      "featureType": "transit",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "poi",
      "stylers": [{"visibility": "off"}]
    },
    {
      "featureType": "water",
      "stylers": [
        {"visibility": "simplified"},
        {"saturation": -60}
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

  // loop through db and mark each place
  socket.emit('getTips');
  socket.on('renderMarkers', render);

  // click at a spot on the map and grab the coordinates, send it to router
  map.addListener('click', function(evt){
    if(addTipToggle) {
      // disable add-tip
      addTipToggle = false;
      clickLat = evt.latLng.lat();
      clickLng = evt.latLng.lng();

      var form = $('#google-maps-form').html();
      var infoWindow = new google.maps.InfoWindow({
        content: form
      });

      var marker = new google.maps.Marker({
        position: {lat: clickLat, lng: clickLng},
        map: map
      });

      infoWindow.open(map, marker);
        // not necessary?
        // socket.emit('getTips');
        // socket.on('renderMarkers', render);
    } // close addTipToggle
  }); // close addListener

// submit button action
  $('#map').on('click', '#submit', function(evt){
    newTip = {
      parkingType: $('#parkingTypeField').val(),
      coordinatesLat: clickLat,
      coordinatesLng: clickLng,
      validHoursDay: $('#validHoursDayField').val(),
      validHoursStart: $('#validHoursStartTimeField').val(),
      validHoursEnd: $('#validHoursEndTimeField').val(),
      maxTime: $('#maxTimeField').val(),
      permit: $('input[name="permit"]:checked').val(),
      costField: $('#costField').val(),
      costExceptions: $('#costExceptionField').val()
    }; // close newTip object
    console.log('this is from the client: ' + newTip);
    arrTips.push(newTip);
    $.post('/tips', newTip, function(tip){
      console.log(tip);
    }); // close post
  });



  // Geocoder
  var geocoder = new google.maps.Geocoder();

  // Click event to go to address
  $('body').on('click', '#getAddress', function(e) {
    console.log('get address...');
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  console.log(address);
  geocoder.geocode({'address': address}, function(results, status) {
    // use results[0].geometry.location.lat(), results[0].geometry.location.lng() to get lat/long
    console.log(results);
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


$addTip.on('click', function(){
  addTipToggle = true;
});

$plus.on('click', function(){
  $('.submit-data').toggleClass('hidden');
});

$('#myModal').on('click',function(evt){
  $('#modal-content').modal('hide');
});
