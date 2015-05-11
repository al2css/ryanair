var generateMaps = {
    map: null,
    markers: [],
    image: 'images/ryanair_small.png',
    infoWindow: null,

    initializeMap: function() {
        var centralEurope = new google.maps.LatLng(50.84811, 14.5909);
        var mapOptions = {
            zoom: 5,
            minZoom: 4,
            maxZoom: 8,
            center: centralEurope,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        generateMaps.map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);

        generateMaps.infoWindow = new google.maps.InfoWindow();
    },

    // Add a marker to the map and push to the array.
    addMarker: function(location) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.latitude, location.longitude),
            map: generateMaps.map,
            icon: generateMaps.image,
            title: location.name,
            code: location.iataCode
                // animation: google.maps.Animation.DROP
        });
        marker.content = '<p class="infoWindowContent">' + location.country.name + '</p>';
        marker.content += '<p class="infoWindowContent">Lat: ' + location.latitude + '/Long: ' + location.longitude + '</p>';

        generateMaps.markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            generateMaps.infoWindow.setContent('<h2 class="infoWindowTitle">' + marker.title + ' (#' + marker.code + ')</h2>' + marker.content);
            generateMaps.infoWindow.open(generateMaps.map, marker);
        });

    },

    // Sets the map on all markers in the array.
    setAllMap: function(map) {
        for (var i = 0, len = generateMaps.markers.length; i < len; i++) {
            generateMaps.markers[i].setMap(map);
        }
    },

    // Removes the markers from the map, but keeps them in the array.
    clearMarkers: function() {
        generateMaps.setAllMap(null);
    },

    // Shows any markers currently in the array.
    showMarkers: function() {
        generateMaps.setAllMap(generateMaps.map);
    },

    // Deletes all markers in the array by removing references to them.
    deleteMarkers: function() {
        generateMaps.clearMarkers();
        generateMaps.markers = [];
    }
};
