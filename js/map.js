var map;
var infoWindow;
var service;
var listRes = [];
function initialize() {
  var mapOptions = {
    zoom: 13
  };
    
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    
     if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
    
    
infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);   
  google.maps.event.addListener(map, 'bounds_changed', performSearch);
    
    
       
    
    
}


//Geolocation
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}


function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'Taco Bell',
    types: ['food'],
      name: 'Taco Bell'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    //alert(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    createMarker(result);
      $('#list').textContent(result);
  }
}
 var image = {
    url: 'img/tbellsm.jpg',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      infoWindow.setContent(result.name + " " + result.formatted_address);
      infoWindow.open(map, marker);
    });
  });
}



google.maps.event.addDomListener(window, 'load', initialize);
