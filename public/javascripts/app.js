var myLocation;
var map;
var socket = io();
// toggle add tip button
var addTipToggle = false;

var $addTip = $('#add-tip');
var $plus = $('#plus');
var $map = $('#map');

navigator.geolocation.watchPosition(function(obj){
   myLocation = {lat: obj.coords.latitude, lng: obj.coords.longitude};
});

var arrTips = [];


function initMap() {

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
      map: map,
      icon: '../images/LArk_pin_01.png'
    });
    marker.addListener('click', function(){
      if(infoWindow) {
        infoWindow.close();
      }
      infoWindow.open(map, marker);
      if (tip.flaggerIds.includes(currentUserId)){
        $('#table-head').prepend($('#flagged-tip').html());
        $('#flag-button').remove();
      }
      editTip(infoWindow);
      deleteTip(infoWindow, marker);
    });
  });
}

// for center button on map
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '<img id="center-map-control" src="../images/center-map-sticker.png">';
  controlUI.appendChild(controlText);

  // Setup the click event listeners.
  controlUI.addEventListener('click', function() {
    map.setCenter(myLocation);
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

  // for center button on map
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);


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
      infoWindow = new google.maps.InfoWindow({
        content: form
      });

      var marker = new google.maps.Marker({
        position: {lat: clickLat, lng: clickLng},
        map: map,
        icon: '../images/LArk_pin_01.png'
      });

      infoWindow.open(map, marker);
// submit button action
      $map.on('click', '#submit', function(evt){
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
        console.log('this is from the client: ' + newTip);
        arrTips.push(newTip);
        $.post('/tips', newTip, function(tip){
          console.log(tip);
          infoWindow.close();
        }); // close post
      });
    } // close addTipToggle
  }); // close addListener


// listener for flag
$('#map').on('click', '#flag-button', function(evt){
  console.log('clicked flag');
  var $flagButton = $('#flag-button');
  if ( $flagButton.prop('disabled') ){
    return false;
  }
  var tipId = $flagButton.attr('data-id');
  $.ajax({
    url: `/tips/${tipId}`,
    method: 'PUT',
    data: {tipId: tipId}
  }).done(function(response){
    $flagButton.prop('disabled', true);
  });
});



  // plus button on form
  $map.on('click', '#clickPlus', function(evt){
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

  // Geocoder
  var geocoder = new google.maps.Geocoder();

  // Click event to go to address
  $('body').on('click', '#getAddress', function(e) {
    console.log('get address...');
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
        window.alert("Please enter a complete address");
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

function editTip(infowindow){
    // edit-tip
  $map.on('click', '#edit-tip', function(e) {
    console.log('edit clicked');
    // replace display info elements with corresponding input
    $('#parking-type').html("<select name='parkingType' id='parking-type-edit'><option value='Street'>Street</option><option value='Outdoor Lot'>Outdoor Lot</option><option value='Indoor Lot'>Indoor Lot</option></select>");
    // TODO Need to replace valid hours with new input
    // var validHoursHTML = '';
    // $('#valid-hours-input').html()
    $('#cost').html("$<input type='text' id='cost-edit'>/hr");
    var maxTimeHTML = '';
    for (var i = 1; i < 25; i++) {
      maxTimeHTML += `<option value=${i}>${i}</option>`
    }
    $('#max-time').html(`<select name='maxTime' id='max-time-edit'>${maxTimeHTML}</select>`);
    var permitHTML = '<label for="required"><input type="radio" name="permit" value=true checked>Required</label><label for="not-required"><input type="radio" name="permit" value=false>Not required</label>';
    $('#permit').html(`<fieldset>${permitHTML}</fieldset>`)
    $('#comment').html(`<textarea cols="20" rows="3" id="comment-edit"></textarea>`)
    $('#edit-tip').text('Submit');
    $('#edit-tip').addClass('submit-edit');
    $('#edit-tip').removeAttr('id');
  });

  // Put to update tip
  $map.on('click', '.submit-edit', function(e) {
    console.log("submit edit clicked!");
    var editedTip = {
      tipId: $('#comment').attr('data-id'),
      parkingType: $('#parking-type-edit').val(),
      maxTime: $('#max-time-edit').val(),
      permit: $('input[name="permit"]:checked').val(),
      cost: $('#cost-edit').val(),
      comment: $('#comment-edit').val()
    }
    $.ajax({
      url: `/tip`,
      method: 'PUT',
      data: editedTip
    }).done(function(response){
      console.log(response);
      infowindow.close();
    });
  })
}

function deleteTip(infowindow, marker) {
  $map.on('click', '#delete-tip', function(e) {
    console.log('delete clicked!');
    tipId = $('#comment').attr('data-id');
    $.ajax({
      url:'/tip',
      method: "DELETE",
      data: {tipId: tipId}
    }).done(function(response){
      console.log(response);
      infowindow.close();
      marker.setMap(null);
    });
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
