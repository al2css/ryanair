var map;
var markers = [];
var image = 'images/ryanair_small.png';
var infoWindow;

function initializeMap() {
  var CentralEurope = new google.maps.LatLng(50.84811, 14.5909);
  var mapOptions = {
    zoom: 4,
    minZoom: 4,
    maxZoom: 8,
    center: CentralEurope,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  infoWindow = new google.maps.InfoWindow();
}

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.latitude, location.longitude),
    map: map,
    icon: image,
    title: location.name
    // animation: google.maps.Animation.DROP
  });
  marker.content = '<p class="infoWindowContent">' + location.country.name + '</p>';
  
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2 class="infoWindowTitle">' + marker.title + '</h2>' + marker.content);
        infoWindow.open(map, marker);
    });

}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}