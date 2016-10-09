function initMap() {
  var myLocation = {lat: 34, lng: -118};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLocation
  });
  var marker = new google.maps.Marker({
    position: myLocation,
    map: map
  });
}
