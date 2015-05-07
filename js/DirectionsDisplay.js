/**
 * Created by billrashid on 4/29/15.
 Edits: Ryan Wedoff 5/6/15
 */
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

//var map;
var infoWindow;
var service;
var userLocation;
var map;

var $selectEL = $('#restaurantSelect');
var $infoDivEl = $('#InfoDiv');
$infoDivEl.hide();

var $hoverImg = $('img');

$('#littleMessage').hide().fadeIn(5000);

function initialize() {


    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 13,
        panControl: true,
        styles: [{
            stylers: [
                {hue: "#ff00ff"},
                {saturation: -50}
            ]
        }]
    };
        //Handle Geolocation
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var marker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: userLocation
                });

                map.setCenter(userLocation);

            }, function () {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }


    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var control = document.getElementById('control');
    control.style.display = 'block';

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    //event handler for bounds change
    google.maps.event.addListener(map, 'bounds_changed', performSearch);
}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
  var address = prompt("Geolocation Failed: Please enter an Address");
  geocoder.geocode( { 'address': address}, function(results, status) {
     
    if (status == google.maps.GeocoderStatus.OK) {
     
        map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
        userLocation = results[0].geometry.location;
    } else {
      
    }
  });
}

//If browswer doesn't support GeoLocation
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    codeAddress();
    var options = {
        map: map,
        position: new google.maps.LatLng(40, 91),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

function calcRoute(end) {
   // var start = document.getElementById('start').value;
    var start = userLocation;
    
    
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
       
    });

    var nav = "https://www.google.com/maps/dir/Current+Location/" + end;
    $('#resTb').text(end);
    $('#resTb').attr('href', nav);
    $infoDivEl.show();
}


//get the search from google
function performSearch() {


    console.log('Viewport Bounds Changed');
    var request = {
        bounds: map.getBounds(),
        keyword: 'Taco Bell',
        types: ['food'],
        name: 'Taco Bell'
    };

    service.radarSearch(request, callback);
}



//response from the google
function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //alert(status);
        for (var i = 0, result; result = results[i]; i++) {

            createMarker(result);
            service.getDetails(result, function (res, status) {

                //if nothing was returned
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }

                else if(res.formatted_address){
                    $selectEL.append('<option>' + res.formatted_address + '</option>');
                }

            });

        }
    }
}

var image = {
    url: 'img/tbellsm.jpg',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
};

function createMarker(place) {

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(place, function (result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
               // alert(status);
                return;
            }
            var infoContent = "<p id=\"infoCont\" > " + result.name + ": " + result.formatted_address + "<\p>";
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
            var addr = result.formatted_address;
            calcRoute(addr);
            
            
        });
    });
    
    
     /* google.maps.event.addListener(marker, 'mouseover', function () {
          
        var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: image
        });
    });*/
    
}


$selectEL.on('mouseover', function(){
    removeDuplicates();
});
$selectEL.on('change', function(){
    var end = document.getElementById('restaurantSelect').value;
    calcRoute(end);
});

$hoverImg.on('mouseover', function(){
    alert('test');
   this.addClass('hoverImg');
});
var removeDuplicates = function(){
    var found = [];
    $("select option").each(function() {
        if($.inArray(this.value, found) != -1) $(this).remove();
        found.push(this.value);
    });
};

google.maps.event.addDomListener(window, 'load', initialize);