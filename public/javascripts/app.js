var myLocation;
var map;
var socket = io();
// toggle add tip button
var addTipToggle = false;

var $addTip = $('#add-tip');
var $plus = $('#plus');

var arrTips = [];


function initMap() {
  // styled map
function render(tips) {
  tips.forEach(function(tip) {
    var content = $('#tip-info').html();
    var template = Handlebars.compile(content);
    var html = template(tip);
    var validHoursLength = tip.validHours.length - 1;
    var hoursArr = tip.validHours;
    Handlebars.registerHelper('each', function(tip, options){
      var ret = "";
      for (var i = 0, j = validHoursLength; i < j; i++){
        ret = ret + options.fn(hoursArr[i]);
      }
      return ret;
    });
    arrTips.push(tip);
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
      if (tip.flaggerIds.includes(currentUserId)){
        $('#table-head').prepend($('#flagged-tip').html());
        $('#flag-button').remove();
      }
    });
  });
}

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
    socket.emit('getTips');
    socket.on('renderMarkers', render);
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
// submit button action
  $('#map').on('click', '#submit', function(evt){
    newTip = {
      parkingType: $('#parkingTypeField').val(),
      coordinatesLat: clickLat,
      coordinatesLng: clickLng,
      validHours: getValidHours(),
      maxTime: $('#maxTimeField').val(),
      permit: $('input[name="permit"]:checked').val(),
      cost: $('#costField').val(),
      costExceptions: $('#costExceptionField').val(),
      comment: $('#commentsField').val()
    }; // close newTip object
    arrTips.push(newTip);
    $.post('/tips', newTip, function(tip){
      infoWindow.close();
    }); // close post
  } );
    } // close addTipToggle
  }); // close addListener

// listener for flag
$('#map').on('click', '#flag-button', function(evt){
  console.log('clicked flag');
  var $flagButton = $('#flag-button');
  if ( $flagButton.prop('disabled') ){
    return false;
  }
  // $('#flag-button').prop('disabled', true);
  var tipId = $flagButton.attr('data-id');
  $.ajax({
    url: `/tips/${tipId}`,
    method: 'PUT',
    data: {tipId: tipId}
  }).done(function(response){
    $flagButton.prop('disabled', true);
  });
});


// abandon this for now
// $('#map').on('click', '#flag-button', function(evt){
//   // if tip
//   // flagbutton attr data-id has the tip id
//   // can go to server to get the tip
//   // return the tip object
//   //
// })
// if (tip.flaggerIds.includes(currentUserId)){
//   console.log('this includes method executed');
//   $('#flag-button').prop('disabled', true);
// }


  // plus button on form
  $('#map').on('click', '#clickPlus', function(evt){
    $('#appendThis').append($('#addRow').html());
  });

  function getValidHours() {
    var days = $('.day').toArray().map(function(dayEl) {
      return dayEl.value;
    });
    var starts = $('.start').toArray().map(function(startEl) {
      return startEl.value;
    });
    var ends = $('.end').toArray().map(function(endEl) {
      return endEl.value;
    });
    return days.map(function(day, idx){
      return {
        day: day,
        startTime: starts[idx],
        endTime: ends[idx]
      };
    });
  }


  window.getValid = getValidHours;

  // Geocoder
  var geocoder = new google.maps.Geocoder();

  // Click event to go to address
  $('body').on('click', '#getAddress', function(e) {
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });
// auto-fill address input box
  var input = /** @type {!HTMLInputElement} */(document.getElementById('address'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);
    });
} //close function init map

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    // use results[0].geometry.location.lat(), results[0].geometry.location.lng() to get lat/long
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
